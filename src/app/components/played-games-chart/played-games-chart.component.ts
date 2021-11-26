import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-played-games-chart',
  templateUrl: './played-games-chart.component.html',
  styleUrls: ['./played-games-chart.component.scss'],
})
export class PlayedGamesChartComponent implements OnInit, OnChanges {
  @Input() sumData: any;

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
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
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

    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.sumData && changes.sumData.currentValue) {
      setTimeout(() => {
        this.updateChart(changes.sumData.currentValue);
      }, 400);
    }
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
          },
          plugins: {
            legend: {
              display: false
            }
          }
        },
      });
      this.loading = false;
    }, 250);
  }

  updateChart(data: any) {
    if (this.playedGameChart === null || this.playedGameChart === undefined) { return; };

    const playedAttention = data.colourgame.playedGames + data.goNogoGame.playedGames +
    data.fifthgame.playedGames + data.sixthgame.playedGames + data.eightgame.playedGames;
    const playedMemory = data.ninthgame.playedGames + data.tenthgame.playedGames;
    const playedMath = data.thirdgame.playedGames + data.fourthgame.playedGames +
    data.seventhgame.playedGames;

    this.data.datasets[0].data[0] = playedAttention;
    this.data.datasets[0].data[1] = playedMemory;
    this.data.datasets[0].data[2] = playedMath;

    this.playedGameChart.data = this.data;
    this.playedGameChart.update();
  }
}
