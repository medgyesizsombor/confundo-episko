import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { LanguageService } from 'src/app/services/language/language.service';
Chart.register(...registerables);

@Component({
  selector: 'app-average-score',
  templateUrl: './average-score.component.html',
  styleUrls: ['./average-score.component.scss'],
})
export class AverageScoreComponent implements OnInit, OnChanges {
  @Input() sumData: any;

  aData: any;

  averageScoreChart: Chart;
  loading = false;

  asd: any;

  language: string;

  bestScoreColourgame = 0;
  bestScoreGoNogogame = 0;
  bestScoreGame3 = 0;
  bestScoreGame4 = 0;
  bestScoreGame5 = 0;
  bestScoreGame6 = 0;
  bestScoreGame7 = 0;
  bestScoreGame8 = 0;

  data1: any;


  constructor(private dataOfUser: DataOfUserService, private platform: Platform,
    private translatePipe: TranslatePipe, private languageService: LanguageService) { }

  async ngOnInit() {
    this.data1 = {
      labels: [this.translatePipe.transform('GRAPH.attention'), this.translatePipe.transform('GRAPH.memory'),
      this.translatePipe.transform('GRAPH.mathematical')],
      datasets: [{
        label: this.translatePipe.transform('GRAPH.points'),
        data: [0, 0, 0],
        fill: false,
        borderColor: 'rgb(216, 83, 44)',
        tension: 0.1
      }]
    };

    this.loading = true;

    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.sumData && changes.sumData.currentValue) {
      setTimeout(() => {
        this.updateChart(changes.sumData.currentValue);
      }, 400);
    }
  }

  createChart(){
    setTimeout(() => {
     if (this.averageScoreChart === null || this.averageScoreChart === undefined) {
      this.averageScoreChart = new Chart('averageScoreChart', {
        type: 'line',
        data: this.data1,
        options:{
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      this.loading = false;
     }
    }, 250);
  }


  updateChart(data: any) {
    if (this.averageScoreChart === null || this.averageScoreChart === undefined) { return; };

    const averageAttention = data.colourgame.averageScore + data.goNogoGame.averageScore +
    data.fifthgame.averageScore + data.sixthgame.averageScore + data.eightgame.averageScore;
    const averageMemory = data.ninthgame.averageScore + data.tenthgame.averageScore;
    const averageMatematical = data.thirdgame.averageScore + data.fourthgame.averageScore +
    data.seventhgame.averageScore;

    this.data1.datasets[0].data[0] = averageAttention;
    this.data1.datasets[0].data[1] = averageMemory;
    this.data1.datasets[0].data[2] = averageMatematical;

    this.data1.labels[0] = this.translatePipe.transform('GRAPH.attention');
    this.data1.labels[1] = this.translatePipe.transform('GRAPH.memory');
    this.data1.labels[2] = this.translatePipe.transform('GRAPH.mathematical');
    this.data1.datasets[0].label = this.translatePipe.transform('GRAPH.points');

    this.averageScoreChart.data = this.data1;
    this.averageScoreChart.update();
  }
}
