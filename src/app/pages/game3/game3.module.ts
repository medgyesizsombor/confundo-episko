import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game3PageRoutingModule } from './game3-routing.module';

import { Game3Page } from './game3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game3PageRoutingModule
  ],
  declarations: [Game3Page]
})
export class Game3PageModule {}
