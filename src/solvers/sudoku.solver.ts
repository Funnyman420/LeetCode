/**
 * @type Represents an Empty Box on the Board of Sudoku
 */
 interface IEmptyBox {
	x: number,
	y: number,
	availableValues: string[],
	valueIndex: number
}

/**
 * 
 * @param board The two-dimensional board of Sudoku
 * @param rowNumber The number of the row that is to be extracted
 * @returns The desired row of the board
 */
function getRow(board: string[][], rowNumber: number): string[] {
	return board[rowNumber];
}

/**
 * 
 * @param board The two-dimensional board of Sudoku
 * @param columnNumber The number of the column that is to be extracted
 * @returns The desired column of the board
 */
function getColumn(board: string[][], columnNumber: number): string[] {
	return board.map(e => e[columnNumber]);
}

/**
 * 
 * @param board The two-dimensional board of Sudoku
 * @returns A list of IEmptyBox that is practically the Game State
 */
function getEmptyBoxes(board: string[][]): IEmptyBox[] {
	return board.reduce((filtered: IEmptyBox[], boardRow, rowIndex) => {
		boardRow.forEach((rowElement, elementIndex) => {
			if (rowElement === ".") {
				filtered.push({ x: rowIndex, y: elementIndex, availableValues: [], valueIndex: 0 });
			}
		});

		return filtered;
	}, []);
}

function hasErrors(row: string[], colummn: string[], item: IEmptyBox): boolean {

	let emptyBoxStrValue = item.availableValues.toString();

	return row.includes(emptyBoxStrValue) || colummn.includes(emptyBoxStrValue);
}

function getAvailableValuesForEmptyBox(board: string[][], emptyBox: IEmptyBox): void {
	const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
	const row = getRow(board, emptyBox.x);
	const column = getColumn(board, emptyBox.y)

	const takenValues = new Set([...row, ...column].filter(el => el != "."));
	const availableValues = values.filter(el => !Array.from(takenValues).includes(el));


	emptyBox.availableValues = availableValues;
}

function getPreviousBox() {
	
}

function solveSudoku(board: string[][]): void {

	let emptyBoxIndex = 0;
	let emptyBoxes = getEmptyBoxes(board);

	while (emptyBoxIndex < emptyBoxes.length) {

		let currentEmptyBox = emptyBoxes[emptyBoxIndex];

		getAvailableValuesForEmptyBox(board, currentEmptyBox)

		if (currentEmptyBox.availableValues.length > 0) {
			let boardValue = currentEmptyBox.availableValues[currentEmptyBox.valueIndex];

			board[currentEmptyBox.x][currentEmptyBox.y] = boardValue;
			emptyBoxIndex++;
		} else {
			
			// find the previous box that has available values

			let previousBox = emptyBoxes[emptyBoxIndex - 1]
			console.error(`No available values at empty box ${currentEmptyBox.x}, ${currentEmptyBox.y}. Going back`);
			emptyBoxIndex--;
			if (previousBox.valueIndex < previousBox.availableValues.length) {
				previousBox.valueIndex++;
			} else {
				previousBox.valueIndex = 0;
			}	
		}

		console.log(board)
		console.clear();
	}
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