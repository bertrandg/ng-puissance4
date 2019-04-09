import { Component, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { isTouchDevice, isPwaMode } from '../data/utils';


@Component({
    selector: 'puissance4-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <router-outlet></router-outlet>
        <toggle-fullscreen *ngIf="!isPwaMode"></toggle-fullscreen>`,
})
export class AppComponent {
    isTouchDevice: boolean = isTouchDevice();
    isPwaMode: boolean = isPwaMode();

    constructor(private elRef: ElementRef,
                private renderer: Renderer2,
                private swUpdate: SwUpdate) {

        if(this.isTouchDevice) {
            this.renderer.addClass(this.elRef.nativeElement, 'is-touch-device');
        }

        if(this.isPwaMode) {
            this.renderer.addClass(this.elRef.nativeElement, 'is-pwa-mode');
        }

        if(this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                if(confirm('New version available. Load new version?')) {
                    window.location.reload();
                }
            });
        }
    }
}
