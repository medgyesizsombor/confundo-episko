import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game8PageRoutingModule } from './game8-routing.module';

import { Game8Page } from './game8.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game8PageRoutingModule
  ],
  declarations: [Game8Page]
})
export class Game8PageModule {}
