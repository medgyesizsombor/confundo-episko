import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game3PageRoutingModule } from './game3-routing.module';

import { Game3Page } from './game3.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game3PageRoutingModule
  ],
  declarations: [Game3Page, UserVsAverageChartComponent]
})
export class Game3PageModule {}
