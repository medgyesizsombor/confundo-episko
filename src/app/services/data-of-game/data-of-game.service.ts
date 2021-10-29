import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataOfGameService {

  uid = localStorage.getItem('uid');

  constructor(private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore) { }

  async getDataOfGames(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGames', res.playedGames);
          localStorage.setItem('bestScore', res.bestScore);
          localStorage.setItem('sumScore', res.sumScore);
          localStorage.setItem('bestScore', res.bestScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }
}
