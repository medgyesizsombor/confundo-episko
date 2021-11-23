import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
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

  language = localStorage.getItem('language');

  bestScoreColourgame = 0;
  bestScoreGoNogogame = 0;
  bestScoreGame3 = 0;
  bestScoreGame4 = 0;
  bestScoreGame5 = 0;
  bestScoreGame6 = 0;
  bestScoreGame7 = 0;
  bestScoreGame8 = 0;

  data1;


  constructor(private dataOfUser: DataOfUserService, private platform: Platform,
    private translatePipe: TranslatePipe) { }

  async ngOnInit() {
    this.data1 = {
      labels: [this.translatePipe.transform('GRAPH.attention'), this.translatePipe.transform('GRAPH.memory'),
      this.translatePipe.transform('GRAPH.mathematical')],
      datasets: [{
        label: 'My First Dataset',
        data: [0, 0, 0],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.loading = true;
    await this.getDatas();
    this.createChart();
  }

  ionViewWillEnter(){

    this.averageScoreChart.update();
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
          data: this.data1,
      });

      this.loading = false;
    }, 250);
  }


  updateChart(data: any){
    const averageAttention = this.aData.colourgame.averageScore + this.aData.goNogoGame.averageScore +
    this.aData.fifthgame.averageScore + this.aData.sixthgame.averageScore;
    const averageMemory = this.aData.ninthgame.averageScore + this.aData.tenthgame.averageScore;
    const averageMatematical = this.aData.thirdgame.averageScore + this.aData.fourthgame.averageScore +
    this.aData.seventhgame.averageScore;

    /*if(this.language === 'hu'){
      this.data1.labels[0] = 'Figyelem';
      this.data1.labels[1] = 'Memória';
      this.data1.labels[2] = 'Matematikai';
    } else {
      this.data1.labels[0] = 'Focus';
      this.data1.labels[1] = 'Memory';
      this.data1.labels[2] = 'Matematical';
    }*/

    this.data1.datasets[0].data[0] = averageAttention;
    this.data1.datasets[0].data[1] = averageMemory;
    this.data1.datasets[0].data[2] = averageMatematical;

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
