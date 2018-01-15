import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import { Subject } from 'rxjs/Subject';
// import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';

@Injectable()
export class PollsSocketService {

  constructor(private http: Http, private socket: Socket) { }

  updateVoteSocketMessage() {
    console.log('update-vote emit message from client side browser');
    this.socket.emit('update-vote', '');
  }
  getUpdateVoteSocketMessage() {
    const observable = new Observable(observer => {
      this.socket.on('update-vote', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


}
