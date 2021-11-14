import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Game10Page } from './game10.page';

const routes: Routes = [
  {
    path: '',
    component: Game10Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game10PageRoutingModule {}
