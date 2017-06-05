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
  currentPlayer: Player = null;

  constructor(private appService: AppService, private dialogService: DialogService, private router: Router, private playerService: PlayerService) {
    //console.log('landing const called');

    //this is needed when players join late , they wont have the list of total players joined 
    this.playerService.getPlayers().subscribe(data => {
      this.playerService.players = data;
    })
    let reference = this;
    //register all the socket events , bind them -- once !!!!!
 
    if (!this.playerService.socket) {

      //1.
      this.playerService.initialisePlayerSocket();

      //2.multiple socket event listeners  on same event can be bound to same socket such that , single fire of the event can cause the 
      //underlying  code to be executed multiple times . check with a console.log (); & calling this contructor multiple times.

      this.playerService.socket.on('add-player-message', function (message) {
        let type = message.type;
        if (type == 'success-message') {
          if (message.package.success) {
            reference.appService.setHomeScreenMessage(message.package.message, "alert alert-success");
            //reference.playerService.addNewPlayertoList(reference.currentPlayer);
            reference.router.navigate(['/gameroom']);
          }
          else {
            reference.appService.setHomeScreenMessage(message.package.message, "alert alert-warning");
          }
        }

      });
      //3.
      this.playerService.socket.on('add-player-list', function (player) {

        reference.playerService.addNewPlayertoList(player);
        // console.log('new player' + JSON.stringify(player));
        // console.log('updated list' + JSON.stringify(reference.playerService.players));
        // // reference.playerService.addNewPlayertoList(new Player("testplayer"));
      });



      //4.
      this.playerService.socket.on('notification-message',function(obj){
           reference.appService.setHomeScreenMessage(obj.message, "alert alert-info");
      });

      //5.
      this.playerService.socket.on('remove-player-list',function(id){
          reference.playerService.removePlayerFromList(id);
      })
    }





  }


  addPlayer(username: string): void {
    this.currentPlayer = new Player(username);
    this.playerService.socket.emit('add-player', this.currentPlayer);
  }

  showNamePrompt() {
    this.dialogService.addDialog(UserInfoComponent, {
      title: 'Name dialog',
      question: 'What is your name?: '
    })
      .subscribe((username) => {
        //We get dialog result
        this.addPlayer(username);
      });

  }
}
