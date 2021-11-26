import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin } from 'rxjs';

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

  async getDataOfUserLastPlayed(){
    this.angularFireStore.collection('Users').doc(this.uid).valueChanges().subscribe((res: any) => {
      localStorage.setItem('lastPlayed', res.lastPlayed);
    }, err => {
      console.log(err);
    });
  }


  async getDataOfGameColour(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesColourgame', res.playedGames);
          localStorage.setItem('totalScoreColourgame', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getDataOfGameGoNogo(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGoNogo', res.playedGames);
          localStorage.setItem('totalScoreGoNogo', res.sumScore + 1);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getDataOfGameGame3(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame3', res.playedGames);
          localStorage.setItem('totalScoreGame3', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  getAllSumStats() {
    return new Promise(async (resolve, reject) => {
      const documents = ['colourgame', 'goNogoGame', 'thirdgame', 'fourthgame', 'fifthgame', 'sixthgame',
      'seventhgame', 'eightgame', 'ninthgame', 'tenthgame'];
      const datas = {};

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < documents.length; i++) {
        try {
          const res = await this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(documents[i]).get().toPromise();
          datas[documents[i]] = res.data();
        } catch (err) {
          reject(err);
        }
      }

      resolve(datas);
    });
  }

  getAllDatas(){
    return new Promise(async (resolve, reject) => {
      const documents = ['colourgame', 'goNogoGame', 'thirdgame', 'fourthgame', 'fifthgame',
      'sixthgame', 'seventhgame', 'eightgame', 'ninthgame', 'tenthgame'];
      const datas = {};

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < documents.length; i++) {
        try {
          // eslint-disable-next-line max-len
          const res = await this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(documents[i]).get().toPromise();
          datas[documents[i]] = res.data();
        } catch (err) {
          reject(err);
        }
      }

      resolve(datas);
    });
  }

  test1(str: string) {
    return this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges();
  }

  async getDataOfGameGame4(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame4', res.playedGames);
          localStorage.setItem('totalScoreGame4', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getDataOfGameGame5(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame5', res.playedGames);
          localStorage.setItem('totalScoreGame5', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getDataOfGameGame6(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame6', res.playedGames);
          localStorage.setItem('totalScoreGame6', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getDataOfGameGame7(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame7', res.playedGames);
          localStorage.setItem('totalScoreGame7', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getDataOfGameGame8(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame8', res.playedGames);
          localStorage.setItem('totalScoreGame8', res.sumScore);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }
}
