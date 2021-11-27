import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-user-vs-average-chart',
  templateUrl: './user-vs-average-chart.component.html',
  styleUrls: ['./user-vs-average-chart.component.scss'],
})
export class UserVsAverageChartComponent implements OnInit {

  userVsAverage: Chart;

  result: number;
  averagePoint: number;

  data: any;

  constructor(private translatePipe: TranslatePipe) { }

  ngOnInit() {
    this.data = {
      labels: [this.translatePipe.transform('GRAPH.points')],
      datasets: [{
        label: this.translatePipe.transform('GRAPH.user'),
        data: [65],
        backgroundColor: [
          'rgba(216, 83, 44, 0.5)'
        ],
        borderColor: [
          'rgb(216, 83, 44)'
        ],
        borderWidth: 1
      }, {
        label: this.translatePipe.transform('GRAPH.average'),
        data: [80],
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgb(255, 159, 64)'
        ],
        borderWidth: 1
      }]
    };
    this.userAndAverageResult();
    this.createChart();
    this.updateChartData();
  }

  userAndAverageResult(){
      this.result = Number(localStorage.getItem('result'));
      this.averagePoint = Number(localStorage.getItem('averageScore'));
  }

  createChart(){
    this.userVsAverage = new Chart('userVsAverage', {
      type: 'bar',
      data: this.data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  ionViewDidLeave() {
    this.userVsAverage = null;
  }

  updateChartData(){
    this.data.datasets[0].data[0] = this.result;
    this.data.datasets[1].data[0] = this.averagePoint;
    this.userVsAverage.update();
  }

}
