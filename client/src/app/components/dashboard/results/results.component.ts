import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../services/pollsServices/polls.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PollsSocketService } from '../../../services/sockets/polls-socket.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  pollsResults: any;

  constructor( private pollsService: PollsService, private authService: AuthService,
    private _flashMessagesService: FlashMessagesService, private router: Router, private pollsSocketService: PollsSocketService ) { }

  getPollsResults(): void {
    this.pollsService.getPollsResults()
      .subscribe((aggrigatedResponse) => {
        if ( aggrigatedResponse.success ) {
          this.pollsResults = aggrigatedResponse.results;
        }else {
          this._flashMessagesService.show('You Are Not Logged Yet..!!', {cssClass : 'alert-danger'});
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login view
          }, 1500);
        }
      }
      );
  }

  ngOnInit() {
    this.getPollsResults();
    this.pollsSocketService.getUpdateVoteSocketMessage().subscribe(serverResponse => {
      if ( serverResponse === 'success') {
         this.getPollsResults();
      }
    });
  }

}
