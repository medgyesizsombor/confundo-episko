import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  uid = localStorage.getItem('uid');
  language = localStorage.getItem('language');
  lastPlayed = '';
  name = '';

  playedMath = 0;
  playedMath2 = 0;
  playedMath3 = 0;
  playedMathFinal = 10;
  playedFocus1 = 0;
  playedFocus2 = 0;
  playedFocus3 = 0;
  playedFocusFinal = 0;
  playedAttention1 = 0;
  playedAttention2 = 0;
  playedAttentionFinal = 0;

  fullName: any;
  params: any;

  constructor(private router: Router, private loadingController: LoadingController,
    private authService: AuthService, private angularFirestore: AngularFirestore,
    private dataOfUser: DataOfUserService, private languageService: LanguageService) { }


  async ngOnInit() {
    this.fullName = {
      name: localStorage.getItem('name')
    };
    await this.getDatas();
    await this.languageService.setLanguage(localStorage.getItem('language'));
  }

  async ionViewWillEnter(){
    this.fullName = {
      name: localStorage.getItem('name')
    };
    await this.getDatas();
    await this.languageService.setLanguage(this.language);
  }

  async getDatas(){
    this.dataOfUser.getDataOfUser();
    this.params = {
      gameName: localStorage.getItem('lastPlayed')
    };
  }

  goToGames() {
    this.router.navigate(['main-tabs/games']);
  }

  playWithLastGame(){
    this.router.navigate([this.lastPlayed]);
  }

}
