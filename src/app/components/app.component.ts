import { Component, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';

import { hasTouch } from '../data/utils';


@Component({
    selector: 'puissance4-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <router-outlet></router-outlet>`,
})
export class AppComponent {

    constructor(public elRef: ElementRef,
                private renderer: Renderer2) {
        if(hasTouch()) {
            this.renderer.addClass(this.elRef.nativeElement, 'is-touch-device');
        }
    }
}
