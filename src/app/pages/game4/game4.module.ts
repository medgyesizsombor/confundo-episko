import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game4PageRoutingModule } from './game4-routing.module';

import { Game4Page } from './game4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game4PageRoutingModule
  ],
  declarations: [Game4Page]
})
export class Game4PageModule {}
