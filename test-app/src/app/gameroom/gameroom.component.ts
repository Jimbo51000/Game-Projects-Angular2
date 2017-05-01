import { Component, OnInit } from '@angular/core';
import {Player} from '../modal/player';
import {PlayerService} from '../services/player.service';
@Component({
  selector: 'app-gameroom',
  templateUrl: './gameroom.component.html',
  styleUrls: ['./gameroom.component.css']
})
export class GameroomComponent implements OnInit {

  players: Player[];
  constructor(private playerService:PlayerService) { }

  ngOnInit() {
    console.log('game room initialised');
    //do a service request call to fetch all the players
    this.players = this.playerService.players;
    // this.playerService.getPlayers().subscribe(data=>{
    //   this.players = data;
    // });
  }



}
