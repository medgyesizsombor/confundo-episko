import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Game10Page } from './game10.page';

const routes: Routes = [
  {
    path: '',
    component: Game10Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class Game10PageRoutingModule {}
