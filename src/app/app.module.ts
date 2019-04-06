import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule  } from '@ngrx/router-store';

import { AppComponent } from 'app/components/app.component';
import { components } from 'app/components';
import { routes } from 'app/routes';
import { DataFacade } from 'app/data/facade';
import { reducers, metaReducers } from 'app/data/reducers/reducers';
import { Puissance4Effects } from 'app/data/effects';


@NgModule({
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes, {enableTracing: false}), 
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([Puissance4Effects]),
        StoreRouterConnectingModule.forRoot(),
    ],
    declarations: [...components],
    providers: [
        {   
            provide: LocationStrategy, 
            useClass: HashLocationStrategy,
        },
        DataFacade,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
