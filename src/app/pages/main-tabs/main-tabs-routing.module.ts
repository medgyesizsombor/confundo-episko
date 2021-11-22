import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GamesPage } from '../games/games.page';
import { HomePage } from '../home/home.page';
import { ProfilePage } from '../profile/profile.page';
import { SettingsPage } from '../settings/settings.page';
import { StatisticsPage } from '../statistics/statistics.page';

import { MainTabsPage } from './main-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MainTabsPage,
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'games',
        component: GamesPage
      },
      {
        path: 'statistics',
        component: StatisticsPage
      },
      {
        path: 'settings',
        component: SettingsPage
      },
      {
        path: 'profile',
        component: ProfilePage
      },
      {
        path: '',
        redirectTo: '/main-tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class MainTabsPageRoutingModule {}
