import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { INIT_PLAYERS, ADD_TOKEN_TO_COLUMN, RESET_ALL, INIT_GAME, ERROR_GAME } from './actions';


@Injectable()
export class DataFacade {

    constructor(private updates$: Actions,
                private store$: Store<IAppStore>) {}
    
    // RETRIEVE

    getPlayers() {
        return this.store$.select(s => s.players);
    }

    //

    getGame() {
        return this.store$.select(s => s.game);
    }

    getGameStatus() {
        return this.store$.select(s => s.game.status);
    }

    getGameBoard() {
        return this.store$.select(s => s.game.board);
    }
    
    getGamePlayerTurn() {
        return this.store$.select(s => s.game.playerTurn);
    }
    
    isGameEnded() {
        return this.store$.select(s => s.game.status).pipe(
            map(status => Boolean(status !== 'PROGRESS'))
        );
    }

    getGameWinChainsCells() {
        return this.store$.select(s => s.game.winChainsCells);
    }

    // ACTIONS

    initPlayers(names: {player1: string, player2: string}) {
        this.store$.dispatch(new INIT_PLAYERS(names));
    }
    
    addToken(column: number) {
        this.store$.dispatch(new ADD_TOKEN_TO_COLUMN({column}));
    }
    
    resetAll() {
        this.store$.dispatch(new RESET_ALL());
    }
    
    initGame() {
        this.store$.dispatch(new INIT_GAME());
    }
    
    errorGame(message: string) {
        this.store$.dispatch(new ERROR_GAME({message}));
    }
    
}
