import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';

@Component({
  selector: 'app-game8',
  templateUrl: './game8.page.html',
  styleUrls: ['./game8.page.scss'],
})
export class Game8Page implements OnInit {

  timeText: string;
  title= '';
  label1: 'Up';
  label2: 'Down';
  label3: 'Right';
  label4: 'Left';
  result = 0;
  finalResult = 0;

  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;

  randomNumber: number;
  randomLetter: string;
  directions= ['Up', 'Down', 'Right', 'Left'];

  seconds = 5;
  playing = false;
  ended = false;
  interval: any;

  uid = localStorage.getItem('uid');
  average = '';

  userBirthdate: any;
  userAge: number;
  today = moment(Date.now());

  playedGamesAverage = 0;
  sumScoreAverage = 0;
  averageScoreAverage = 0;
  drawChart = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private dataOfGame: DataOfGameService, private dataOfUser: DataOfUserService,
    private dataAverageUser: DataAverageUserService) {
  }

  ngOnInit() {
    console.log(this.uid);
  }

  onStart(){
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.generateDirection();
    this.startCountDown();
  }

  startCountDown() {
    this.interval = setInterval(() => {
        this.updateTime();
        this.timeText = this.seconds + ' sec';
    }, 1000);
  }

  updateTime() {
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      this.end();
    }
  }

  generateDirection(){
    this.randomNumber = Math.floor(Math.random() * (3 - 0) + 0);
    switch (this.randomNumber) {
      case 0:
        this.title = this.directions[0];
        break;
      case 1:
        this.title = this.directions[1];
        break;
      case 2:
        this.title = this.directions[2];
        break;
      case 3:
        this.title = this.directions[3];
        break;
    }
  }

  clicked(str: string){
    if(str === 'Up'){
      this.checkPoint('Up');
    } else if (str === 'Down') {
      this.checkPoint('Down');
    } else if (str === 'Left'){
      this.checkPoint('Left');
    } else {
      this.checkPoint('Right');
    }
    console.log(this.result);
    this.generateDirection();
  }

  checkPoint(str: string){
    switch(str){
      case 'Up':
        if(this.title === 'Down'){
          this.result++;
        } else {
          this.result--;
        }
        break;
      case 'Down':
        if (this.title === 'Up'){
          this.result++;
        } else {
          this.result--;
        }
        break;
      case 'Left':
        if(this.title === 'Right'){
          this.result++;
        } else {
          this.result--;
        }
        break;
      case 'Right':
        if(this.title === 'Left'){
          this.result++;
        } else {
          this.result--;
        }
        break;
    }
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('eightgame').then(() => {
      this.playedGames = Number(localStorage.getItem('playedGames'))+1;
      this.sumScore = Number(localStorage.getItem('sumScore'))+this.result;
      this.averageScore = this.sumScore / this.playedGames;
      this.bestScore = Number(localStorage.getItem('bestScore'));
      if(this.bestScore < this.result || this.bestScore === 0){
        this.bestScore = this.result;
      }
    });
  }

  async getDataOfAverageUser(){
    await this.dataAverageUser.getDataOfAverageUser('eightgame').then(() => {
      this.playedGamesAverage = Number(localStorage.getItem('playedGamesAverage'))+1;
      this.sumScoreAverage = Number(localStorage.getItem('sumScoreAverage'))+this.result;
      this.averageScoreAverage = this.sumScoreAverage / this.playedGamesAverage;
    });
  }

  async getDataOfUser(){
    await this.dataOfUser.getDataOfUser().then(() => {
      this.userBirthdate = localStorage.getItem('birthdate');
    });

    const diff = moment.duration(this.today.diff(this.userBirthdate));
    const age = Number(diff.years());
    if(age >= 0 && age <= 4){
      this.average = '0-4';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 5 && age <= 9){
      this.average = '5-9';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 10 && age <= 14){
      this.average = '10-14';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 15 && age <= 19){
      this.average = '15-19';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 20 && age <= 24){
      this.average = '20-24';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 25 && age <= 29){
      this.average = '25-29';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 30 && age <= 34){
      this.average = '30-34';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 35 && age <= 39){
      this.average = '35-39';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 40 && age <= 44){
      this.average = '40-44';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 45 && age <= 49){
      this.average = '45-49';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 50 && age <= 54){
      this.average = '50-54';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 55 && age <= 59){
      this.average = '55-54';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 60 && age <= 64){
      this.average = '60-64';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 65 && age <= 69){
      this.average = '65-69';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 70 && age <= 74){
      this.average = '70-74';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 75 && age <= 79){
      this.average = '75-79';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 80 && age <= 84){
      this.average = '80-84';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 85 && age <= 89){
      this.average = '85-89';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 90 && age <= 94){
      this.average = '90-94';
      localStorage.setItem('averageId', this.average);
    } else if (age >= 95 && age <= 99){
      this.average = '95-99';
      localStorage.setItem('averageId', this.average);
    } else {
      this.average = '100+';
      localStorage.setItem('averageId', this.average);
    }
  }

  async end(){
    this.playing = false;
    this.ended = true;
    this.finalResult = this.result;
    await this.getDataOfGames();
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('eightgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFirestore.collection('Statistics').doc(this.average).collection('game').doc('eightgame').update({
      playedGames: this.playedGamesAverage,
      sumScore: this.sumScoreAverage,
      averageScore: this.averageScoreAverage,
    });
    console.log(this.bestScore);
    console.log(this.playedGames);
    console.log(this.sumScore);
    console.log(this.averageScore);
    clearInterval(this.interval);
    localStorage.setItem('result', String(this.result));
    localStorage.setItem('averageScore', String(this.averageScoreAverage));
    this.drawChart = true;
  }

}
