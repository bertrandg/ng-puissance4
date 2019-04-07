import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';

import { NB_ROWS } from '../../../data/utils';


@Component({
    selector: 'board-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [`./boardCell.component.scss`],
    animations: [
        trigger('tokenEnterAnimation', [
            transition(':enter', [
                style({
                    position: 'relative', 
                    transform: 'translateY({{ startAt }})'
                }),
                animate('{{ duration }} ease', style({
                    transform: 'translateY(0)'
                })),
            ]),
        ]),
        trigger('tokenAnimation', [
            //state('isPlaying', style({transform: `rotate({{ randomAngle }}deg)`}), {params: {randomAngle: 0, startAt: 0, duration: 0}}),
            transition('* => isWinner', [
                //style({transform: 'rotate({{ randomAngle }}deg)'}),
                animate('4s .5s', keyframes([
                    style({transform: 'rotate(90deg)', offset: 0}),
                    style({transform: 'rotate(180deg)', offset: .125}),
                    style({transform: 'rotate(270deg)', offset: .250}),
                    style({transform: 'rotate(360deg)', offset: .375}),
                    style({transform: 'rotate(450deg)', offset: .500}),
                    style({transform: 'rotate(540deg)', offset: .625}),
                    style({transform: 'rotate(630deg)', offset: .750}),
                    style({transform: 'rotate(720deg)', offset: .875}),
                    style({transform: 'rotate(810deg)', offset: 1}),
                ])),
            ]),
        ]),
    ],
    template: `
        <div class="cell__token">
            <svg *ngIf="rowValue !== 0" 
                 [@tokenEnterAnimation]="{value: true, params: animationParams}" 
                 [@tokenAnimation]="{value: isChainPart ? 'isWinner' : 'isPlaying', params: animationParams}" 
                 [attr.fill]="rowValue === 1 ? 'yellow' : 'red'" 
                 version="1.1" 
                 viewBox="0 0 227.438 227.438" 
                 preserveAspectRatio="xMinYMin meet">
                <path style="transform-origin: 50% 50%;" [style.transform]="'rotate(' + randomAngle + 'deg)'"
                      d="M113.719,0C51.014,0,0,51.014,0,113.719s51.014,113.719,113.719,113.719s113.72-51.014,113.72-113.719S176.424,0,113.719,0z
                        M202.65,84.134c-2.927-0.918-6.038-1.415-9.264-1.415c-6.078,0-11.748,1.765-16.538,4.799c-6.997-16.797-20.51-30.215-37.365-37.1
                        c3.098-4.824,4.903-10.553,4.903-16.7c0-3.135-0.472-6.16-1.341-9.014C171.086,33.966,193.309,56.129,202.65,84.134z M83.658,24.945
                        c-0.823,2.784-1.272,5.727-1.272,8.774c0,6.236,1.857,12.043,5.038,16.91C70.702,57.624,57.34,71.081,50.456,87.86
                        c-4.899-3.245-10.766-5.141-17.07-5.141c-2.958,0-5.817,0.425-8.528,1.202C34.158,56.261,56.033,34.324,83.658,24.945z
                        M24.858,143.517c2.711,0.777,5.57,1.202,8.528,1.202c6.304,0,12.171-1.896,17.07-5.141c6.884,16.779,20.246,30.236,36.967,37.231
                        c-3.181,4.867-5.038,10.674-5.038,16.91c0,3.047,0.449,5.99,1.272,8.774C56.033,193.114,34.158,171.178,24.858,143.517z
                        M143.045,202.733c0.869-2.854,1.341-5.88,1.341-9.014c0-6.146-1.805-11.876-4.903-16.7c16.855-6.885,30.367-20.303,37.365-37.1
                        c4.79,3.034,10.46,4.799,16.538,4.799c3.226,0,6.337-0.496,9.264-1.415C193.309,171.309,171.086,193.472,143.045,202.733z"/>
            </svg>
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

    get emptyCellsOnTop(): number {
        return NB_ROWS - this.rowNum;
    }

    get animationParams() {
        return {
            randomAngle: this.randomAngle,
            startAt: -100 * this.emptyCellsOnTop + '%', 
            duration: .1 * this.emptyCellsOnTop + 's',
        };
    }
}
