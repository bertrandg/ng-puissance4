import { Route } from '@angular/router';

import { HomeRouteComponent } from 'app/components/home/home.route.component';
import { ConfigRouteComponent } from 'app/components/config/config.route.component';
import { GameRouteComponent } from 'app/components/game/game.route.component';


export const routes: Array<Route> = [
    {path:'home',   component: HomeRouteComponent},
    {path:'config', component: ConfigRouteComponent},
    {path:'game',   component: GameRouteComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
];
