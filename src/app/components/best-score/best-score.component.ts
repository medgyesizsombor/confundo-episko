import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { Chart, registerables } from 'chart.js';
import { Platform } from '@ionic/angular';
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

  data = {
    labels: this.labels,
    datasets: [{
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
      hoverOffset: 4
    }]
  };

  constructor(private dataOfUser: DataOfUserService, private platform: Platform) { }

  async ngOnInit() {
    this.loading = true;
    await this.getDatas();
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
    this.data.datasets[0].data[0] = this.sumData.colourgame.bestScore;
    this.data.datasets[0].data[1] = this.sumData.goNogoGame.bestScore;
    this.data.datasets[0].data[2] = this.sumData.thirdgame.bestScore;
    this.data.datasets[0].data[3] = this.sumData.fourthgame.bestScore;
    this.data.datasets[0].data[4] = this.sumData.fifthgame.bestScore;
    this.data.datasets[0].data[5] = this.sumData.sixthgame.bestScore;
    this.data.datasets[0].data[6] = this.sumData.seventhgame.bestScore;
    this.data.datasets[0].data[7] = this.sumData.eightgame.bestScore;
    this.data.datasets[0].data[8] = this.sumData.ninthgame.bestScore;
    this.data.datasets[0].data[9] = this.sumData.tenthgame.bestScore;
    //this.bestScoreChart.data = this.data;
    //this.bestScoreChart.update();
  }

  async getDatas(){
    await this.dataOfUser.getAllDatas().then(res => {
      this.sumData = res;
    });

    console.log('ASDASD');

    }

}
