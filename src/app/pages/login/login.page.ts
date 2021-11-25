import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: ''
  };

  isMobile: boolean;

  constructor(private toast: ToastController, private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth, private router: Router,
    private loadingController: LoadingController, private authService: AuthService,
    private alertController: AlertController, private platform: Platform,
    private languageService: LanguageService, private translateService: TranslateService) { }

  async ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'willEnter');
    this.languageService.setLanguage(localStorage.getItem('language'));
    }

  ionViewWillEnter() {
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'willEnter');
  }

  ionViewDidEnter(){
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'willEnter');
  }

  async login(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    loading.present();

    this.authService.login(
      this.user
      ).then(() => {
      loading.dismiss();
      this.languageService.setLanguage(this.translateService.defaultLang);
      this.router.navigate(['main-tabs/home']);
    }).catch(async err => {
      const toast = await this.toast.create({
        message: err,
        duration: 2000,
        cssClass: 'toast-register'
      });
      toast.present();
      loading.dismiss();
    });
  }

  goToRegister(){
    this.router.navigate(['register']);
  }

}
