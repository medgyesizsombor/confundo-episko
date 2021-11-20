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

  labels = ['1', '2', '3', '4', '5', '6', '7'];

  data = {
    labels: this.labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  constructor(private dataOfUser: DataOfUserService, private platform: Platform) { }

  async ngOnInit() {
    this.loading = true;
    this.getDatas();
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
          type: 'line',
          data: this.data,
      });

      this.loading = false;
    }, 250);
  }

  updateChart(data: any){
    this.data.datasets[0].data[0] = this.sumData.colourgame.bestScore;
    this.data.datasets[0].data[1] = data.goNogoGame.bestScore;
    this.data.datasets[0].data[2] = data.thirdgame.bestScore;
    this.data.datasets[0].data[3] = data.fourthgame.bestScore;
    this.data.datasets[0].data[4] = data.fifthgame.bestScore;
    this.data.datasets[0].data[5] = data.sixthgame.bestScore;
    this.data.datasets[0].data[6] = data.seventhgame.bestScore;
    this.data.datasets[0].data[7] = data.eightgame.bestScore;
    this.bestScoreChart.data = this.data;
    this.bestScoreChart.update();
  }

  async getDatas(){
    await this.dataOfUser.getAllDatas().then(res => {
      this.sumData = res;
    });

    console.log('ASDASD');

    }

}
