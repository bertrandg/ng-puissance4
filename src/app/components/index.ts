import { AppComponent } from './app.component';

import { HomeRouteComponent } from './home/home.route.component';
import { MenuSmartComponent } from './home/menu/menu.smart.component';
import { MenuComponent } from './home/menu/menu.component';

import { ConfigRouteComponent } from './config/config.route.component';
import { PlayersFormSmartComponent } from './config/players/playersForm.smart.component';
import { PlayersFormComponent } from './config/players/playersForm.component';

import { GameRouteComponent } from './game/game.route.component';
import { BoardSmartComponent } from './game/board/board.smart.component';
import { BoardComponent } from './game/board/board.component';
import { BoardColumnComponent } from './game/board/boardColumn.component';
import { BoardCellComponent } from './game/board/boardCell.component';
import { StatusSmartComponent } from './game/status/status.smart.component';
import { StatusComponent } from './game/status/status.component';
import { ScoreSmartComponent } from './game/score/score.smart.component';
import { ScoreComponent } from './game/score/score.component';


export const components = [
    AppComponent,

    HomeRouteComponent,
    MenuSmartComponent,
    MenuComponent,
    
    ConfigRouteComponent,
    PlayersFormSmartComponent,
    PlayersFormComponent,
    
    GameRouteComponent,
    BoardSmartComponent,
    BoardComponent,
    BoardColumnComponent,
    BoardCellComponent,
    StatusSmartComponent,
    StatusComponent,
    ScoreSmartComponent,
    ScoreComponent,
];