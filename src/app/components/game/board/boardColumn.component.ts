import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'board-column',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [`./boardColumn.component.scss`],
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
        return `column--player${ this.playerTurn } ${ this.isFull ? 'column--full' : '' }`;
    }

    isChainPart(rowNum: number): boolean {
        return this.winChainsCells.includes(String(this.columnNum)+String(rowNum));
    }

    trackByFn(index: number) {
        return index;
    }
}
