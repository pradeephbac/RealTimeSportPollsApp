import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { Socket } from 'ng-socket-io';
@Injectable()
export class AuthService {

  LOCAL_DOMAIN = 'http://localhost:8080';
  token;
  authToken;
  options;
  user;
  //private url = 'http://localhost:8080';
  //private socket: SocketIOClient.Socket;
  // , private socket: Socket
  constructor(private http: Http, private socket: Socket) {

    //this.socket = io();
  }
  sendMessage(msg: string){
    console.log("emmit message")
    this.socket.emit("message", msg);
}

/*sendMessage(msg: string) {
  console.log("Emit from front end");
    this.socket.emit('message', msg);
}*/

/*getMessages() {
  let observable = new Observable(observer => {
    this.socket = io(this.url);
    this.socket.on('message', (data) => {
      console.log("Recived to front end");
      console.log(data)
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    };
  })
  return observable;
}*/

  registerNewUser(user) {
    return this.http.post(this.LOCAL_DOMAIN + '/authentication/register', user).map(res => res.json());
  }

  userLogin(user) {
    return this.http.post(this.LOCAL_DOMAIN + '/authentication/login', user).map(res => res.json());
  }

  loadData() {// load data from External JSON
    return this.http.get(this.LOCAL_DOMAIN + '/events/readEvents').map(res => res.json());
  }

  userLogOut() {
    this.token = null;
    this.user = null;
    localStorage.clear();

  }

  createAuthHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'autherization': this.authToken
      })
    });


  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  storeuserInFrontEnd(token, user) { 
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  getUserRemainEvents() {
    this.createAuthHeaders();
    return this.http.get(this.LOCAL_DOMAIN + '/events/allRemainEventsForUser', this.options).map(res => res.json());
  }

  isUserLoggedIn() {
    return tokenNotExpired();
  }

}
