import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../modal/player';
import { PlayerService } from '../services/player.service';
import { AlertComponent } from 'ng2-bootstrap/alert';

import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
@Component({
  selector: 'app-gameroom',
  templateUrl: './gameroom.component.html',
  styleUrls: ['./gameroom.component.css']
})
export class GameroomComponent implements OnInit, OnDestroy {

  players: Player[];
  startGame: boolean = false;
  timer :Observable<number>;
  subscription: Subscription;
  counter = 0;
  constructor(private playerService: PlayerService, private router: Router) {

    let reference = this;
    this.timer = Observable.timer(0, 1000);
    this.playerService.socket.on('start-game', function (obj) {
      //if true start the 3 second count down & redirect to game arena
      //alert(obj.value);
      if (obj.value) {

        console.log('start game yeah');
        reference.startGame = true;
        reference.counter = obj.delay / 1000;
        // let timer = Observable.timer(0, 1000);
        reference.subscription = reference.timer.subscribe(t => {
          reference.counter -= 1;
          if(reference.counter==0){
                reference.router.navigate(['/gamearena']);
          }
      });

      }

    });


    this.playerService.socket.on('stop-game', function (obj) {
      reference.cancelStartGame();
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
    if (this.startGame) {
      this.cancelStartGame();
      // this.playerService.socket.removeListener('start-game', function (obj) {
      //   console.log('This is to stop the exited player from redirecting');
      // });
    }

  }

  cancelStartGame() {
    this.startGame = false;
    this.subscription.unsubscribe();
    this.counter = 0;

    // this.playerService.socket.removeListener('start-game', function (obj) {
    //   console.log('This is to stop the exited player from redirecting');
    // });
  }


  onClickExitGameRoom() {
    this.cancelStartGame();
    this.playerService.socket.emit('exit-gameroom');
  }

}
