import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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

  constructor(private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    
  }

  async login(){
    const user = await this.angularFireAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
    console.log(user);

    if(user.user.email){
      this.router.navigate(['/home']);
    } else {
      alert('login failed!');
    }
  }

  async register(){
    const user = await this.angularFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
    console.log(user);

    if(user.user.email){
      alert('registration successful!');
    } else {
      alert('registration failed!'); //no internet connection, email is already used, email is not in good format
    }
  }
  
}
