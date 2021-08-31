import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  user = {
    email: '',
    password: ''
  }

  constructor(private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore) { }

  async login(user: any) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password).then(() => {
        resolve(true);
      }).catch(err => {
        reject(err);
      })
    })
  }

  async register(user: any) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        this.angularFireStore.collection('Users').add(user).then(() => {
          resolve(true);
        }).catch(err => {
          reject(err);
        })
      }).catch(err => {
        reject(err);
      })
    })
  }

  currentUser(){
    return this.angularFireAuth.currentUser;
  }

  loggedIn(){
    if(sessionStorage.getItem("email") === this.user.email){
      return true;
    } else {
      return false;
    }
  }

  logout(){
    this.angularFireAuth.signOut();
  }

  /*getPlayerGameStats(uid: string, gameType: string) {
    return this.angularFireStore.collection('Users').doc(uid).collection('points').doc(gameType).get();
  }*/
 
}
