import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
import { UserInfoComponent } from '../user-info/user-info.component';
import { Router } from '@angular/router';
import { Player } from '../modal/player';
import { PlayerService } from '../services/player.service';
import { AppService } from '../app.service';
import { HomeScreenMessage } from '../app.service';
import { AppComponent } from '../app.component';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  currentPlayer: Player=null;

  constructor(private appService: AppService, private dialogService: DialogService, private router: Router, private playerService: PlayerService) {
    //console.log('landing const called');
    this.playerService.initialisePlayerSocket();
    let reference = this;
    //register all the socket events , bind them
    this.playerService.socket.on('add-player-message', function (message) {
      let type = message.type;
      if (type == 'success-message') {
        if (message.value) {
          reference.appService.setHomeScreenMessage("You have entered the game room", "alert alert-success");
          reference.playerService.addNewPlayertoList(reference.currentPlayer);
          reference.router.navigate(['/gameroom']);
        }
        else {
          reference.appService.setHomeScreenMessage("Either invalid name/Max Users reached", "alert alert-warning");
        }
      }

    });


  }


  addPlayer(username:string): void {
    this.currentPlayer =  new Player(username) ; 
    this.playerService.socket.emit('add-player',this.currentPlayer);
  }

  showNamePrompt() {
    this.dialogService.addDialog(UserInfoComponent, {
      title: 'Name dialog',
      question: 'What is your name?: '
    })
      .subscribe((username) => {
        //We get dialog result
        console.log("Before adding "+this.playerService.players);
        this.addPlayer(username);
      });

  }
}
