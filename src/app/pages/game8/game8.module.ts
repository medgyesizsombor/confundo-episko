import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game8PageRoutingModule } from './game8-routing.module';

import { Game8Page } from './game8.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game8PageRoutingModule
  ],
  declarations: [Game8Page, UserVsAverageChartComponent]
})
export class Game8PageModule {}