import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game9PageRoutingModule } from './game9-routing.module';

import { Game9Page } from './game9.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game9PageRoutingModule
  ],
  declarations: [Game9Page, UserVsAverageChartComponent]
})
export class Game9PageModule {}
