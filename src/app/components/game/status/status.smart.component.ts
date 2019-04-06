import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { DataFacade } from '../../../data/facade';


@Component({
    selector: 'status-smart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <status [status]="status$ | async"
                [players]="players$ | async"
                (playAgain)="playAgain()"
                (backToHome)="backToHome()"></status>`,
})
export class StatusSmartComponent {
    status$ = this.facade.getGameStatus();
    players$ = this.facade.getPlayers();

    constructor(private router: Router,
                private facade: DataFacade) {}

    playAgain() {
        this.facade.initGame();
    }
    
    backToHome() {
        this.router.navigate(['/home']);
    }
}
