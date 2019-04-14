import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';


@Component({
    selector: 'token',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('tokenEnterAnimation', [
            transition(':enter', [
                style({
                    position: 'relative', 
                    transform: 'translateY({{ startAt }})',
                }),
                animate('{{ duration }} ease', 
                style({transform: 'translateY(0)'})),
            ]),
        ]),
        trigger('tokenAnimation', [
            transition('* => isWinner', [
                animate('6s .5s', keyframes([
                    style({transform: 'rotate(90deg)', offset: .05}),
                    style({transform: 'rotate(180deg)', offset: .10}),
                    style({transform: 'rotate(270deg)', offset: .15}),
                    style({transform: 'rotate(360deg)', offset: .20}),
                    style({transform: 'rotate(450deg)', offset: .25}),
                    style({transform: 'rotate(540deg)', offset: .30}),
                    style({transform: 'rotate(630deg)', offset: .35}),
                    style({transform: 'rotate(720deg)', offset: .40}),
                    style({transform: 'rotate(810deg)', offset: .45}),
                    style({transform: 'rotate(900deg)', offset: .50}),
                    style({transform: 'rotate(990deg)', offset: .55}),
                    style({transform: 'rotate(1080deg)', offset: .60}),
                    style({transform: 'rotate(1170deg)', offset: .65}),
                    style({transform: 'rotate(1260deg)', offset: .70}),
                    style({transform: 'rotate(1350deg)', offset: .75}),
                    style({transform: 'rotate(1440deg)', offset: .80}),
                    style({transform: 'rotate(1530deg)', offset: .85}),
                    style({transform: 'rotate(1620deg)', offset: .90}),
                    style({transform: 'rotate(1710deg)', offset: .95}),
                    style({transform: 'rotate(1800deg)', offset: 1}),
                ])),
            ]),
        ]),
    ],
    template: `
        <svg [@tokenEnterAnimation]="{value: false, params: animationParams}" 
             [@tokenAnimation]="isWinner ? 'isWinner' : ''" 
             [attr.fill]="color" 
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
        </svg>`,
})
export class TokenComponent {
    @Input() color: number
    @Input() nbEmptyCellsOnTop: number
    @Input() isWinner: number

    randomAngle: number = Math.floor(Math.random() * 180);

    get animationParams() {
        return {
            startAt: -100 * this.nbEmptyCellsOnTop + '%', 
            duration: .1 * this.nbEmptyCellsOnTop + 's',
        };
    }
}
