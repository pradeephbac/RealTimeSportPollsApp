import { Component, OnInit } from '@angular/core';
import {BarChartComponent} from '../charts/bar-chart/bar-chart.component';
import {PieChartComponent} from '../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
