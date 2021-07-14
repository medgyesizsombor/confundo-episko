import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore) { }

  login(email: string, password: string) {

  }

  register(user: any) {
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
}
