import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'config-route',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <players-form-smart></players-form-smart>`,
})
export class ConfigRouteComponent {}
