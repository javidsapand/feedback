import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';


import { appEffects } from './effects/app.effects';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';



import {ButtonComponent} from './ui-components/buttons/button';


@NgModule({
  declarations: [
    AppComponent,
    EmptyLayoutComponent,
    HeaderLayoutComponent,
    SidebarLayoutComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(appEffects),
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
