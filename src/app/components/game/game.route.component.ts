import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'game-route',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [`./game.route.component.scss`],
    template: `
        <div>
            <board-smart></board-smart>
            <status-smart></status-smart>
        </div>
        <score-smart></score-smart>`,
})
export class GameRouteComponent {}
