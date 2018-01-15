import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../services/pollsServices/polls.service';

import * as _ from 'underscore';
declare var jQuery: any;
@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
    polls: any = [{ events: [] }];
    eventsByProvince: any;
    constructor(
        private pollsService: PollsService
    ) { }

    async getPolls(): Promise<any> {
        await this.pollsService.getAllPolls().subscribe((polls) => {
            this.polls = polls;
            this.eventsByProvince = _.countBy(this.polls.events, 'province');

            this.renderChart(this.eventsByProvince);
        });
    }
    ngOnInit() {
        this.getPolls();

    }
    renderChart(provinceGroupData) {
        const provinceEventCountArray = [];
        for (const key in provinceGroupData) {
            if (provinceGroupData.hasOwnProperty(key)) {
                const sport = {
                    name: '',
                    y: 0
                };
                sport.name = key;
                sport.y = provinceGroupData[key];
                provinceEventCountArray.push(sport);
            }
        }
        jQuery('#container-pie').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Poll events by Province'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {}
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Polls from Province',
                colorByPoint: true,
                data: provinceEventCountArray
            }]
        });
    }
}
