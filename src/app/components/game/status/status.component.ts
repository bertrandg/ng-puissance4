import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';


@Component({
    selector: 'status',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'centeredblock',
    },
    styleUrls: [`./status.component.scss`],
    animations: [
        trigger('gameEndedAnimation', [
            state('isPlaying', style({
                opacity: 0,
                transform: 'scale(.8)',
            })),
            state('isEnded', style({
                opacity: 1,
                transform: 'scale(1)',
            })),
            transition('isPlaying => isEnded', animate('.1s 1.5s')),
            transition(':enter', [
                style({ 
                    opacity: 0,
                    transform: 'scale(.8)',
                }),
                animate('.2s .4s', style({
                    opacity: 1,
                    transform: 'scale(1)',
                })),
            ]),
        ]),
    ],
    template: `
        <div [@gameEndedAnimation]="status === 'PROGRESS' ? 'isPlaying' : 'isEnded'" class="centeredblock__element">
            <h2>{{ getMessage() }}</h2>
            <button (click)="playAgain.emit()">Play again</button> 
            <button (click)="backToHome.emit()">Home</button>
        </div>`,
})
export class StatusComponent {
    @Input() status: GameStatusTypes
    @Input() players: ICurrentPlayers

    @Output() playAgain = new EventEmitter<null>(false)
    @Output() backToHome = new EventEmitter<null>(false)

    @HostBinding('class.visible') get isVisible(): boolean {
        return (this.status !== 'PROGRESS');
    }
    
    @HostBinding('class.player1') get isPlayer1(): boolean {
        return (this.status === 'WIN_PLAYER_1');
    }
    
    @HostBinding('class.player2') get isPlayer2(): boolean {
        return (this.status === 'WIN_PLAYER_2');
    }

    getMessage(): string {
        switch(this.status) {
            case 'DRAW':
                return 'Draw!';

            case 'WIN_PLAYER_1':
                return `${ this.players.namePlayer1 } wins!`;

            case 'WIN_PLAYER_2':
                return `${ this.players.namePlayer2 } wins!`;

            default:
                return '';
        }
    }
}
