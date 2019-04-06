import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'puissance4-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <router-outlet></router-outlet>`,
})
export class AppComponent {}
