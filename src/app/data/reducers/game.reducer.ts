import { cloneDeep } from 'lodash';

import { getEmptyBoard, getUpdatedBoard } from 'app/data/utils';
import { ActionTypes, ActionsUnion } from 'app/data/actions';


export const initialState: ICurrentGame = {
    board: getEmptyBoard(),
    playerTurn: 1,
    status: 'PROGRESS',
    winChainsCells: [],
};

export function gameReducer(state: ICurrentGame = cloneDeep(initialState), action: ActionsUnion): ICurrentGame {
    switch(action.type) {
        case ActionTypes.INIT_ALL:
            return action.payload.game;

        case ActionTypes.UPDATE_GAME:
            return {
                ...state,
                board: getUpdatedBoard(state.board, action.payload.column, action.payload.row, action.payload.player),
                playerTurn: state.playerTurn === 1 ? 2 : 1,
            };

        case ActionTypes.END_GAME:
            return {
                ...state,
                board: getUpdatedBoard(state.board, action.payload.column, action.payload.row, action.payload.player),
                status: action.payload.status,
                winChainsCells: action.payload.winChainsCells,
            };

        case ActionTypes.INIT_GAME:
        case ActionTypes.RESET_ALL:
            const s = cloneDeep(initialState);
            // Select first player randomly
            s.playerTurn = <1 | 2> Math.floor(Math.random() * 2 + 1);
            return s;

        default:
            return state;
    }
}