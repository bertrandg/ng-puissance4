
import { AppComponent } from 'app/components/app.component';

import { HomeRouteComponent } from 'app/components/home/home.route.component';
import { MenuSmartComponent } from 'app/components/home/menu/menu.smart.component';
import { MenuComponent } from 'app/components/home/menu/menu.component';

import { ConfigRouteComponent } from 'app/components/config/config.route.component';
import { PlayersFormSmartComponent } from 'app/components/config/players/playersForm.smart.component';
import { PlayersFormComponent } from 'app/components/config/players/playersForm.component';

import { GameRouteComponent } from 'app/components/game/game.route.component';
import { BoardSmartComponent } from 'app/components/game/board/board.smart.component';
import { BoardComponent } from 'app/components/game/board/board.component';
import { BoardColumnComponent } from 'app/components/game/board/boardColumn.component';
import { BoardCellComponent } from 'app/components/game/board/boardCell.component';
import { StatusSmartComponent } from 'app/components/game/status/status.smart.component';
import { StatusComponent } from 'app/components/game/status/status.component';
import { ScoreSmartComponent } from 'app/components/game/score/score.smart.component';
import { ScoreComponent } from 'app/components/game/score/score.component';


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