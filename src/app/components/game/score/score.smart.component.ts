import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { DataFacade } from '../../../data/facade';


@Component({
    selector: 'score-smart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <score [players]="players$ | async"
               [playerTurn]="playerTurn$ | async"
               (restartGame)="restartGame()"
               (backToHome)="backToHome()"></score>`,
})
export class ScoreSmartComponent {
    players$ = this.facade.getPlayers();
    playerTurn$ = this.facade.getGamePlayerTurn();

    constructor(private router: Router,
                private facade: DataFacade) {}
    
    restartGame() {
        this.facade.initGame();
    }
    
    backToHome() {
        this.router.navigate(['/home']);
    }
}
