import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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

  constructor(private toast: ToastController, private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth, private router: Router, private loadingController: LoadingController, private authService: AuthService) { }

  ngOnInit() {
    
  }

  async login(){
    let loading = await this.loadingController.create({
      message: 'Loading...'
    });
    loading.present();


    let user = null;
    try {
      user = await this.angularFireAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
    } catch(err) {
      let toast = await this.toast.create({
        message: err.message,
       // duration: 2000,
        cssClass: 'toast-login'
      });
      toast.present();
      loading.dismiss();
    }
    console.log(user);

    if(user.user.email){
      this.router.navigate(['main-tabs/home']);
      loading.dismiss();
    } else {
      loading.dismiss();
    }
  }

  async register(){
    this.authService.register({
      email: this.user.email,
      password: this.user.password,
      age: 24
    }).then(() => {

    }).catch(err => {
      
    });
    /*const user = await this.angularFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
    console.log(user);

    if(user.user.email){
      alert('registration successful!');
    } else {
      alert('registration failed!'); //no internet connection, email is already used, email is not properly formatted
    }*/
  }
  
}
