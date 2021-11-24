import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game10PageRoutingModule } from './game10-routing.module';

import { Game10Page } from './game10.page';
import { UserVsAverageChartComponent } from 'src/app/components/user-vs-average-chart/user-vs-average-chart.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game10PageRoutingModule,
    TranslateModule
  ],
  declarations: [Game10Page, UserVsAverageChartComponent],
  exports: [TranslateModule],
  providers: [TranslatePipe]
})
export class Game10PageModule {}
