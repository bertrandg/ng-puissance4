import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { playersReducer, initialState as playersState } from './players.reducer';
import { gameReducer, initialState as gameState } from './game.reducer';
import { environment } from '../../../environments/environment';


export const initialState: IAppStore = {
    router: null,
    players: playersState,
    game: gameState,
}

export const reducers: ActionReducerMap<IAppStore> = {
    router:   routerReducer,
    players:  playersReducer,
    game:     gameReducer,
};

export const metaReducers = !environment.production ? [logger] : [];

// Log all actions in devTools console
function logger(reducer: ActionReducer<IAppStore>): ActionReducer<any, any> {
    return function(state: IAppStore, action: any): IAppStore {
        const newState = reducer(state, action);
        console.log(`ACTION %c${ action.type }`, `color: cornflowerblue;`, {payload: action.payload, state: newState});
        return newState;
    };
}


