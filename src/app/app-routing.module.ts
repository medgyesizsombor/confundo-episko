import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
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
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
