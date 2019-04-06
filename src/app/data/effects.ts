import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { withLatestFrom, filter, tap, map, throttleTime } from 'rxjs/operators';

import { ActionTypes, INIT_ALL, INIT_PLAYERS, INIT_GAME, ADD_TOKEN_TO_COLUMN, UPDATE_GAME, END_GAME, ERROR_GAME, RESET_ALL } from './actions';
import { getLocalStorage, setLocalStorage, removeLocalStorage, getUpdatedBoard, isBoardFull, getChainsFromBoard } from './utils';


@Injectable()
export class Puissance4Effects {

    constructor(private updates$: Actions,
    private store$: Store<IAppStore>) {}

    @Effect() renderGame$ = this.updates$.pipe(
        ofType<ADD_TOKEN_TO_COLUMN>(
            ActionTypes.ADD_TOKEN_TO_COLUMN,
        ),
        throttleTime(200),
        withLatestFrom(
            this.store$.select(s => s.game)
        ),
        map(([action, state]) => {
            const column = state.board[action.payload.column];
            const indexFirstEmptyRow = column.indexOf(0);

            if(indexFirstEmptyRow === -1) {
                return new ERROR_GAME({message: 'Column full.'});
            }

            if(state.status !== 'PROGRESS') {
                return new ERROR_GAME({message: 'Game ended.'});
            }

            const updatedBoard = getUpdatedBoard(state.board, action.payload.column, indexFirstEmptyRow, state.playerTurn);

            const isFull = isBoardFull(updatedBoard);
            if(isFull === true) {
                return new END_GAME({column: action.payload.column, row: indexFirstEmptyRow, player: state.playerTurn, status: 'DRAW', winChainsCells: []});
            }

            const chains = getChainsFromBoard(updatedBoard);
            if(chains.length > 0) {
                const status = (chains[0].player === 1) ? 'WIN_PLAYER_1' : 'WIN_PLAYER_2';
                const winChainsCells = chains.reduce((acc, chain) => [...acc, ...chain.cells.map(c => String(c.column)+String(c.row))], []);
                return new END_GAME({column: action.payload.column, row: indexFirstEmptyRow, player: state.playerTurn, status, winChainsCells});
            }

            return new UPDATE_GAME({column: action.payload.column, row: indexFirstEmptyRow, player: state.playerTurn});
        })
    );
    
    //

    @Effect() retrieveFromLocalStorage$ = this.updates$.pipe(
        ofType<Action>(
            ROOT_EFFECTS_INIT
        ),
        filter(() => getLocalStorage() !== null),
        map(() => new INIT_ALL(getLocalStorage()))
    );

    @Effect({dispatch: false}) saveToLocalStorage$ = this.updates$.pipe(
        ofType<INIT_PLAYERS | INIT_GAME | UPDATE_GAME | END_GAME>(
            ActionTypes.INIT_PLAYERS,
            ActionTypes.INIT_GAME,
            ActionTypes.UPDATE_GAME,
            ActionTypes.END_GAME,
        ),
        withLatestFrom(
            this.store$
        ),
        tap(([action, state]) => {
            setLocalStorage(state);
        })
    );

    @Effect({dispatch: false}) resetToLocalStorage$ = this.updates$.pipe(
        ofType<RESET_ALL>(
            ActionTypes.RESET_ALL,
        ),
        tap(() => {
            removeLocalStorage();
        })
    );

}
