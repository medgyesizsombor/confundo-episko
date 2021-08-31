import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColourgamePage } from './colourgame.page';

const routes: Routes = [
  {
    path: '',
    component: ColourgamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColourgamePageRoutingModule {}
