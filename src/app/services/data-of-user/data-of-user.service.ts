import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataOfUserService {

  uid = localStorage.getItem('uid');

  constructor(private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore) { }

  async getDataOfUser(){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).valueChanges().subscribe((res: any) => {
          localStorage.setItem('birthdate', res.birthdate);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }
}
