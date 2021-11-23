import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game5PageRoutingModule } from './game5-routing.module';

import { Game5Page } from './game5.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game5PageRoutingModule,
    TranslateModule
  ],
  declarations: [Game5Page, UserVsAverageChartComponent],
  exports: [TranslateModule]
})
export class Game5PageModule {}
