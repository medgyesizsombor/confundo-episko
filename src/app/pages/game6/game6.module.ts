import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game6PageRoutingModule } from './game6-routing.module';

import { Game6Page } from './game6.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game6PageRoutingModule
  ],
  declarations: [Game6Page, UserVsAverageChartComponent]
})
export class Game6PageModule {}
