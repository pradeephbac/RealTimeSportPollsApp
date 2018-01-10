import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class PollsService {

  LOCAL_DOMAIN = "http://localhost:8080"; 
  constructor(
    private http: Http
  ) { }

  getAllPolls() {
    return this.http.get(this.LOCAL_DOMAIN + '/events/allEvents').map(res => res.json());
  }

}
