import { Component, OnInit } from '@angular/core';
import {PlayerService } from '../services/player.service'
@Component({
  selector: 'app-gamearena',
  templateUrl: './gamearena.component.html',
  styleUrls: ['./gamearena.component.css']
})
export class GamearenaComponent implements OnInit {

  constructor(private playerService:PlayerService) { 

    let reference = this;
    this.playerService.socket.on('',function(obj){

    });
  }

  ngOnInit() {
  }

}
