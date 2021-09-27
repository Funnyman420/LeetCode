interface ITreeNode {
	childrenNodes: ITreeNode[],
	parentNode?: ITreeNode,
	currentChildIndex?: number,
	visited: boolean,
	value?: string,
	coordinates: ISudokuBox,
	boxIndex: number
};


interface ISudokuBox {
	x: number,
	y: number
}

// The values that a sudoku box can get.
var values: readonly string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var emptyBoxes: readonly ISudokuBox[];
var boardStates: { [key: number]: string[][] } = {};
var foundSolution: boolean = false;

function getRow(board: string[][], rowNumber: number): string[] {
	return board[rowNumber];
}

function getColumn(board: string[][], columnNumber: number): string[] {
	return board.map(e => e[columnNumber]);
}

function getEmptyBoxes(board: string[][]): ISudokuBox[] {
	return board.reduce((filtered: ISudokuBox[], boardRow, rowIndex) => {
		boardRow.forEach((rowElement, columnIndex) => {
			if (rowElement === ".") {
				filtered.push({ x: rowIndex, y: columnIndex });
			}
		});

		return filtered;
	}, []);
}


function getAvailableValuesForSudokuBox(board: string[][], sudokuBox: ISudokuBox) {
	const row = getRow(board, sudokuBox.x);
	const column = getColumn(board, sudokuBox.y);

	const takenValues = new Set([...row, ...column].filter(e => e !== "."));

	return values.filter(e => !Array.from(takenValues).includes(e));
}

function setValue(board: string[][], treeNode: ITreeNode, value: string) {
	board[treeNode.coordinates.x][treeNode.coordinates.y] = value;
	treeNode.value = value;
}

function DFS(treeNode: ITreeNode, value: string, boardIndex: number) {
	if (foundSolution) {
		return;
	}
	
	if (treeNode.childrenNodes != null) {
		if (treeNode.childrenNodes.some(e => e.visited)) {
			return;
		}
	}

	if (treeNode.boxIndex === emptyBoxes.length - 1) {
		foundSolution = true;
		return;
	}

	setValue(boardStates[boardIndex], treeNode, value);
	const availableValues = getAvailableValuesForSudokuBox(boardStates[boardIndex], emptyBoxes[treeNode.boxIndex + 1])

	for (const value of availableValues) {

	}

}

function solveSudoku(board: string[][]): void {
	emptyBoxes = getEmptyBoxes(board);

	const firstBoxValues = getAvailableValuesForSudokuBox(board, emptyBoxes[0]);

	const promises = firstBoxValues.map((e, index) => {
		return new Promise<string[][]>((resolve, reject) => {
			boardStates[index] = board
			let root: ITreeNode = {
				coordinates: emptyBoxes[0],
				visited: true,
				boxIndex: 0,
				childrenNodes: []
			};

			DFS(root, e, index);

			resolve(boardStates[index]);
		});
	});

	Promise.all(promises).then((value) => {
		const solution = value[0];
	});


	// Call DFS(root)
}



solveSudoku([
	["5", "3", ".", ".", "7", ".", ".", ".", "."],
	["6", ".", ".", "1", "9", "5", ".", ".", "."],
	[".", "9", "8", ".", ".", ".", ".", "6", "."],
	["8", ".", ".", ".", "6", ".", ".", ".", "3"],
	["4", ".", ".", "8", ".", "3", ".", ".", "1"],
	["7", ".", ".", ".", "2", ".", ".", ".", "6"],
	[".", "6", ".", ".", ".", ".", "2", "8", "."],
	[".", ".", ".", "4", "1", "9", ".", ".", "5"],
	[".", ".", ".", ".", "8", ".", ".", "7", "9"]]);