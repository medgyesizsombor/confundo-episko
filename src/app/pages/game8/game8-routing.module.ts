import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Game8Page } from './game8.page';

const routes: Routes = [
  {
    path: '',
    component: Game8Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game8PageRoutingModule {}
