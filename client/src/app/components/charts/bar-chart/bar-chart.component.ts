import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../services/pollsServices/polls.service';
import * as _ from 'underscore';

declare var jQuery: any;
@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    polls: any = [{ events: [] }];
    sportGroup: any;
    constructor(private pollsService: PollsService) { }

    async getPolls(): Promise<any> {
        await this.pollsService.getAllPolls().subscribe((polls) => {
            this.polls = polls;
            this.sportGroup = _.countBy(this.polls.events, 'sport');

            this.renderChart(this.sportGroup);
        });

    }

    ngOnInit() {
        this.getPolls();
    }
    renderChart(eventsBySport) {
        const sportsCountArray = [];
        const sportsArray = [];
        for (const key in eventsBySport) {
            if (eventsBySport.hasOwnProperty(key)) {
                sportsArray.push(key);
                sportsCountArray.push(eventsBySport[key]);
            }
        }
        jQuery('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Poll Events by Sports'
            },
            xAxis: {
                categories: sportsArray,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'polls'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} polls</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Poll Events',
                data: sportsCountArray

            }]
        });
    }
}
