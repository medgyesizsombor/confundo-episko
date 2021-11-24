import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game8PageRoutingModule } from './game8-routing.module';

import { Game8Page } from './game8.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game8PageRoutingModule,
    TranslateModule
  ],
  declarations: [Game8Page, UserVsAverageChartComponent],
  exports: [TranslateModule],
  providers: [TranslatePipe]
})
export class Game8PageModule {}
