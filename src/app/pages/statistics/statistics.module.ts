import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';

import { MyChartComponent } from 'src/app/components/my-chart/my-chart.component';
import { PlayedGamesChartComponent } from 'src/app/components/played-games-chart/played-games-chart.component';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule
  ],
  declarations: [StatisticsPage, MyChartComponent, PlayedGamesChartComponent, UserVsAverageChartComponent]
})
export class StatisticsPageModule {}
