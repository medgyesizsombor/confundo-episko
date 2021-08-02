import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private toast: ToastController, private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth, private router: Router, private loadingController: LoadingController, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    
  }

  async login(){
    let loading = await this.loadingController.create({
      message: 'Loading...'
    });
    loading.present();

    this.authService.login(
      this.user
      ).then(() => {
      loading.dismiss();
      this.router.navigate(['main-tabs/home']);
    }).catch(async err => {
      let toast = await this.toast.create({
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
