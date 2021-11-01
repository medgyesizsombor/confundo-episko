import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';

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


  uid = localStorage.getItem('uid');

  constructor(private toast: ToastController, private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth, private router: Router,
    private loadingController: LoadingController, private authService: AuthService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async register(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    loading.present();

    this.authService.register({
      email: this.user.email,
      username: this.user.username,
      password: this.user.password,
      birthdate: this.user.birthdate,
      name: this.user.name
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
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Registration is successfull.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    this.router.navigate(['login']);
  }

}
