import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = {
    email: '',
    password: ''
  };

  dataToEncrypt = this.angularFireAuth.user;
  encryptedData='';
  secretKey='yoursecretkey';

  constructor(private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore) { }

  async login(user: any) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password).then((res) => {
        localStorage.setItem('uid', res.user.uid);
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    });
  }

  async register(user: any) {
    return new Promise((resolve, reject) => {
      const encryptedPassword = this.encrypt(user.password);
      const tmp = Object.assign({}, user);
      tmp.password = encryptedPassword;
      this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
        this.angularFireStore.collection('Users').doc(res.user.uid).set(tmp).then(() => {
          resolve(true);
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }

  currentUser(){
    return this.angularFireAuth.currentUser;
  }

  logout(){
    localStorage.removeItem('uid');
    this.angularFireAuth.signOut();
  }

  getPlayerGameStats(uid: string, gameType: string) {
    return this.angularFireStore.collection('Users').doc(uid).collection('games').doc(gameType).get();
  }

  encrypt(password: string){
    return CryptoJS.AES.encrypt(JSON.stringify(password), this.secretKey).toString();
  }

  decrypt(){
    const bytes = CryptoJS.AES.decrypt(this.encryptedData, this.secretKey);

    const obj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    alert('id = ' + obj.id);
    alert('uname = ' + obj.uname);
  }

}
