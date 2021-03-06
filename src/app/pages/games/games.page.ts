import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  uid = localStorage.getItem('uid');
  isMobile: boolean;
  language = '';

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
    private platform: Platform, private languageService: LanguageService,
    private angularFireStore: AngularFirestore) { }

  ngOnInit() {
    if (this.languageService.getLanguage() === 'hu'){
      this.language = 'hu';
    } else {
      this.language = 'en';
    }
    this.isMobile = this.platform.is('mobile');
  }

  ionViewWillEnter() {
    if (this.languageService.getLanguage() === 'hu'){
      this.language = 'hu';
    } else {
      this.language = 'en';
    }
    this.isMobile = this.platform.is('mobile');
    this.styleCard();

  }

  goToGame(url: string){
    if(url){
      this.angularFireStore
      .collection('Users')
      .doc(this.uid)
      .update({
        lastPlayed: url
      });
      localStorage.setItem('lastPlayed', url);
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

  styleIonCardContent(){
    if(this.isMobile){
      return {
        'font-size': '12px',
      };
    }
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

}
