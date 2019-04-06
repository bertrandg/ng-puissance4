
interface IAppStore {
  router: any
  players: ICurrentPlayers
  game: ICurrentGame
}


interface ICurrentPlayers {
  namePlayer1: string
  namePlayer2: string
  nbGames: number
  nbWinsPlayer1: number
  nbWinsPlayer2: number
}

interface ICurrentGame {
  board: IBoard
  playerTurn: 1 | 2
  status: GameStatusTypes
  winChainsCells: Array<string>
}

interface IChain {
  player: 1 | 2
  cells: Array<ICellDetails>
}

// Columns array containing row values
interface IBoard extends Array<Array<CellValueTypes>> {}


type GameStatusTypes = 'PROGRESS' | 'DRAW' | 'WIN_PLAYER_1' | 'WIN_PLAYER_2';
type CellValueTypes = 0 | 1 | 2;


interface ICellPosition {
  row: number
  column: number
}

interface ICellDetails extends ICellPosition {
  value: CellValueTypes
}