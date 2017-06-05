import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../modal/player';
import { PlayerService } from '../services/player.service';
import { AlertComponent } from 'ng2-bootstrap/alert';

import { Router } from '@angular/router';
@Component({
  selector: 'app-gameroom',
  templateUrl: './gameroom.component.html',
  styleUrls: ['./gameroom.component.css']
})
export class GameroomComponent implements OnInit, OnDestroy {

  players: Player[];
  startGame: boolean = false;
  constructor(private playerService: PlayerService, private router: Router) {

    let reference = this;
    this.playerService.socket.on('start-game', function (obj) {
      //if true start the 3 second count down & redirect to game arena
      //alert(obj.value);
      if (obj.value) {

        console.log('start game yeah');
        this.startGame = true;

        setTimeout(() => {
          //reference.router.navigate(['/gamearena']);
        }, 3000);
      }
      else {
        //waiting for other players to join the lobby
      }
    });

  }

  ngOnInit() {
    console.log('game room initialised');
    //do a service request call to fetch all the players
    this.players = this.playerService.players;
    // this.playerService.getPlayers().subscribe(data=>{
    //   this.players = data;
    // });
  }

  ngOnDestroy() {
    if(this.startGame){
        this.playerService.socket.emit('exit-gameroom');
        this.playerService.socket.removeListener('start-game',function(obj){
              console.log('This is to stop the exited player from redirecting');
        });
    }
    
  }




}
