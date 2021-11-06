import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';

import { MyChartComponent } from 'src/app/components/my-chart/my-chart.component';
import { PlayedGamesChartComponent } from 'src/app/components/played-games-chart/played-games-chart.component';
import { TotalScoreChartComponent } from 'src/app/components/total-score-chart/total-score-chart/total-score-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule
  ],
  declarations: [StatisticsPage, MyChartComponent, PlayedGamesChartComponent, TotalScoreChartComponent],
})
export class StatisticsPageModule {}
