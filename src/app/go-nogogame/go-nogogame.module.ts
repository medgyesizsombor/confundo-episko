import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoNogogamePageRoutingModule } from './go-nogogame-routing.module';

import { GoNogogamePage } from './go-nogogame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoNogogamePageRoutingModule
  ],
  declarations: [GoNogogamePage]
})
export class GoNogogamePageModule {}
