import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, HostBinding } from '@angular/core';

import { isBoardColumnFull } from '../../../data/utils';


@Component({
    selector: 'board',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'board-effect',
    },
    styles: [`
        :host {
            display: flex;
            flex-direction: row;
        }
    `],
    template: `
        <board-column *ngFor="let columnValues of board; trackBy: trackByFn; let i = index"
                      [class]="'player'+playerTurn" 
                      [columnNum]="i"
                      [columnValues]="columnValues" 
                      [playerTurn]="playerTurn"
                      [isFull]="isFull(columnValues)" 
                      [winChainsCells]="winChainsCells"
                      (click)="addToken.emit(i)"></board-column>`,
})
export class BoardComponent {
    @Input() board: IBoard
    @Input() playerTurn: 1 | 2
    @Input() isGameEnded: boolean
    @Input() winChainsCells: Array<string>

    @Output() addToken = new EventEmitter<number>(false)

    isFull(column: Array<CellValueTypes>): boolean {
        return this.isGameEnded || isBoardColumnFull(column);
    }

    trackByFn(index: number) {
        return index;
    }
}
