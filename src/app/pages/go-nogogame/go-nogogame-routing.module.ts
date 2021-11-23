import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { GoNogogamePage } from './go-nogogame.page';

const routes: Routes = [
  {
    path: '',
    component: GoNogogamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class GoNogogamePageRoutingModule {}
