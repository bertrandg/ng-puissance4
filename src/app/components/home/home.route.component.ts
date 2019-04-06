import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'home-route',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <menu-smart></menu-smart>`,
})
export class HomeRouteComponent {}
