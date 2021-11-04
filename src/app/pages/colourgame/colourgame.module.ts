import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColourgamePageRoutingModule } from './colourgame-routing.module';

import { ColourgamePage } from './colourgame.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColourgamePageRoutingModule
  ],
  declarations: [ColourgamePage, UserVsAverageChartComponent]
})
export class ColourgamePageModule {}
