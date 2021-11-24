import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ErrorPage } from './error.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class ErrorPageRoutingModule {}
