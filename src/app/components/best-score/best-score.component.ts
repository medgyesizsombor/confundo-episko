import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { Chart, registerables } from 'chart.js';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
Chart.register(...registerables);

@Component({
  selector: 'app-best-score',
  templateUrl: './best-score.component.html',
  styleUrls: ['./best-score.component.scss'],
})
export class BestScoreComponent implements OnInit, OnChanges {
  @Input() sumData: any;

  bestScoreChart: Chart;
  loading = false;

  asd: any;

  bestScoreColourgame = 0;
  bestScoreGoNogogame = 0;
  bestScoreGame3 = 0;
  bestScoreGame4 = 0;
  bestScoreGame5 = 0;
  bestScoreGame6 = 0;
  bestScoreGame7 = 0;
  bestScoreGame8 = 0;

  data: any;

  constructor(private dataOfUser: DataOfUserService, private platform: Platform,
    private translatePipe: TranslatePipe) { }

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
      datasets: [{
        label: 'My First Dataset',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        hoverOffset: 4
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
      this.bestScoreChart = new Chart('bestScoreChart', {
        type: 'doughnut',
        data: this.data,
      });

      this.loading = false;
    }, 250);
  }

  updateChart(data: any){
    this.data.datasets[0].data[0] = data.colourgame.bestScore;
    this.data.datasets[0].data[1] = data.goNogoGame.bestScore;
    this.data.datasets[0].data[2] = data.thirdgame.bestScore;
    this.data.datasets[0].data[3] = data.fourthgame.bestScore;
    this.data.datasets[0].data[4] = data.fifthgame.bestScore;
    this.data.datasets[0].data[5] = data.sixthgame.bestScore;
    this.data.datasets[0].data[6] = data.seventhgame.bestScore;
    this.data.datasets[0].data[7] = data.eightgame.bestScore;
    this.data.datasets[0].data[8] = data.ninthgame.bestScore;
    this.data.datasets[0].data[9] = data.tenthgame.bestScore;

    this.bestScoreChart.data = this.data;
    this.bestScoreChart.update();
  }

}
