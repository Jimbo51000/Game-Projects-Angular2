import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
import { UserInfoComponent } from '../user-info/user-info.component';
import { Router } from '@angular/router';
import { Player } from '../modal/player';
import { PlayerService } from '../services/player.service';
import { AppService } from '../app.service';
import { HomeScreenMessage } from '../app.service';
import {AppComponent} from '../app.component';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  username: string = '';

  constructor(private dialogService: DialogService, private router: Router, private playerService: PlayerService, private appService: AppService) {
      // this.appService.homeScreenMessage = new HomeScreenMessage("","");
  }


  showNamePrompt() {
    this.dialogService.addDialog(UserInfoComponent, {
      title: 'Name dialog',
      question: 'What is your name?: '
    })
      .subscribe((message) => {
        //We get dialog result
        this.username = message;
        //add this user to player list
        let res = {};
        this.playerService.addPlayer(new Player(this.username))
          .subscribe(data => {
            res = data;
            //navigate to the game room
            //cannot call this outside due to async operation of the dialog service
            if (res['success']) {             
              this.appService.setHomeScreenMessage("You have entered the game room","alert alert-success");
              this.router.navigate(['/gameroom']);
            }
            else {
              this.appService.setHomeScreenMessage("Either invalid name/Max Users reached", "alert alert-warning");
            }


          });
      });

  }
}
