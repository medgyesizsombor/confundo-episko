import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoNogogamePageRoutingModule } from './go-nogogame-routing.module';

import { GoNogogamePage } from './go-nogogame.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoNogogamePageRoutingModule
  ],
  declarations: [GoNogogamePage, UserVsAverageChartComponent]
})
export class GoNogogamePageModule {}
