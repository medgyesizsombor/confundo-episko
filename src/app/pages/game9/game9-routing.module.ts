import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Game9Page } from './game9.page';

const routes: Routes = [
  {
    path: '',
    component: Game9Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class Game9PageRoutingModule {}
