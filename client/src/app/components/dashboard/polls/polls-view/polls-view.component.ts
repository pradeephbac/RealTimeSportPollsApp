import { Component, OnInit } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FormsModule } from '@angular/forms'; 
import {PollsService} from '../../../../services/pollsServices/polls.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-polls-view',
  templateUrl: './polls-view.component.html',
  styleUrls: ['./polls-view.component.scss']
})
export class PollsViewComponent implements OnInit {
  polls: any = [{events: []}];
  sportFilter: any = { sport : ''};
  remainpolls: any = [{events: []}];

  constructor( private pollsService: PollsService, private authService: AuthService) {
   }

  
  

   getPolls(): void {
    this.pollsService.getAllPolls()
        .subscribe(polls => this.polls = polls);
  }

  getRemainPolls(): void {
    this.authService.getUserRemainEvents()
        .subscribe(events => this.remainpolls = events);
  }


  vote(poll, option){ 
    if(option === 'AWAY') {
      console.log(poll);
    } else if(option === 'HOME'){
    }
    else{
    }
  }



  ngOnInit() {
    this.getPolls(); 
    //this.getRemainPolls();
  }

}
