import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';

import { MyChartComponent } from 'src/app/components/my-chart/my-chart.component';
import { PlayedGamesChartComponent } from 'src/app/components/played-games-chart/played-games-chart.component';
import { TotalScoreChartComponent } from 'src/app/components/total-score-chart/total-score-chart/total-score-chart.component';
import { BestScoreComponent } from 'src/app/components/best-score/best-score.component';
import { AverageScoreComponent } from 'src/app/components/average-score/average-score.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    TranslateModule
  ],
  declarations: [StatisticsPage, MyChartComponent, PlayedGamesChartComponent, TotalScoreChartComponent,
  BestScoreComponent, AverageScoreComponent],
  exports: [TranslateModule]
})
export class StatisticsPageModule {}
