import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game7PageRoutingModule } from './game7-routing.module';

import { Game7Page } from './game7.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game7PageRoutingModule
  ],
  declarations: [Game7Page, UserVsAverageChartComponent]
})
export class Game7PageModule {}
