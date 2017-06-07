import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gamearena',
  templateUrl: './gamearena.component.html',
  styleUrls: ['./gamearena.component.css']
})
export class GamearenaComponent implements OnInit {

  disableInputBox: boolean = false;
  disappear: boolean = false;
  disappearTimer: any;
  entry: string;
  constructor(private playerService: PlayerService, private appService: AppService , private router: Router) {

    //TODO: remove the selected list of event from the event listeners , since we dont want them anymore HERE !

    console.log('gamearena constructor called');
    let reference = this;
    //1.
    this.playerService.socket.on('next-turn', function (obj) {
      reference.entry = "";
      if (obj.myturn) {
        alert('start typing bro');
        reference.disableInputBox = false;
        let message = 'It s your turn bro!';
        reference.appService.setHomeScreenMessage(message, "alert alert-info");
      }
      else {
        reference.disableInputBox = true;
        let message = 'It s ' + obj.playerName + ' s turn!';
        reference.appService.setHomeScreenMessage(message, "alert alert-success");
      }
    });

    //2.
    this.playerService.socket.on('other-player-key', function (obj) {
      reference.entry = reference.entry.concat(obj.key);
    });

    //3.
    this.playerService.socket.on('other-player-key-released', function (obj) {
      reference.disappearTimer = setTimeout(function () {
        reference.disappear = true;
      }, 2000);
    });

    //4.
    this.playerService.socket.on('other-player-key-pressed', function (obj) {
      reference.disappear = false;
      clearTimeout(reference.disappearTimer);
    });

    //5.
      this.playerService.socket.on('player-wrong-entry', function (obj) {
        reference.disableInputBox = true;
        reference.router.navigate(['']);
    });

  }

  ngOnInit() {
  }

  onKeyPressed(event) {
    this.disappear = false;
    clearTimeout(this.disappearTimer);
    console.log(event.key);
    this.playerService.socket.emit('player-key-pressed', { key: event.key });
  }

  onKeyReleased(event) {
    this.playerService.socket.emit('player-key-released', { key: event.key });
    this.disappearTimer = setTimeout(function () {
      this.disappear = true;
    }, 2000);

  }

}
