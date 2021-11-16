import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainTabsPageRoutingModule } from './main-tabs-routing.module';

import { MainTabsPage } from './main-tabs.page';
import { StatisticsPageModule } from '../statistics/statistics.module';
import { GamesPageModule } from '../games/games.module';
import { HomePageModule } from '../home/home.module';
import { ProfilePageModule } from '../profile/profile.module';
import { SettingsPageModule } from '../settings/settings.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainTabsPageRoutingModule,
    StatisticsPageModule,
    GamesPageModule,
    HomePageModule,
    ProfilePageModule,
    SettingsPageModule
  ],
  declarations: [MainTabsPage]
})
export class MainTabsPageModule {}
