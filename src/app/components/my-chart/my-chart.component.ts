import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.scss'],
})
export class MyChartComponent implements OnInit {

  myChart: Chart;

  asd1 = 25;
  asd2 = 29;
  asd3 = 20;

  constructor() { }

  ngOnInit() {
    this.myChart = new Chart('myChart', {
      type: 'radar',
      data: {
        labels: [
            'Math',
            'Focus',
            'ASD',
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [this.asd1, this.asd2, this.asd3],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }, {
            label: 'My Second Dataset',
            data: [28, 48, 40],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
    }
  });
  }

}
