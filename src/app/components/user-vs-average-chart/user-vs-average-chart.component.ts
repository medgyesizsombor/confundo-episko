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
    labels: ['User', 'Average'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 89],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
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
    this.data.datasets[0].data[1] = this.averagePoint;
    this.userVsAverage.update();
  }

}
