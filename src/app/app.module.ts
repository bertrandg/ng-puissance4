import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule  } from '@ngrx/router-store';

import { AppComponent } from './components/app.component';
import { components } from './components';
import { routes } from './routes';
import { DataFacade } from './data/facade';
import { reducers, metaReducers } from './data/reducers/reducers';
import { Puissance4Effects } from './data/effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes, {enableTracing: false}), 
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([Puissance4Effects]),
        StoreRouterConnectingModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
