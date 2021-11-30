import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import 'firebase/auth';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import * as moment from 'moment';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';

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
  secondsOnGame = 110;
  secondsOnTurn = 2;
  intervalGame;
  intervalTurn;
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;
  generatedTaskNumber: number;
  generatedTaskNumberText = '';


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

  taskVisibility: boolean;
  firstGenerated = true;

  drawChart: boolean;
  isMobile: boolean;
  language: string;

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService, private dataAverageUser: DataAverageUserService,
    private router: Router, private platform: Platform, private translatePipe: TranslatePipe,
    private languageService: LanguageService) { }

  ngOnInit() {
    if(this.languageService.getLanguage() === 'hu'){
      this.language = 'hu';
    } else {
      this.language = 'en';
    }
    this.isMobile = this.platform.is('mobile');
  }

  start(){
    this.ended = false;
    this.playing = true;
    this.timeText = this.secondsOnGame + ' sec';
    this.timeText2 =  'You have ' + this.secondsOnTurn + ' sec to push it!';
    this.generateTask();
    this.startCountDownGame();
    this.generateNumberCard();
    this.startCountDownTurn();
  }

  generateTask(){
    if(this.firstGenerated){
      this.generatedTaskNumber = Math.floor(Math.random() * 4 - 0) + 0;
      this.generatedTaskNumberText = this.generatedTaskNumber + ' is the forbidden number!';
      this.taskVisibility = true;
      setTimeout(() => {
        this.taskVisibility = false;
        this.firstGenerated = false;
      }, 2000);
    } else {
      this.generatedTaskNumber = Math.floor(Math.random() * 4 - 0) + 0;
      this.generatedTaskNumberText = this.generatedTaskNumber + ' is the forbidden number!';
      this.taskVisibility = false;
      setTimeout(() => {
        this.taskVisibility = true;
        setTimeout(() => {
          this.taskVisibility = false;
          this.firstGenerated = false;
        }, 2000);
      }, 1000);
    }
  }

  generateNumberCard(){
    this.numberCard = Math.floor(Math.random() * 4 - 0) + 0;
  }

  pushed(){
    this.secondsOnTurn = 2;
    this.timeText2 = 'You have ' + this.secondsOnTurn + ' sec to push it!';
    this.generatedNumberCardCounter++;
    this.checkPoint();
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
      this.timeText2 = 'You have ' + this.secondsOnTurn + ' sec to push it!';
    }, 1000);
  }

  updateTime() {
    if (this.secondsOnGame > 0) {
      this.secondsOnGame--;
      if(!this.taskVisibility){
        if(this.secondsOnTurn > 0){
          this.secondsOnTurn--;
        } else {
          this.notPushed();
          this.secondsOnTurn = 2;
          this.generateNumberCard();
        }
      }
    } else {
      this.end();
    }
  }

  checkPoint(){
    if (this.numberCard === this.generatedTaskNumber){
      this.result--;
    } else {
      this.result++;
    }

    if(this.generatedNumberCardCounter % 10 === 0){
      this.generateTask();
    }
  }

  notPushed(){
    this.generatedNumberCardCounter++;
    if(this.numberCard === this.generatedTaskNumber){
      this.result++;
    } else {
      this.result--;
    }

    if(this.generatedNumberCardCounter % 10 === 0){
      this.generateTask();
    }

  }

  styleCard(){
    if(this.taskVisibility || this.firstGenerated){
      return {
        visibility: 'hidden'
      };
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
    });
  }

  async getDataOfAverageUser(){
    await this.dataAverageUser.getDataOfAverageUser('goNogoGame').then(() => {
      this.playedGamesAverage = Number(localStorage.getItem('playedGamesAverage'))+1;
      this.sumScoreAverage = Number(localStorage.getItem('sumScoreAverage'))+this.result;
      this.averageScoreAverage = this.sumScoreAverage / this.playedGamesAverage;
    });
  }

  createIntervalText(interval: number[]) {
    return interval[0] + '-' + interval[1];
  }

  async getAverageInterval(age: number) {
    const intervals = [
      [0, 4],
      [5, 9],
      [10, 14],
      [15, 19],
      [20, 24],
      [25, 29],
      [30, 34],
      [35, 39],
      [40, 44],
      [45, 49],
      [50, 54],
      [55, 59],
      [60, 64],
      [65, 69],
      [70, 74],
      [75, 79],
      [80, 84],
      [85, 89],
      [90, 94],
      [95, 99]
    ];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < intervals.length; i++) {
      if (age >= intervals[i][0] && age <= intervals[i][1]) {
        const intervalText = this.createIntervalText(intervals[i]);
        this.average = intervalText;
        localStorage.setItem('averageId', this.average);
        break;
      } else {
        this.average = '100+';
        localStorage.setItem('averageId', this.average);
      }
    }
  }

  async getDataOfUser(){
    await this.dataOfUser.getDataOfUser().then(() => {
      this.userBirthdate = localStorage.getItem('birthdate');
    });

    const diff = moment.duration(this.today.diff(this.userBirthdate));
    this.userAge = Number(diff.years());
    await this.getAverageInterval(this.userAge);
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

  goBack(){
    clearInterval(this.intervalGame);
    clearInterval(this.intervalTurn);
    this.secondsOnGame = 110;
    this.secondsOnTurn = 2;
    this.result = 0;
    this.playing = false;
    this.router.navigate(['main-tabs/games']);
  }

  titleStyle(){
    if(!this.isMobile){
      return {
        'font-size': '36px'
      };
    } else {
      return {
        'font-size': '30px'
      };
    }
  }

}
