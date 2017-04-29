import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { UserInfoComponent } from './user-info/user-info.component';
import { GameroomComponent } from './gameroom/gameroom.component';
import { routing } from './app.routes';

import { GamearenaComponent } from './gamearena/gamearena.component';
import {AppService} from './app.service';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UserInfoComponent,
    GameroomComponent,
    GamearenaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    BootstrapModalModule,
    routing
  ],
    entryComponents: [
    UserInfoComponent,

  ],
  providers:[AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
