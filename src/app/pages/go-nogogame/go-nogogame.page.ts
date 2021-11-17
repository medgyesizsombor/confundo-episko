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

  numberCard: number;
  task = '';
  counter = 0;
  generatedNumberCardCounter = 0;
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
  generatedTaskNumber = 0;


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

  drawChart: boolean;

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService, private dataAverageUser: DataAverageUserService) { }

  ngOnInit() {
  }

  start(){
    this.playing = true;
    this.timeText = this.secondsOnGame + ' sec';
    this.timeText2 = this.secondsOnTurn + ' sec';
    this.generatedTaskNumber = Math.floor(Math.random() * 4 - 0) + 0;
    this.startCountDownGame();
    this.generateNumberCard();
    this.startCountDownTurn();
  }

  generateTask(){
    this.generatedTaskNumber = Math.floor(Math.random() * 4 - 0) + 0;
  }

  generateNumberCard(){
    this.numberCard = Math.floor(Math.random() * 4 - 0) + 0;
  }

  pushed(){
    this.secondsOnTurn = 2;
    this.timeText2 = this.secondsOnTurn + ' sec';
    this.generatedNumberCardCounter++;
    this.checkPoint();
    console.log(this.generatedNumberCardCounter);
    this.generateNumberCard();
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
        this.generateNumberCard();
      }
    } else {
      this.end();
    }
  }

  checkPoint(){
    if (this.numberCard === this.generatedTaskNumber){
      console.log('minusz pont a pushednál');
      this.result--;
    } else {
      console.log('plusz pont a pushednál');
      this.result++;
    }

    if(this.generatedNumberCardCounter % 10 === 0){
      this.generateTask();
    }
  }

  notPushed(){
    if(this.numberCard === this.generatedTaskNumber){
      this.result++;
      console.log('plusz pont a notpushednál');
    } else {
      this.result--;
      console.log('minusz pont a pushednál');
    }

    if(this.generatedNumberCardCounter % 10 === 0){
      this.generateTask();
    }

  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('goNogoGame').then(() => {
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
    await this.dataAverageUser.getDataOfAverageUser('goNogoGame').then(() => {
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
    this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc('goNogoGame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFireStore.collection('Statistics').doc(this.average).collection('game').doc('goNogoGame').update({
      playedGames: this.playedGamesAverage,
      sumScore: this.sumScoreAverage,
      averageScore: this.averageScoreAverage,
    });

    clearInterval(this.intervalTurn);
    clearInterval(this.intervalGame);
    localStorage.setItem('result', String(this.result));
    localStorage.setItem('averageScore', String(this.averageScoreAverage));
    this.drawChart = true;
  }

}
