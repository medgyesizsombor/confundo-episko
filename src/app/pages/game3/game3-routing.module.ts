import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Game3Page } from './game3.page';

const routes: Routes = [
  {
    path: '',
    component: Game3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class Game3PageRoutingModule {}
