import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isMobile: boolean;

  constructor(private authService: AuthService, private router: Router,
    private platform: Platform) { }

  ngOnInit() {
    this.styleCard();
  }

  ionViewWillEnter(){
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'change');
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  goToSettings(url: string){
    if(url){
      this.router.navigate([url]);
    }
  }

  styleCard(){
    if(!this.isMobile){
      return {width: '60%', margin: '20px auto'};
    }
  }

  goHomePage(){
    this.router.navigate(['main-tabs/home']);
  }

}
