import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'players-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'centeredblock',
    },
    styles: [`
        .player-input {
            margin-bottom: 10px;
        }
        .player-input label {
            margin-right: 10px;
        }

        .player-input,
        .player-input label {
            display: flex;
            align-items: center;
            flex: 1 1 auto;
        }

        .token {
            margin-right: 10px;
            width: 30px;
            height: 30px;
        }
    `],
    template: `
        <form [formGroup]="form" (ngSubmit)="submit($event)" class="centeredblock__element" novalidate>
            <div class="player-input">
                <label>
                    <div class="token">
                        <token color="yellow" [nbEmptyCellsOnTop]="0"></token>
                    </div> 
                    Player 1:
                </label>
                <input type="text" class="form-control" formControlName="player1" placeholder="enter player 1 name" />
            </div>
            <div class="player-input">
                <label>
                    <div class="token">
                        <token color="red" [nbEmptyCellsOnTop]="0"></token>
                    </div>
                    Player 2:
                </label>
                <input type="text" class="form-control" formControlName="player2" placeholder="enter player 2 name" />
            </div>
            <div class="centeredblock__element__buttons">
                <button type="button" (click)="backToHome.emit()">Home</button>
                <button type="submit" [disabled]="form.invalid">Start game</button>
            </div>
        </form>`,
})
export class PlayersFormComponent {
    @Input() players: ICurrentPlayers

    @Output() backToHome = new EventEmitter<null>(false)
    @Output() initPlayers = new EventEmitter<{player1: string, player2: string}>(false)
  
    form: FormGroup = new FormGroup({
        player1: new FormControl('', [Validators.required, Validators.maxLength(22)]),
        player2: new FormControl('', [Validators.required, Validators.maxLength(22)]),
    })

    submit(event: Event) {
        event.preventDefault();
        
        if(this.form.valid) {
            this.initPlayers.emit(this.form.value);
        }
    }
}
