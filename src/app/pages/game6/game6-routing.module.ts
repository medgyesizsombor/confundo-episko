import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Game6Page } from './game6.page';

const routes: Routes = [
  {
    path: '',
    component: Game6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class Game6PageRoutingModule {}
