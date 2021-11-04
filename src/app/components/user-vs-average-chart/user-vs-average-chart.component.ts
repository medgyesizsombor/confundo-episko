import { Component, OnInit } from '@angular/core';
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

  data = {
    labels: ['Points'],
    datasets: [{
      label: 'User',
      data: [65],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    }, {
      label: 'Average',
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

  constructor() { }

  ngOnInit() {
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

  updateChartData(){
    this.data.datasets[0].data[0] = this.result;
    this.data.datasets[1].data[0] = this.averagePoint;
    this.userVsAverage.update();
  }

}
