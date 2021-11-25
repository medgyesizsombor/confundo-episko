import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isMobile: boolean;
  language = localStorage.getItem('language');

  constructor(private authService: AuthService, private router: Router,
    private platform: Platform, private languageService: LanguageService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.styleCard();
    this.languageService.setLanguage(localStorage.getItem('language'));
    console.log(this.language);
  }

  ionViewWillEnter(){
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'change');
  }

  logout(){
    this.authService.logout();
    localStorage.clear();
    this.languageService.setLanguage(this.translateService.defaultLang);
    this.router.navigate(['login']);
  }

  goToSettings(url: string){
    if(url){
      this.router.navigate([url]);
    }
  }

  styleCard(){
    if(!this.isMobile){
      return {width: '60%', margin: '10px auto 10px auto'};
    }
  }

  goHomePage(){
    this.router.navigate(['main-tabs/home']);
  }

  setLanguage(str: string){
    console.log(str);
    this.languageService.setLanguage(str);
    localStorage.setItem('language', str);
  }

  titleStyle(){
    if(!this.isMobile){
      return {
        'font-size': '36px'
      };
    } else {
      return {
        'font-size': '30px'
      };
    }
  }

  textStyle(){
    if(!this.isMobile){
      return{
        'font-size': '18px'
      };
    } else {
      return{
        'font-size':'16px'
      };
    }
  }



}
