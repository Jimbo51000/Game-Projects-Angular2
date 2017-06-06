import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameroomComponent } from './gameroom/gameroom.component';
import { LandingComponent } from './landing/landing.component';
import { GamearenaComponent } from './gamearena/gamearena.component';
// Route Configuration
export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gameroom', component: GameroomComponent },
   { path: 'gamearena', component: GamearenaComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);