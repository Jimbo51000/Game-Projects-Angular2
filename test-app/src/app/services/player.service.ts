import { Injectable } from '@angular/core';
import { Player } from '../modal/player';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
//TIPS : new subscribe from here
@Injectable()
export class PlayerService {
  socket: io.Socket;
  players: Player[] = [];
  constructor(private http: Http) {

  }

  initialisePlayerSocket(): void {
    if(!this.socket){
         this.socket = io('http://localhost:3000/');
    }
    //console.log(this.socket);
  }

  addNewPlayertoList(newPlayer: Player) :void{
    if (newPlayer) {
      this.players.push(newPlayer);
    }

  }

  //API call to get all the players
  getPlayers(): Observable<Player[]> {

    return this.http.get("http://localhost:3000/api/players/")
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


  //API put call to add players
  addPlayer(player: Player): Observable<any> {
    //what if when adding, the final slot has alreday been filled?
    this.players.push(player);

    //make a api put request to server
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    console.log('sending :' + JSON.stringify(player));
    return this.http
      .put("http://localhost:3000/api/players/", JSON.stringify(player), { headers: headers })
      .map((res: Response) => res.json());
    //   .subscribe(data => { success = data; console.log('sucess:'+JSON.stringify(data)); });
    //   console.log('sucess2:'+JSON.stringify(success));
    // return success;
    //TODO:generate the id from server after adding
  }

  //Just a test request to server
  init() {
    this.http.get("http://localhost:3000/")
      .subscribe(res => {
        if (res.status == 200) {
          console.log("init OK");
        }
      });
  }

}
