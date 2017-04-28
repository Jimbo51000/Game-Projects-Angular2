import { Injectable } from '@angular/core';
import { Player } from '../modal/player';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class PlayerService {
  players: Player[];
  constructor(private http:Http) { 
    
  }

  getPlayers(): Observable<Player[]> {
    
     return this.http.get("http://localhost:3000/api/players/")
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  getPlayers2(): void{
    
      this.http.get("http://localhost:3000/api/players/")
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
                         .subscribe(data=>{this.players = data;return this.players;});



  }

  addPlayer(player: Player): void {
    //what if when adding, the final slot has alreday been filled?
    this.players.push(player);

    //TODO:generate the id from server after adding
  }
}
