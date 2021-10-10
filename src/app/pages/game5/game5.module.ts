import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game5PageRoutingModule } from './game5-routing.module';

import { Game5Page } from './game5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game5PageRoutingModule
  ],
  declarations: [Game5Page]
})
export class Game5PageModule {}
