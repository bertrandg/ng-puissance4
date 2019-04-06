import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'board-column',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            transition: border .4s;
            border: 4px solid grey;
            cursor: pointer;
        }

        :host.is-full {
            cursor: not-allowed;
        }

        :host:not(.is-full):hover {
            z-index: 10;
        }

        :host.player1:not(.is-full):hover {
            border-color: #ffff00c4;
        }

        :host.player2:not(.is-full):hover {
            border-color: #ff0000c4;
        }
    `],
    template: `
        <board-cell *ngFor="let rowValue of columnValues; trackBy: trackByFn; let i = index"
                    [columnNum]="columnNum" 
                    [rowNum]="columnValues.length - i - 1" 
                    [rowValue]="columnValues[columnValues.length - i - 1]" 
                    [isChainPart]="isChainPart(columnValues.length - i - 1)"></board-cell>`,
})
export class BoardColumnComponent {
    @Input() columnNum: number
    @Input() columnValues: Array<CellValueTypes>
    @Input() playerTurn: 1 | 2
    @Input() isFull: boolean
    @Input() winChainsCells: Array<string>

    @HostBinding('class') get classes(): string {
        return `player${ this.playerTurn } ${ this.isFull ? 'is-full' : '' }`;
    }

    /*ngAfterViewChecked() {
        console.log('cd run column ', this.columnNum)
    }*/

    isChainPart(rowNum: number): boolean {
        return this.winChainsCells.includes(String(this.columnNum)+String(rowNum));
    }

    trackByFn(index: number) {
        return index;
    }
}
