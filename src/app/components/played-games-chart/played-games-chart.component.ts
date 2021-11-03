import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-played-games-chart',
  templateUrl: './played-games-chart.component.html',
  styleUrls: ['./played-games-chart.component.scss'],
})
export class PlayedGamesChartComponent implements OnInit {

  myChart: Chart;

  playedMath = 0;
  playedMath2 = 0;
  playedMath3 = 0;
  playedMathFinal = 10;
  playedFocus1 = 0;
  playedFocus2 = 0;
  playedFocus3 = 0;
  playedFocusFinal = 0;
  playedAttention1 = 0;
  playedAttention2 = 0;
  playedAttentionFinal = 0;

  data = {
    labels: [
      'Math',
      'Focus',
      'Speed'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [this.playedMathFinal, 300, 300],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  constructor(private dataOfUser: DataOfUserService) { }

  async ngOnInit() {
    await this.getPlayedGameCategory();
    await this.drawChart();
    this.data.datasets[0].data[0] = this.playedMathFinal;
    this.data.datasets[0].data[1] = this.playedFocusFinal;
    this.data.datasets[0].data[2] = this.playedAttentionFinal;
    this.myChart.update();
  }

  async drawChart(){
    console.log('asd');
    setTimeout(() => {
      this.myChart = new Chart('playedGameChart', {
        type: 'doughnut',
        data: this.data,
      });
    }, 250);
  }

  async getPlayedGameCategory(){
    await this.getPlayedGameColour();
    await this.getPlayedGameGoNogo();
    await this.getPlayedGameGame3();
    await this.getPlayedGameGame4();
    await this.getPlayedGameGame5();
    await this.getPlayedGameGame6();
    await this.getPlayedGameGame7();
    this.playedMathFinal = this.playedMath + this.playedMath2 + this.playedMath3;
    this.playedFocusFinal = this.playedFocus1 + this.playedFocus2 + this.playedFocus3;
    this.playedAttentionFinal = this.playedAttention1 + this.playedAttention2;
    console.log(this.playedMathFinal);
    console.log(this.playedFocusFinal);
    console.log(this.playedAttentionFinal);
  }

  async getPlayedGameColour(){
    await this.dataOfUser.getPlayedGameColour('colourgame').then(() => {
      this.playedMath = Number(localStorage.getItem('playedGamesColour'));
      console.log(this.playedMath + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getPlayedGameGoNogo(){
    await this.dataOfUser.getPlayedGameGoNogo('go-nogogame').then(() => {
      this.playedMath2 = Number(localStorage.getItem('playedGamesGoNogo'));
      console.log(this.playedMath2 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getPlayedGameGame3(){
    await this.dataOfUser.getPlayedGameGame3('thirdgame').then(() => {
      this.playedMath3 = Number(localStorage.getItem('playedGamesGame3'));
      console.log(this.playedMath3 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getPlayedGameGame4(){
    await this.dataOfUser.getPlayedGameGame4('fourthgame').then(() => {
      this.playedFocus1 = Number(localStorage.getItem('playedGamesGame4'));
      console.log(this.playedFocus1 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getPlayedGameGame5(){
    await this.dataOfUser.getPlayedGameGame5('fifthgame').then(() => {
      this.playedFocus2 = Number(localStorage.getItem('playedGamesGame5'));
      console.log(this.playedFocus2 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getPlayedGameGame6(){
    await this.dataOfUser.getPlayedGameGame6('sixthgame').then(() => {
      this.playedAttention1 = Number(localStorage.getItem('playedGamesGame6'));
      console.log(this.playedAttention1 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getPlayedGameGame7(){
    await this.dataOfUser.getPlayedGameGame7('seventhgame').then(() => {
      this.playedAttention2 = Number(localStorage.getItem('playedGamesGame7'));
      console.log(this.playedAttention2 + 'HAHAHAHAHAHA SIKER?');
    });
  }
}
