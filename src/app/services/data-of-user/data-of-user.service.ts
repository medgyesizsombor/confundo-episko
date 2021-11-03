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

  async getPlayedGameColour(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesColour', res.playedGames);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getPlayedGameGoNogo(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGoNogo', res.playedGames);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getPlayedGameGame3(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame3', res.playedGames);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getPlayedGameGame4(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame4', res.playedGames);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getPlayedGameGame5(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame5', res.playedGames);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getPlayedGameGame6(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame6', res.playedGames);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  async getPlayedGameGame7(str: string){
    return new Promise((resolve, reject) => {
      this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc(str).valueChanges().subscribe(res => {
          localStorage.setItem('playedGamesGame7', res.playedGames);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }
}
