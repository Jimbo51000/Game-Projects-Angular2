import { Component, OnInit , OnDestroy} from '@angular/core';
import {Player} from '../modal/player';
import {PlayerService} from '../services/player.service';
import { AlertComponent } from 'ng2-bootstrap/alert';
@Component({
  selector: 'app-gameroom',
  templateUrl: './gameroom.component.html',
  styleUrls: ['./gameroom.component.css']
})
export class GameroomComponent implements OnInit,OnDestroy {

  players: Player[];
  startGame:boolean = false;
  constructor(private playerService:PlayerService) {
     
      this.playerService.socket.on('start-game',function(obj){
          //if true start the 3 second count down & redirect to game arena
          //alert(obj.value);
          if(obj.value){
            alert('start game yeah');
            this.startGame = true;
            setTimeout(()=>{alert('lets redirect ')},3000);
          }
          else{
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

  ngOnDestroy(){
    this.playerService.socket.removeAllListeners('start-game');
  }

  


}
