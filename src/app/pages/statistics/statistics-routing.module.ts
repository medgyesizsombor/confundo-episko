import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

import { StatisticsPage } from './statistics.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
  declarations: [],
  providers: []
})
export class StatisticsPageRoutingModule {}
