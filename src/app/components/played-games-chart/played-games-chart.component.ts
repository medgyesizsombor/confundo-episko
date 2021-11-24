import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-played-games-chart',
  templateUrl: './played-games-chart.component.html',
  styleUrls: ['./played-games-chart.component.scss'],
})
export class PlayedGamesChartComponent implements OnInit {

  playedGameChart: Chart;

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
  loading: boolean;

  data: any;

  constructor(private dataOfUser: DataOfUserService, private translatePipe: TranslatePipe) { }

  async ngOnInit() {
    this.data = {
      labels: [this.translatePipe.transform('GRAPH.attention'), this.translatePipe.transform('GRAPH.memory'),
      this.translatePipe.transform('GRAPH.mathematical')],
      datasets: [{
        label: this.translatePipe.transform('GRAPH.attention'),
        data: [1, 1, 1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    this.loading = true;
    await this.getPlayedGameCategory();
    await this.drawChart();
    this.updateChart();
  }

  async drawChart(){
    setTimeout(() => {
      this.playedGameChart = new Chart('playedGameChart', {
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
      this.loading = false;
    }, 250);
  }

  updateChart(){
    this.data.datasets[0].data[0] = this.playedMathFinal;
    this.data.datasets[0].data[1] = this.playedFocusFinal;
    this.data.datasets[0].data[2] = this.playedAttentionFinal;
  }

  async getPlayedGameCategory(){
    await this.getDataOfGameColour();
    await this.getDataOfGameGoNogo();
    await this.getDataOfGameGame3();
    await this.getDataOfGameGame4();
    await this.getDataOfGameGame5();
    await this.getDataOfGameGame6();
    await this.getDataOfGameGame7();
    await this.getDataOfGameGame8();
    this.playedMathFinal = this.playedMath + this.playedMath2 + this.playedMath3;
    this.playedFocusFinal = this.playedFocus1 + this.playedFocus2 + this.playedFocus3;
    this.playedAttentionFinal = this.playedAttention1 + this.playedAttention2;
    ////console.log(this.playedMathFinal);
    ////console.log(this.playedFocusFinal);
    ////console.log(this.playedAttentionFinal);
  }

  async getDataOfGameColour(){
    await this.dataOfUser.getDataOfGameColour('colourgame').then(() => {
      this.playedMath = Number(localStorage.getItem('playedGamesColourgame'));
      //console.log(this.playedMath + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGoNogo(){
    await this.dataOfUser.getDataOfGameGoNogo('goNogoGame').then(() => {
      this.playedMath2 = Number(localStorage.getItem('playedGamesGoNogo'));
      //console.log(this.playedMath2 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame3(){
    await this.dataOfUser.getDataOfGameGame3('thirdgame').then(() => {
      this.playedMath3 = Number(localStorage.getItem('playedGamesGame3'));
      //console.log(this.playedMath3 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame4(){
    await this.dataOfUser.getDataOfGameGame4('fourthgame').then(() => {
      this.playedFocus1 = Number(localStorage.getItem('playedGamesGame4'));
      //console.log(this.playedFocus1 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame5(){
    await this.dataOfUser.getDataOfGameGame5('fifthgame').then(() => {
      this.playedFocus2 = Number(localStorage.getItem('playedGamesGame5'));
      //console.log(this.playedFocus2 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame6(){
    await this.dataOfUser.getDataOfGameGame6('sixthgame').then(() => {
      this.playedAttention1 = Number(localStorage.getItem('playedGamesGame6'));
      //console.log(this.playedAttention1 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame7(){
    await this.dataOfUser.getDataOfGameGame7('seventhgame').then(() => {
      this.playedAttention2 = Number(localStorage.getItem('playedGamesGame7'));
      //console.log(this.playedAttention2 + 'HAHAHAHAHAHA SIKER?');
    });
  }

  async getDataOfGameGame8(){
    await this.dataOfUser.getDataOfGameGame8('eightgame').then(() => {
      this.playedFocus3 = Number(localStorage.getItem('playedGamesGame8'));
      //console.log(this.playedAttention2 + 'HAHAHAHAHAHA SIKER?');
    });
  }
}
