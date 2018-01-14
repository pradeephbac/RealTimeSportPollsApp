import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }
  async getPolls(): Promise<any> {
    await this.authService.loadData().subscribe((eventResponse) => {
      console.log(eventResponse);
    });
  }
  ngOnInit() {
    this.getPolls();
    this.authService.sendMessage('Test Message From Home');
  }

}
