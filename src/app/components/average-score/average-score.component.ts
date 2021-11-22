import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
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

  bestScoreColourgame = 0;
  bestScoreGoNogogame = 0;
  bestScoreGame3 = 0;
  bestScoreGame4 = 0;
  bestScoreGame5 = 0;
  bestScoreGame6 = 0;
  bestScoreGame7 = 0;
  bestScoreGame8 = 0;

  labels = ['Attention', 'Math', 'Speed'];

  data = {
    labels: this.labels,
    datasets: [{
      label: 'My First Dataset',
      data: [0, 0, 0],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
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
      this.averageScoreChart = new Chart('averageScoreChart', {
          type: 'line',
          data: this.data,
      });

      this.loading = false;
    }, 250);
  }

  updateChart(data: any){
    const averageFocus = 3;
    const averageSpeed= 4;
    const averageAttention = 5;

    this.data.datasets[0].data[0] = averageAttention;
    this.data.datasets[0].data[1] = this.aData.goNogoGame.averageScore;
    this.data.datasets[0].data[2] = this.aData.thirdgame.averageScore;

    //this.bestScoreChart.data = this.data;
    //this.bestScoreChart.update();
  }

  async getDatas(){
    await this.dataOfUser.getAllDatas().then(res => {
      this.aData = res;
    });

    console.log('ASDASD');

    }

}
