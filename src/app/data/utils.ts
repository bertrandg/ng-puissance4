
//////////////////////////////////////
// GLOBAL

export const NB_ROWS = 6;
export const NB_COLUMNS = 7;
export const NB_CELL_FOR_CHAIN = 4;


//////////////////////////////////////
// LOCAL STORAGE

const LOCAL_STORAGE_KEY = 'puissance4_game_data';

export function getLocalStorage(): IAppStore | null {
    const encoded = localStorage.getItem(LOCAL_STORAGE_KEY);
    let state: IAppStore | null = null;

    try {
        state = encoded ? JSON.parse(encoded) : null;
    } catch(e) {}

    return state;
}

export function setLocalStorage(state: IAppStore) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state)); 
}

export function removeLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY); 
}


//////////////////////////////////////
// BOARD LOGIC

export function getEmptyBoard(): IBoard {
    return Array(NB_COLUMNS).fill(Array(NB_ROWS).fill(0));
}

export function getUpdatedBoard(board: IBoard, column: number, row: number, player: 1 | 2): IBoard {
    const updatedBoard = [...board];
    updatedBoard[column] = updatedBoard[column].map((rowValue, i) => i === row ? player : rowValue);
    return updatedBoard;
}

export function isBoardFull(board: IBoard): boolean {
    return board.every(column => isBoardColumnFull(column));
}

export function isBoardColumnFull(column: Array<CellValueTypes>): boolean {
    return column.includes(0) === false;
  }

export function getChainsFromBoard(board: IBoard): Array<IChain> {
    return getChainsFromLines([
        ...getHorizonralLines(board),
        ...getVerticalLines(board),
        ...getTopLeftToBottomRightLines(board),
        ...getBottomLeftToTopRightLines(board),
    ]);
}

////////

function getHorizonralLines(board: IBoard): Array<Array<ICellDetails>> {
    const lines: Array<Array<ICellDetails>> = [];

    for(let r: number = 0; r < NB_ROWS; r++) {
        lines.push(board.map((columnValues, i) => ({column: i, row: r, value: columnValues[r]})));
    }

    return lines;
}

//

function getVerticalLines(board: IBoard): Array<Array<ICellDetails>> {
    const lines: Array<Array<ICellDetails>> = [];

    for(let c: number = 0; c < NB_COLUMNS; c++) {
        lines.push(board[c].map((rowValue, i) => ({column: c, row: i, value: rowValue})));
    }

    return lines;
}

//

function getTopLeftToBottomRightLines(board: IBoard): Array<Array<ICellDetails>> {
    const startingCells: Array<ICellPosition> = [];
    
    // Cells from first column
    for(let r: number = 0; r < NB_ROWS; r++) {
        startingCells.push({row: r, column: 0});
    }

    // Cells from first row
    for(let c: number = 0; c < NB_COLUMNS; c++) {
        if(c !== 0) { // To avoid duplicate entry from previous loop
            startingCells.push({row: NB_ROWS - 1, column: c});
        }
    }
    
    return startingCells
        .map(cell => getTopLeftToBottomRightLine(board, cell))
        .filter(line => line.length >= NB_CELL_FOR_CHAIN);
}

function getTopLeftToBottomRightLine(board: IBoard, start: ICellPosition): Array<ICellDetails> {
    const cells: Array<ICellDetails> = [];
    let c: number = start.column;
    let r: number = start.row;

    while(c < NB_COLUMNS && r >= 0) {
        cells.push({column: c, row: r, value: board[c][r]});
        r--;
        c++;
    }

    return cells;
}

//

function getBottomLeftToTopRightLines(board: IBoard): Array<Array<ICellDetails>> {
    const startingCells: Array<ICellPosition> = [];
    
    // Cells from first row
    for(let c: number = NB_COLUMNS - 1; c >= 0; c--) {
        startingCells.push({row: 0, column: c});
    }
    
    // Cells from last column
    for(let r: number = 0; r < NB_ROWS; r++) {
        if(r !== 0) { // To avoid duplicate entry from previous loop
            startingCells.push({row: r, column: 0});
        }
    }

    return startingCells
        .map(cell => getBottomLeftToTopRightLine(board, cell))
        .filter(line => line.length >= NB_CELL_FOR_CHAIN);

}

function getBottomLeftToTopRightLine(board: IBoard, start: ICellPosition): Array<ICellDetails> {
    const cells: Array<ICellDetails> = [];
    let c: number = start.column;
    let r: number = start.row;

    while(c < NB_COLUMNS && r < NB_ROWS) {
        cells.push({column: c, row: r, value: board[c][r]});
        r++;
        c++;
    }

    return cells;
}

////////

function getChainsFromLines(lines: Array<Array<ICellDetails>>): Array<IChain> {
    const chains: Array<IChain> = [];

    lines.forEach(line => {
        chains.push(...getChainsFromLine(line));
    });

    return chains;
}

function getChainsFromLine(line: Array<ICellDetails>): Array<IChain> {
    const stringifiedLine = line.map(cell => cell.value).join('');
    const pattern1 = '1'.repeat(NB_CELL_FOR_CHAIN);
    const pattern2 = '2'.repeat(NB_CELL_FOR_CHAIN);

    // Allow only one chain per line..
    
    if(stringifiedLine.includes(pattern1)) {
        const position = stringifiedLine.indexOf(pattern1);

        return [{
            player: 1,
            cells: line.slice(position, position + NB_CELL_FOR_CHAIN),
        }];
    }
    else if(stringifiedLine.includes(pattern2)) {
        const position = stringifiedLine.indexOf(pattern2);

        return [{
            player: 2,
            cells: line.slice(position, position + NB_CELL_FOR_CHAIN),
        }];
    }

    return [];
}


//////////////////////////////////////
// OTHERS

export function isTouchDevice(): boolean {
    return 'ontouchstart' in document.documentElement
        || navigator.maxTouchPoints > 0
        || navigator.msMaxTouchPoints > 0;
}

export function isPwaMode(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches 
        || window.navigator['standalone'];

}
