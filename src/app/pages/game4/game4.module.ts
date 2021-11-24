import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game4PageRoutingModule } from './game4-routing.module';

import { Game4Page } from './game4.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game4PageRoutingModule,
    TranslateModule
  ],
  declarations: [Game4Page, UserVsAverageChartComponent],
  exports: [TranslateModule],
  providers: [TranslatePipe]
})
export class Game4PageModule {}
