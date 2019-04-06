import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'centeredblock',
    },
    styles: [`
        :host {
            padding: 0;
            margin: 0;
        }

        hi {
            font-size: 55px;
        }
    `],
    template: `
        <div class="centeredblock__element">
            <h1>PUISSANCE 4</h1>
            <div class="centeredblock__element__buttons">
                <button (click)="newGame.emit()">New Players</button>
                <button [disabled]="noPlayer" (click)="resumeGame.emit()">{{ resumeButtonText }}</button>
                <button [disabled]="noPlayer" (click)="resetData.emit()" disabled>Reset data</button>
            <div>
        </div>`,
})
export class MenuComponent {
    @Input() status: GameStatusTypes
    @Input() players: ICurrentPlayers

    @Output() newGame = new EventEmitter<null>(false)
    @Output() resetData = new EventEmitter<null>(false)
    @Output() resumeGame = new EventEmitter<null>(false)

    get noPlayer(): boolean {
        return this.players.namePlayer1 === '' && this.players.namePlayer2 === '';
    }

    get resumeButtonText(): string {
        return this.noPlayer ? 'Resume' : `Resume ${ this.players.namePlayer1 } (${ this.players.nbWinsPlayer1 }) VS ${ this.players.namePlayer2 } (${ this.players.nbWinsPlayer2 })`;
    }
}
