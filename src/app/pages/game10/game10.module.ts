import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game10PageRoutingModule } from './game10-routing.module';

import { Game10Page } from './game10.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game10PageRoutingModule
  ],
  declarations: [Game10Page, UserVsAverageChartComponent]
})
export class Game10PageModule {}
