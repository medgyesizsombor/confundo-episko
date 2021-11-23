import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ColourgamePage } from './colourgame.page';

const routes: Routes = [
  {
    path: '',
    component: ColourgamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class ColourgamePageRoutingModule {}
