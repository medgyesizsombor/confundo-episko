import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  isMobile: boolean;
  language = localStorage.getItem('language');

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
    private platform: Platform, private languageService: LanguageService) { }

  ngOnInit() {
    console.log(this.language);
    this.languageService.setLanguage(this.language);
  }

  ionViewWillEnter() {
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'willEnter');
    this.styleCard();

  }

  goToGame(url: string){
    if(url){
      this.router.navigate([url]);
    }
  }

  styleCard(){
    if(!this.isMobile){
      return '60%';
    }
  }

  goHomePage(){
    this.router.navigate(['main-tabs/home']);
  }

}
