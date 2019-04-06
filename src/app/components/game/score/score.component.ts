import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'score',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'centeredblock',
    },
    styleUrls: [`./score.component.scss`],
    template: `
        <div class="centeredblock__element">
            <p class="score__games">{{ players.nbGames }} games played!</p>
            <div class="score__player" [class.score__player--turn]="playerTurn === 1">
                <div class="player__token player__token---p1">⍟</div>
                <p><b>{{ players.namePlayer1 }}</b> ({{ players.nbWinsPlayer1 }})</p>
            </div>
            <div class="score__player" [class.score__player--turn]="playerTurn === 2">
                <div class="player__token player__token---p2">⍟</div>
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
