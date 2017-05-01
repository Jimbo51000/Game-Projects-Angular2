import { Component } from '@angular/core';
import {PlayerService} from './services/player.service';
import {AppService } from './app.service';
import {HomeScreenMessage } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
}) 
export class AppComponent {
  title = 'Game';
  homeScreenMessage:HomeScreenMessage ;
  constructor(private appService :AppService){
    console.log('app.component.constructor');
    this.homeScreenMessage = this.appService.getHomeScreenMessage();
  }

   getHomeScreenMessage():HomeScreenMessage{
      return this.homeScreenMessage;
  }

  setHomeScreenMessage(message:HomeScreenMessage):void{
    this.homeScreenMessage = message;
  }

}
