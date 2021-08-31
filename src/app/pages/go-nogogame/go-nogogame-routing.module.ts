import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoNogogamePage } from './go-nogogame.page';

const routes: Routes = [
  {
    path: '',
    component: GoNogogamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoNogogamePageRoutingModule {}
