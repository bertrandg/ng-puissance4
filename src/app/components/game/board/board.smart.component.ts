import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DataFacade } from 'app/data/facade';


@Component({
    selector: 'board-smart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <board [board]="board$ | async" 
           [playerTurn]="playerTurn$ | async" 
           [isGameEnded]="isGameEnded$ | async" 
           [winChainsCells]="winChainsCells$ | async" 
           (addToken)="addToken($event)"></board>`,
})
export class BoardSmartComponent {
    board$ = this.facade.getGameBoard();
    playerTurn$ = this.facade.getGamePlayerTurn();
    isGameEnded$ = this.facade.isGameEnded();
    winChainsCells$ = this.facade.getGameWinChainsCells();

    constructor(private facade: DataFacade) {}

    addToken(column: number) {
        this.facade.addToken(column);
    }
}
