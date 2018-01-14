import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class PollsService {

  LOCAL_DOMAIN = 'http://localhost:8080';
  token;
  authToken;
  options;

  constructor(
    private http: Http
  ) { }

// create autherization headers for header interception in back end
  createAuthHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'autherization': this.authToken
      })
    });


  }

  // load access token from users local storge
  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  // get all polls for initial charts
  getAllPolls() {
    return this.http.get(this.LOCAL_DOMAIN + '/events/allEvents').map(res => res.json());
  }

 // update polls vote from users
  updatePollsResult(pollVote, voteResult) {
    this.createAuthHeaders(); // define headers
    const voteItem = {
      event_id : pollVote._id,
      result: voteResult
    };
    return this.http.post(this.LOCAL_DOMAIN + '/vote/updateVoteResults', voteItem, this.options).map(res => res.json());
  }

  // get polls results with result grouping
  getPollsResults() {
    this.createAuthHeaders(); // define headers
    return this.http.get(this.LOCAL_DOMAIN + '/events/allEventResults', this.options).map(res => res.json());
  }

}
