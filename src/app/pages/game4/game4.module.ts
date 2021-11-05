import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game4PageRoutingModule } from './game4-routing.module';

import { Game4Page } from './game4.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game4PageRoutingModule
  ],
  declarations: [Game4Page, UserVsAverageChartComponent]
})
export class Game4PageModule {}
