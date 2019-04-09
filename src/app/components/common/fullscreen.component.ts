import { Component, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';
import {Screenfull} from 'screenfull';


@Component({
    selector: 'toggle-fullscreen',
    styles: [`
        :host {
            display: block;
            width: 50px;
            height: 50px;
            position: fixed;
            right: 0;
            top: 0;
            padding: 10px;
            cursor: pointer;
        }
        
        svg {
            fill: #8f7a66;
        }

        svg:hover {
            fill: #b9926d;
        }
    `],
    template: `
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 488.4 488.4" style="enable-background:new 0 0 488.4 488.4;" xml:space="preserve">
            <g>
                <polygon points="441.1,407.8 338.8,305.5 305.5,338.8 407.8,441.1 328.3,441.1 328.3,488.4 488.4,488.4 488.4,328.3 441.1,328.3"/>
                <polygon points="338.8,183 441.1,80.6 441.1,160.1 488.4,160.1 488.4,0 328.3,0 328.3,47.3 407.8,47.3 305.5,149.6"/>
                <polygon points="149.6,305.5 47.3,407.8 47.3,328.3 0,328.3 0,488.4 160.1,488.4 160.1,441.1 80.6,441.1 183,338.8"/>
                <polygon points="160.1,47.3 160.1,0 0,0 0,160.1 47.3,160.1 47.3,80.6 149.6,183 183,149.6 80.6,47.3"/>
            </g>
        </svg>`
})
export class ToggleFullscreenComponent {
	@HostListener('click') onClick() {
		if((<Screenfull> screenfull).enabled) {
			(<Screenfull> screenfull).toggle();
		}
	}
}