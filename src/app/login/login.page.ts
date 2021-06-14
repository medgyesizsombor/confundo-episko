import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) { }

  ngOnInit() {
    
  }

  login(){
    this.afa.signInWithEmailAndPassword(this.username, this.password).then(res => {
      console.log(res)
    })
  }
  
}
