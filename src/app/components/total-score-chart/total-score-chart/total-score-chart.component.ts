import { toTypeScript } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-total-score-chart',
  templateUrl: './total-score-chart.component.html',
  styleUrls: ['./total-score-chart.component.scss'],
})
export class TotalScoreChartComponent implements OnInit {
  loading = false;
  totalScoreChart: Chart;

  scoreColourgame = 0;
  scoreGoNogogame = 0;
  scoreGame3 = 0;
  scoreGame4 = 0;
  scoreGame5 = 0;
  scoreGame6 = 0;
  scoreGame7 = 0;
  scoreGame8 = 0;

  data= {
      labels: [
        'Colour game',
        'Go-Nogogame',
        'Game3',
        'Game4',
        'Game5',
        'Game6',
        'Game7',
        'Game8'
      ],
      datasets: [{
        label: 'Total points scored in this game',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };



  constructor(private dataOfUser: DataOfUserService) { }

  async ngOnInit() {
    this.loading = true;
    console.log('adsdsda');
    await this.getTotalScorePerGame();
    await this.drawChart();
    console.log('asdasd');
  }

  async asdasd(){
    console.log('adsdsda');
    await this.getTotalScorePerGame();
    await this.drawChart();
    console.log('asdasd');
  }

  async drawChart(){
    console.log('asd');
    setTimeout(() => {
      this.totalScoreChart = new Chart('totalScoreChart', {
        type: 'radar',
        data: this.data,
        options: {
          elements: {
            line: {
              borderWidth: 3
            }
          }
        }
      });
      this.updateChart();
      this.loading = false;
    }, 250);
  }

  updateChart(){
    this.data.datasets[0].data[0] = this.scoreColourgame;
    this.data.datasets[0].data[1] = this.scoreGoNogogame;
    this.data.datasets[0].data[2] = this.scoreGame3;
    this.data.datasets[0].data[3] = this.scoreGame4;
    this.data.datasets[0].data[4] = this.scoreGame5;
    this.data.datasets[0].data[5] = this.scoreGame6;
    this.data.datasets[0].data[6] = this.scoreGame7;
    this.data.datasets[0].data[7] = this.scoreGame8;
    this.totalScoreChart.data = this.data;
    this.totalScoreChart.update();
  }

  async getTotalScorePerGame(){
    await this.getDataOfGameColour();
    await this.getDataOfGameGoNogo();
    await this.getDataOfGameGame3();
    await this.getDataOfGameGame4();
    await this.getDataOfGameGame5();
    await this.getDataOfGameGame6();
    await this.getDataOfGameGame7();
    await this.getDataOfGameGame8();
  }

  async getDataOfGameColour(){
    await this.dataOfUser.getDataOfGameColour('colourgame').then(() => {
      this.scoreColourgame = Number(localStorage.getItem('totalScoreColourgame'));
      console.log(this.scoreColourgame + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGoNogo(){
    await this.dataOfUser.getDataOfGameGoNogo('go-nogogame').then(() => {
      this.scoreGoNogogame = Number(localStorage.getItem('totalScoreGoNogo'));
      console.log(this.scoreGoNogogame + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame3(){
    await this.dataOfUser.getDataOfGameGame3('thirdgame').then(() => {
      this.scoreGame3 = Number(localStorage.getItem('totalScoreGame3'));
      console.log(this.scoreGame3 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame4(){
    await this.dataOfUser.getDataOfGameGame4('fourthgame').then(() => {
      this.scoreGame4 = Number(localStorage.getItem('totalScoreGame4'));
      console.log(this.scoreGame4 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame5(){
    await this.dataOfUser.getDataOfGameGame5('fifthgame').then(() => {
      this.scoreGame5 = Number(localStorage.getItem('totalScoreGame5'));
      console.log(this.scoreGame5 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame6(){
    await this.dataOfUser.getDataOfGameGame6('sixthgame').then(() => {
      this.scoreGame6 = Number(localStorage.getItem('totalScoreGame6'));
      console.log(this.scoreGame6 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame7(){
    await this.dataOfUser.getDataOfGameGame7('seventhgame').then(() => {
      this.scoreGame7 = Number(localStorage.getItem('totalScoreGame7'));
      console.log(this.scoreGame7 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame8(){
    await this.dataOfUser.getDataOfGameGame8('eightgame').then(() => {
      this.scoreGame8 = Number(localStorage.getItem('totalScoreGame8'));
      console.log(this.scoreGame8 + 'HAHAHAHAHAHA SIKER?');
    });
  }
}
