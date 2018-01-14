import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../services/pollsServices/polls.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  pollsResults: any;

  constructor( private pollsService: PollsService, private authService: AuthService ) { }

  getPollsResults(): void {
    this.pollsService.getPollsResults()
      .subscribe((aggrigatedResponse) => {
        this.pollsResults = aggrigatedResponse.results;
      }
      );
  }

  ngOnInit() {
    this.getPollsResults();
  }

}
