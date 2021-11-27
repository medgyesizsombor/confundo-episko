import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataAverageUserService {

  uid = localStorage.getItem('uid');
  averageId: any;

  constructor(private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore) { }

  getDataOfAverageUser(str: string){
    this.averageId = localStorage.getItem('averageId');
    console.log('AVERAGE_ID', this.averageId);
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Statistics').doc(this.averageId).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesAverage', res.playedGames);
          localStorage.setItem('bestScoreAverage', res.bestScore);
          localStorage.setItem('sumScoreAverage', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }
}
