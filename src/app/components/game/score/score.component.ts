import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'score',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'centeredblock',
    },
    styles: [`
        .centeredblock__element {
            width: 200px;
        }

        .games {
            margin: 0 0 10px 0;
        }

        .player {
            display: flex;
            align-items: center;
            padding-left: 20px;
            text-align: left;
            background: #ffffff33;
            transition: background .4s;
            margin-bottom: 10px;
            border-radius: 10px;
        }

        .token {
            transform: scale(3);
            transform-origin: 50% 52%;
            opacity: .6;
            margin-right: 25px;
        }

        .player.turn {
            background: #ffffffab;
        }
        .player.turn .token {
            transform: scale(4);
            opacity: 1;
            font-weight: bold;
        }

        .token1 {
            color: #ffff00;
        }
        .token2 {
            color: #ff0000;
        }
    `],
    template: `
        <div class="centeredblock__element">
            <p class="games">{{ players.nbGames }} games played!</p>
            <div class="player" [class.turn]="playerTurn === 1">
                <div class="token token1">⍟</div>
                <p><b>{{ players.namePlayer1 }}</b> ({{ players.nbWinsPlayer1 }})</p>
            </div>
            <div class="player" [class.turn]="playerTurn === 2">
                <div class="token token2">⍟</div>
                <p><b>{{ players.namePlayer2 }}</b> ({{ players.nbWinsPlayer2 }})</p>
            </div>
            <div class="centeredblock__element__buttons">
                <button (click)="restartGame.emit()">Restart</button>
                <button (click)="backToHome.emit()">Home</button>
            </div>
        </div>`,
})
export class ScoreComponent {
    @Input() players: ICurrentPlayers
    @Input() playerTurn: 1 | 2

    @Output() restartGame = new EventEmitter<null>(false)
    @Output() backToHome = new EventEmitter<null>(false)
}
