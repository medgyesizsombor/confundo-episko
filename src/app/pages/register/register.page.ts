import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    email: '',
    password: '',
    username: '',
    birthdate: '',
    name: '',
  };
  game = {
    asd: 0,
    asd2: 0
  };

  isMobile: boolean;
  uid = localStorage.getItem('uid');

  constructor(private toast: ToastController, private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth, private router: Router,
    private loadingController: LoadingController, private authService: AuthService,
    private alertController: AlertController, private platform: Platform,
    private translatePipe: TranslatePipe) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
  }

  async register(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    loading.present();

    this.authService.register({
      email: this.user.email,
      password: this.user.password,
      birthdate: moment(this.user.birthdate).format('YYYY-MM-DD'),
      name: this.user.name,
      lastPlayed: ''
    }).then(() => {
      loading.dismiss();
      this.successfulAlert();
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

  async successfulAlert(){
    const alert = await this.alertController.create({
      message: this.translatePipe.transform('REGISTER.message'),
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.router.navigate(['login']);
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  textStyle(){
    if(!this.isMobile){
      return {
        'font-size': '16px',
        '--placeholder-color': '#ebebeb'
      };
    }
  }

  registerButtonStyle(){
    if(!this.isMobile){
      return {
        'font-size': '18px'
      };
    }
  }

  goToLoginButtonStyle(){
    if(!this.isMobile){
      return {
        'font-size': '14px'
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
