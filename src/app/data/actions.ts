import { Action } from '@ngrx/store';
 

export enum ActionTypes {
  INIT_ALL =            '[App init] INIT_ALL',
  RESET_ALL =           '[User action] RESET_ALL',
  INIT_PLAYERS =        '[User action] INIT_PLAYERS',
  ADD_TOKEN_TO_COLUMN = '[User action] ADD_TOKEN_TO_COLUMN',
  INIT_GAME =           '[User action] INIT_GAME',
  UPDATE_GAME =         '[Effect] UPDATE_GAME',
  END_GAME =            '[Effect] END_GAME',
  ERROR_GAME =          '[Effect] ERROR_GAME',
}


export class INIT_ALL implements Action {
  readonly type = ActionTypes.INIT_ALL;
  constructor(public payload: IAppStore) {}
}

export class RESET_ALL implements Action {
  readonly type = ActionTypes.RESET_ALL;
}

export class INIT_PLAYERS implements Action {
  readonly type = ActionTypes.INIT_PLAYERS;
  constructor(public payload: {player1: string, player2: string}) {}
}

export class ADD_TOKEN_TO_COLUMN implements Action {
  readonly type = ActionTypes.ADD_TOKEN_TO_COLUMN;
  constructor(public payload: {column: number}) {}
}

export class INIT_GAME implements Action {
  readonly type = ActionTypes.INIT_GAME;
}

export class UPDATE_GAME implements Action {
  readonly type = ActionTypes.UPDATE_GAME;
  constructor(public payload: {column: number, row: number, player: 1 | 2}) {}
}

export class END_GAME implements Action {
  readonly type = ActionTypes.END_GAME;
  constructor(public payload: {column: number, row: number, player: 1 | 2, status: GameStatusTypes, winChainsCells: Array<string>}) {}
}

export class ERROR_GAME implements Action {
  readonly type = ActionTypes.ERROR_GAME;
  constructor(public payload: {message: string}) {}
}

export type ActionsUnion = INIT_ALL | RESET_ALL | INIT_PLAYERS | ADD_TOKEN_TO_COLUMN | INIT_GAME | UPDATE_GAME | END_GAME | ERROR_GAME;
