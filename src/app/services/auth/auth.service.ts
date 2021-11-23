import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid = localStorage.getItem('uid');

  dataOfGame = {
    bestScore: 0,
    playedGames: 0,
    averageScore: 0,
    sumScore: 0,
  };

  user = {
    email: '',
    password: ''
  };

  lastPlayed = '';
  name = '';

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
      this.angularFireStore.collection('Users').doc(this.uid).valueChanges().subscribe((res: any) => {
        localStorage.setItem('name', res.name);
      }, err => {
        console.log(err);
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
        this.createDocuments(res.user.uid);
        this.createAverageDocuments();
      }).catch(err => {
        reject(err);
      });
    });
  }

  createDocuments(uid: any){
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Users').doc(uid).collection('game').doc('tenthgame').set(this.dataOfGame);
  }

  createAverageDocuments(){ //it is just for creating the average players
    /*this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('0-4').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('5-9').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('10-14').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('15-19').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('20-24').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('25-29').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('30-34').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('35-39').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('40-44').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('45-49').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('50-54').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('55-59').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('60-64').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('65-69').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('70-74').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('75-79').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('80-84').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('85-89').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('90-94').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('95-99').collection('game').doc('tenthgame').set(this.dataOfGame);

    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('colourgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('goNogoGame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('thirdgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('fourthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('fifthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('sixthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('seventhgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('eightgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('ninthgame').set(this.dataOfGame);
    this.angularFireStore.collection('Statistics').doc('100+').collection('game').doc('tenthgame').set(this.dataOfGame);*/
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
