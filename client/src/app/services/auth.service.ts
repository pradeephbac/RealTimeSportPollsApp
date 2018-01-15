import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  LOCAL_DOMAIN = environment.LOCAL_DOMAIN;
  token;
  authToken;
  options;
  user;

  constructor(private http: Http) {
  }

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
