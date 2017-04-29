import { Injectable } from '@angular/core';

export class HomeScreenMessage{
   message:string="";
   styleClass:string="";

   constructor( homeScreenMessage:string,styleClass:string){
     this.message = homeScreenMessage;
     this.styleClass = styleClass;
   }
}

@Injectable()
export class AppService {
   homeScreenMessage:HomeScreenMessage;
 
  
  constructor() {
    this.homeScreenMessage = new HomeScreenMessage("","");
   }

  getHomeScreenMessage():HomeScreenMessage{
      return this.homeScreenMessage;
  }

  setHomeScreenMessage(message:string,styleClass:string){
    this.homeScreenMessage.message = message;
    this.homeScreenMessage.styleClass = styleClass;
  }

}
