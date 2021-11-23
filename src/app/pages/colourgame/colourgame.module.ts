import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColourgamePageRoutingModule } from './colourgame-routing.module';

import { ColourgamePage } from './colourgame.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColourgamePageRoutingModule,
    TranslateModule
  ],
  declarations: [ColourgamePage, UserVsAverageChartComponent],
  exports: [TranslateModule]
})
export class ColourgamePageModule {}
