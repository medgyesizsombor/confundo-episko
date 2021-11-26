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
          hoverOffset: 4,
        },
      ],
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

  createChart() {
    setTimeout(() => {
      this.totalScoreChart = new Chart('totalScoreChart', {
        type: 'pie',
        data: this.data,
        options:{
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      this.loading = false;
    }, 250);
  }

  updateChart(data: any) {
    if (this.totalScoreChart === null || this.totalScoreChart === undefined) { return; };

    this.data.datasets[0].data[0] = data.colourgame.sumScore;
    this.data.datasets[0].data[1] = data.goNogoGame.sumScore;
    this.data.datasets[0].data[2] = data.thirdgame.sumScore;
    this.data.datasets[0].data[3] = data.fourthgame.sumScore;
    this.data.datasets[0].data[4] = data.fifthgame.sumScore;
    this.data.datasets[0].data[5] = data.sixthgame.sumScore;
    this.data.datasets[0].data[6] = data.seventhgame.sumScore;
    this.data.datasets[0].data[7] = data.eightgame.sumScore;
    this.data.datasets[0].data[8] = data.ninthgame.sumScore;
    this.data.datasets[0].data[9] = data.tenthgame.sumScore;

    this.totalScoreChart.data = this.data;
    this.totalScoreChart.update();
  }

}
