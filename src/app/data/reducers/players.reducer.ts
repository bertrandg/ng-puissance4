import { cloneDeep } from 'lodash';

import { ActionTypes, ActionsUnion } from '../actions';


export const initialState: ICurrentPlayers = {
    namePlayer1: '',
    namePlayer2: '',
    nbGames: 0,
    nbWinsPlayer1: 0,
    nbWinsPlayer2: 0,
};

export function playersReducer(state: ICurrentPlayers = cloneDeep(initialState), action: ActionsUnion): ICurrentPlayers {
    switch(action.type) {
        case ActionTypes.INIT_ALL:
            return action.payload.players;

        case ActionTypes.INIT_PLAYERS:
            return {
                namePlayer1: action.payload.player1,
                namePlayer2: action.payload.player2,
                nbGames: 0,
                nbWinsPlayer1: 0,
                nbWinsPlayer2: 0,
            };

        case ActionTypes.END_GAME:
            return {
                ...state,
                nbGames: state.nbGames + 1,
                nbWinsPlayer1: (action.payload.status === 'WIN_PLAYER_1') ? state.nbWinsPlayer1 + 1 : state.nbWinsPlayer1,
                nbWinsPlayer2: (action.payload.status === 'WIN_PLAYER_2') ? state.nbWinsPlayer2 + 1 : state.nbWinsPlayer2,
            };

        case ActionTypes.RESET_ALL:
            return cloneDeep(initialState);

        default:
            return state;
    }
}