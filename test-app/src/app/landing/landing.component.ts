import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
import { UserInfoComponent } from '../user-info/user-info.component';
import { Router } from '@angular/router';
import {Player} from '../modal/player';
import {PlayerService} from '../services/player.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
username:string = '';
  constructor(private dialogService:DialogService,private router:Router,private playerService:PlayerService) {}

  ngOnInit() {
  }
  showNamePrompt() {
    this.dialogService.addDialog(UserInfoComponent, {
      title:'Name dialog',
      question:'What is your name?: '})
      .subscribe((message)=>{
        //We get dialog result
        this.username = message;
        //add this user to player list
        this.playerService.addPlayer(new Player(this.username));
         //navigate to the game room
         //cannot call this outside due to async operation of the dialog service
        this.router.navigate(['/gameroom']);
      });
     
  }
}
