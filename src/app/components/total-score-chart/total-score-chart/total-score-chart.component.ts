import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-total-score-chart',
  templateUrl: './total-score-chart.component.html',
  styleUrls: ['./total-score-chart.component.scss'],
})
export class TotalScoreChartComponent implements OnInit, OnChanges {
  @Input() sumData: any;

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

  labels = [
    'Colour game',
    'Go-NogoGame',
    'Game3',
    'Game4',
    'Game5',
    'Game6',
    'Game7',
    'Game8',
    'Game9',
    'Game10'
  ];

  data: any;

  constructor(
    private dataOfUser: DataOfUserService,
    private platform: Platform,
    private translatePipe: TranslatePipe
  ) {}

  async ngOnInit() {
    this.data = {
      labels: [
        this.translatePipe.transform('GRAPH.colourgame'),
        this.translatePipe.transform('GRAPH.goNogoGame'),
        this.translatePipe.transform('GRAPH.sortingGame'),
        this.translatePipe.transform('GRAPH.equations'),
        this.translatePipe.transform('GRAPH.numsAndLetters'),
        this.translatePipe.transform('GRAPH.numsAndLetters2'),
        this.translatePipe.transform('GRAPH.computing'),
        this.translatePipe.transform('GRAPH.directions'),
        this.translatePipe.transform('GRAPH.memoryCard'),
        this.translatePipe.transform('GRAPH.memoryGrid')
      ],
      datasets: [
        {
          label: 'My First Dataset',
          data: [1, 1, 1],
          backgroundColor: [
            'rgb(250, 123, 179)',
            'rgb(164, 210, 140)',
            'rgb(216, 83, 44)',
            'rgb(67, 182, 173)',
            'rgb(92, 167, 29)',
            'rgb(159, 14, 212)',
            'rgb(85, 67, 204)',
            'rgb(41, 181, 27)',
            'rgb(86, 48, 0)',
            'rgb(2, 76, 3)',
          ],
          hoverOffset: 4,
        },
      ],
    };
    this.loading = true;
    await this.getTotalScorePerGame();
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.sumData && changes.sumData.currentValue) {
      setTimeout(() => {
        this.updateNew(changes.sumData.currentValue);
      }, 400);
    }
  }

  createChart() {
    setTimeout(() => {
      this.totalScoreChart = new Chart('totalScoreChart', {
        type: 'pie',
        data: this.data,
      });

      this.loading = false;
    }, 250);
  }

  updateChart() {
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

  updateNew(data: any) {
    this.data.datasets[0].data[0] = data.colourgame.sumScore;
    this.data.datasets[0].data[1] = data.goNogoGame.sumScore;
    this.data.datasets[0].data[2] = data.thirdgame.sumScore;
    this.data.datasets[0].data[3] = data.fourthgame.sumScore;
    this.data.datasets[0].data[4] = data.fifthgame.sumScore;
    this.data.datasets[0].data[5] = data.sixthgame.sumScore;
    this.data.datasets[0].data[6] = data.seventhgame.sumScore;
    this.data.datasets[0].data[7] = data.eightgame.sumScore;

    this.totalScoreChart.data = this.data;
    this.totalScoreChart.update();
  }

  async getTotalScorePerGame() {
    await this.getDataOfGameColour();
    await this.getDataOfGameGoNogo();
    await this.getDataOfGameGame3();
    await this.getDataOfGameGame4();
    await this.getDataOfGameGame5();
    await this.getDataOfGameGame6();
    await this.getDataOfGameGame7();
    await this.getDataOfGameGame8();
  }

  async getDataOfGameColour() {
    await this.dataOfUser.getDataOfGameColour('colourgame').then(() => {
      this.scoreColourgame = Number(
        localStorage.getItem('totalScoreColourgame')
      );
    });
  }

  async getDataOfGameGoNogo() {
    await this.dataOfUser.getDataOfGameGoNogo('goNogoGame').then(() => {
      this.scoreGoNogogame = Number(localStorage.getItem('totalScoreGoNogo'));
    });
  }

  async getDataOfGameGame3() {
    await this.dataOfUser.getDataOfGameGame3('thirdgame').then(() => {
      this.scoreGame3 = Number(localStorage.getItem('totalScoreGame3'));
    });
  }

  async getDataOfGameGame4() {
    await this.dataOfUser.getDataOfGameGame4('fourthgame').then(() => {
      this.scoreGame4 = Number(localStorage.getItem('totalScoreGame4'));
    });
  }

  async getDataOfGameGame5() {
    await this.dataOfUser.getDataOfGameGame5('fifthgame').then(() => {
      this.scoreGame5 = Number(localStorage.getItem('totalScoreGame5'));
    });
  }

  async getDataOfGameGame6() {
    await this.dataOfUser.getDataOfGameGame6('sixthgame').then(() => {
      this.scoreGame6 = Number(localStorage.getItem('totalScoreGame6'));
    });
  }

  async getDataOfGameGame7() {
    await this.dataOfUser.getDataOfGameGame7('seventhgame').then(() => {
      this.scoreGame7 = Number(localStorage.getItem('totalScoreGame7'));
    });
  }

  async getDataOfGameGame8() {
    await this.dataOfUser.getDataOfGameGame8('eightgame').then(() => {
      this.scoreGame8 = Number(localStorage.getItem('totalScoreGame8'));
    });
  }
}
