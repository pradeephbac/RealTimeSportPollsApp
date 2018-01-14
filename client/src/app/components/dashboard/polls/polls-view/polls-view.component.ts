import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FormsModule } from '@angular/forms';
import { PollsService } from '../../../../services/pollsServices/polls.service';
import { AuthService } from '../../../../services/auth.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-polls-view',
  templateUrl: './polls-view.component.html',
  styleUrls: ['./polls-view.component.scss']
})
export class PollsViewComponent implements OnInit {
  polls: any = [{ events: [] }];
  sportFilter: any = { sport: '' };
  remainpolls: any = [{ events: [] }];
  message: any;
  constructor(private pollsService: PollsService, private authService: AuthService) {
  }

  getRemainPolls(): void {
    this.authService.getUserRemainEvents()
      .subscribe((events) => {
        this.polls = this.generateFiltereVotes(events);
      }
      );
  }

  generateFiltereVotes(eventArray) {
    _.each(eventArray.events, function (event) {
      _.each(event.votes, function (vote) {
        if (vote.user_id === JSON.parse(localStorage.getItem('user')).id) {
          event.alreadyVoted = true;
        }
      });
      event.voteCount = event.votes.length;
    });
    return eventArray;
  }

  updateVoteForEvent(updatedPoll, voteResult): void {
    this.pollsService.updatePollsResult(updatedPoll, voteResult).subscribe((message) => {
      this.message = message;
    });
  }

  voteForEvent(poll, option) {
    const voteResult = {
      user_id: '',
      result: ''
    };
    voteResult.user_id = JSON.parse(localStorage.getItem('user')).id;
    if (option === 'AWAY') {
      voteResult.result = 'AWAY';
    } else if (option === 'HOME') {
      voteResult.result = 'HOME';
    } else {
      voteResult.result = 'DRAW';
    }
    poll.alreadyVoted = true;
    this.updateVoteForEvent(poll, voteResult);

    this.getRemainPolls();
  }

  ngOnInit() {
    this.getRemainPolls();
  }

}
