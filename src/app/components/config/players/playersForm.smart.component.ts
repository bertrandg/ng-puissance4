import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { DataFacade } from 'app/data/facade';


@Component({
    selector: 'players-form-smart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <players-form [players]="players$ | async" 
                      (backToHome)="backToHome()"
                      (initPlayers)="initPlayers($event)"></players-form>`,
})
export class PlayersFormSmartComponent {
    players$ = this.facade.getPlayers();

    constructor(private router: Router,
                private facade: DataFacade) {}

    backToHome() {
        this.router.navigate(['/home']);
    }

    initPlayers(names: {player1: string, player2: string}) {
        this.facade.initPlayers(names);
        this.facade.initGame();
        this.router.navigate(['/game']);
    }
}
