import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColourgamePageRoutingModule } from './colourgame-routing.module';

import { ColourgamePage } from './colourgame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColourgamePageRoutingModule
  ],
  declarations: [ColourgamePage]
})
export class ColourgamePageModule {}
