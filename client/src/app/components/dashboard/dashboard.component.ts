import { Component, OnInit } from '@angular/core';
import {PollsViewComponent} from './polls/polls-view/polls-view.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
