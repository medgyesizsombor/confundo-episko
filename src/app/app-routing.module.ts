import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then( m => m.GamesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module').then( m => m.StatisticsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'main-tabs',
    loadChildren: () => import('./pages/main-tabs/main-tabs.module').then( m => m.MainTabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'colourgame',
    loadChildren: () => import('./pages/colourgame/colourgame.module').then( m => m.ColourgamePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'go-nogogame',
    loadChildren: () => import('./pages/go-nogogame/go-nogogame.module').then( m => m.GoNogogamePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game3',
    loadChildren: () => import('./pages/game3/game3.module').then( m => m.Game3PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game4',
    loadChildren: () => import('./pages/game4/game4.module').then( m => m.Game4PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game5',
    loadChildren: () => import('./pages/game5/game5.module').then( m => m.Game5PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game6',
    loadChildren: () => import('./pages/game6/game6.module').then( m => m.Game6PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game7',
    loadChildren: () => import('./pages/game7/game7.module').then( m => m.Game7PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game8',
    loadChildren: () => import('./pages/game8/game8.module').then( m => m.Game8PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game9',
    loadChildren: () => import('./pages/game9/game9.module').then( m => m.Game9PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game10',
    loadChildren: () => import('./pages/game10/game10.module').then( m => m.Game10PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule),
    pathMatch: 'full'
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  }











];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TranslateModule
  ],
  exports: [RouterModule, TranslateModule]
})
export class AppRoutingModule { }
