interface ITreeNode {
	childrenNodes?: ITreeNode[],
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

function DFS(treeNode: ITreeNode, board: string[][]) {

	treeNode.childrenNodes = getAvailableValuesForSudokuBox(emptyBoxes[treeNode.boxIndex + 1])

}

function solveSudoku(board: string[][]): void {
	emptyBoxes = getEmptyBoxes(board);

	const firstBoxValues = getAvailableValuesForSudokuBox(board, emptyBoxes[0]);
	
	const promises = firstBoxValues.map(e => {
		return new Promise((resolve, reject) => {
			let boardState = board;
			let root: ITreeNode = {
				coordinates: emptyBoxes[0],
				visited: true,
				boxIndex: 0,
			};

			setValue(boardState, root, e);

			
		});
	});

	Promise.all(promises).then(console.log);


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