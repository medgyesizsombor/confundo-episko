import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Game6Page } from './game6.page';

const routes: Routes = [
  {
    path: '',
    component: Game6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game6PageRoutingModule {}
