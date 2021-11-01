import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import 'firebase/auth';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import * as moment from 'moment';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';

@Component({
  selector: 'app-go-nogogame',
  templateUrl: './go-nogogame.page.html',
  styleUrls: ['./go-nogogame.page.scss'],
})
export class GoNogogamePage implements OnInit {

  text: number;
  task = '';
  counter = 0;
  pushCounter = 0;
  result = 0;
  finalResult = '';
  timeText = '';
  timeText2 = '';
  secondsOnGame = 5;
  secondsOnTurn = 2;
  intervalGame;
  intervalTurn;
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;


  playing = false;
  ended = false;
  nextTask = false;

  uid = localStorage.getItem('uid');
  average = '';

  userBirthdate: any;
  userAge: number;
  today = moment(Date.now());

  playedGamesAverage = 0;
  sumScoreAverage = 0;
  averageScoreAverage = 0;

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService, private dataAverageUser: DataAverageUserService) { }

  ngOnInit() {
    this.task = 'Press button when it is even number';
  }

  start(){
    this.playing = true;
    this.timeText = this.secondsOnGame + ' sec';
    this.timeText2 = this.secondsOnTurn + ' sec';
    this.startCountDownGame();
    this.changeNumber();
    this.startCountDownTurn();
  }

  changeNumber(){
    this.text = Math.floor(Math.random() * 20 - 0) + 0;
  }

  pushed($event: PointerEvent){
    this.secondsOnTurn = 2;
    this.timeText2 = this.secondsOnTurn + ' sec';
    this.pushCounter++;
    this.checkTask();
    console.log(this.pushCounter);
  }

  firstTask(){
    if(this.text % 2 === 0) {
      this.result = this.result + 1;

      console.log('Yeah');
      this.result = this.result + 1;
      console.log(this.result);
      this.changeNumber();

    } else {
      console.log('upsi');
      this.result = this.result - 2;
      console.log(this.result);
      this.changeNumber();
    }
  }

  secondTask(){
    if(this.text >= 10){
      this.result = this.result + 1;

      console.log('Yeah');
      this.result = this.result + 1;
      console.log(this.result);
      this.changeNumber();

    } else {
      console.log('upsi');
      this.result = this.result - 2;
      console.log(this.result);
      this.changeNumber();
    }
  }

  startCountDownGame() {
    this.intervalGame = setInterval(() => {
      this.updateTime();
      this.timeText = this.secondsOnGame + ' sec';
    }, 1000);
  }

  startCountDownTurn(){
    this.intervalTurn = setInterval(() => {
      this.timeText2 = this.secondsOnTurn + ' sec';
    }, 1000);
  }

  updateTime() {
    if (this.secondsOnGame > 0) {
      this.secondsOnGame--;
      if(this.secondsOnTurn > 0){
        this.secondsOnTurn--;
      } else {
        this.notPushed();
        this.secondsOnTurn = 2;
        this.changeNumber();
      }
    } else {
      this.end();
    }
  }

  checkTask(){
    if(this.pushCounter < 10){
      this.firstTask();
    } else if(this.pushCounter === 10) {
      this.task = 'Push button when it is equal or more than 9';
      this.firstTask();
    } else {
      this.secondTask();
    }
  }

  notPushed(){
    if(this.firstTask){
        if(this.text % 2 === 1){
          this.result = this.result + 1;
          console.log(this.result);
        } else {
          this.result = this.result - 2;
          console.log(this.result);
        }
    } else {
      if(this.text < 10){
        this.result = this.result + 1;
        console.log(this.result);
      } else {
        this.result = this.result - 2;
        console.log(this.result);
      }
    }
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('go-nogogame').then(() => {
      this.playedGames = Number(localStorage.getItem('playedGames'))+1;
      this.sumScore = Number(localStorage.getItem('sumScore'))+this.result;
      this.averageScore = this.sumScore / this.playedGames;
      this.bestScore = Number(localStorage.getItem('bestScore'));
      if(this.bestScore < this.result || this.bestScore === 0){
        this.bestScore = this.result;
      }
      console.log(this.playedGames + 'playedGames');
      console.log(this.sumScore + 'sumScore');
      console.log(this.averageScore + 'average');
      console.log(this.bestScore);
    });
  }

  async getDataOfAverageUser(){
    await this.dataAverageUser.getDataOfAverageUser('go-nogogame').then(() => {
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

  async end() {
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    this.ended = true;
    await this.getDataOfGames();
    this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc('go-nogogame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFireStore.collection('Statistics').doc(this.average).collection('game').doc('go-nogogame').update({
      playedGames: this.playedGamesAverage,
      sumScore: this.sumScoreAverage,
      averageScore: this.averageScoreAverage,
    });

    clearInterval(this.intervalTurn);
    clearInterval(this.intervalGame);
    localStorage.removeItem('playedGames');
    localStorage.removeItem('sumScore');
    localStorage.removeItem('bestScore');
    localStorage.removeItem('averageScore');
  }

}
