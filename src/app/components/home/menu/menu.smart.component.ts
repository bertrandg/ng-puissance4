import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { DataFacade } from '../../../data/facade';


@Component({
    selector: 'menu-smart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <menu [status]="status$ | async"
              [players]="players$ | async"
              (newGame)="newGame()"
              (resetData)="resetData()"
              (resumeGame)="resumeGame()"></menu>`,
})
export class MenuSmartComponent {
    status$ = this.facade.getGameStatus();
    players$ = this.facade.getPlayers();

    constructor(private router: Router,
                private facade: DataFacade) {}
    
    newGame() {
        this.router.navigate(['/config']);
    }
    
    resetData() {
        this.facade.resetAll();
    }
    
    resumeGame() {
        this.router.navigate(['/game']);
    }
}
