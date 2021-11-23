import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Game7Page } from './game7.page';

const routes: Routes = [
  {
    path: '',
    component: Game7Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class Game7PageRoutingModule {}
