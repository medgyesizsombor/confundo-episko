import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Game4Page } from './game4.page';

const routes: Routes = [
  {
    path: '',
    component: Game4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game4PageRoutingModule {}
