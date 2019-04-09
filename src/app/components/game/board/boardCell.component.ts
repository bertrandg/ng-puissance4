import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';

import { NB_ROWS } from '../../../data/utils';


@Component({
    selector: 'board-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [`./boardCell.component.scss`],
    template: `
        <div class="cell__token">
            <token *ngIf="rowValue !== 0"
                            [nbEmptyCellsOnTop]="nbEmptyCellsOnTop"
                            [isWinner]="isChainPart" 
                            [color]="rowValue === 1 ? 'yellow' : 'red'"></token>
        </div>
        <div class="cell__mask">
            <svg version="1.1" 
                 viewBox="0 0 300 300" 
                 preserveAspectRatio="xMinYMin meet">
                <defs>
                    <mask id="mask" x="0" y="0" width="300" height="300">
                        <rect x="0" y="0" width="300" height="300" fill="#ffffff" />
                        <circle cx="150" cy="150" r="130" />
                    </mask>
                </defs>
                <rect x="0" y="0" width="300" height="300" mask="url(#mask)" fill="grey" />
            </svg>
        </div>`,
})
export class BoardCellComponent {
    @Input() columnNum: number
    @Input() rowNum: number
    @Input() rowValue: CellValueTypes
    @Input() isChainPart: boolean

    randomAngle: number = Math.floor(Math.random() * 180);

    get nbEmptyCellsOnTop(): number {
        return NB_ROWS - this.rowNum;
    }
}
