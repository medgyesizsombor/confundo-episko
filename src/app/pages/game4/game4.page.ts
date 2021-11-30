import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import * as moment from 'moment';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-game4',
  templateUrl: './game4.page.html',
  styleUrls: ['./game4.page.scss'],
})
export class Game4Page implements OnInit {

  timeText: string;
  equation1 = '';
  equation2 = '';
  operators = ['+', '-', '*', '/'];
  number1: number;
  number2: number;
  split1: any;
  split2: any;
  result = 0;
  finalResult = '';
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;

  randomNumber1: number;
  randomNumber2: number;
  randomNumber3: number;
  randomOperatorFromArray1: number;
  randomOperatorFromArray2: number;

  seconds = 120;
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
  isMobile: boolean;

  language: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private dataOfGame: DataOfGameService, private dataOfUser: DataOfUserService,
    private dataAverageUser: DataAverageUserService,
    private platform: Platform, private translatePipe: TranslatePipe,
    private languageService: LanguageService) {
  }

  ngOnInit() {
    if(this.languageService.getLanguage() === 'hu'){
      this.language = 'hu';
    } else {
      this.language = 'en';
    }
    this.isMobile = this.platform.is('mobile');
  }

  onStart(){
    this.ended = false;
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.generateFirstEquation();
    this.generateSecondEquation();
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

  generateFirstEquation(){
    this.randomNumber1 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber2 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber3 = Math.floor(Math.random() * (9 - 1) + 1); //nehogy nullával kelljen osztani
    this.randomOperatorFromArray1 = Math.floor(Math.random() * (3 - 0) + 0);
    this.randomOperatorFromArray2 = Math.floor(Math.random() * (3 - 0) + 0);
    this.equation1 = '(' + this.randomNumber1 + this.operators[this.randomOperatorFromArray1] +
                            this.randomNumber2 + ')' + this.operators[this.randomOperatorFromArray2] + this.randomNumber3;
    this.split1 = this.equation1.split('',7);
  }

  generateSecondEquation(){
    this.randomNumber1 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber2 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber3 = Math.floor(Math.random() * (9 - 1) + 1); //nehogy nullával kelljen osztani
    this.randomOperatorFromArray1 = Math.floor(Math.random() * (3 - 0) + 0);
    this.randomOperatorFromArray2 = Math.floor(Math.random() * (3 - 0) + 0);
    this.equation2 = '(' + this.randomNumber1 + this.operators[this.randomOperatorFromArray1] +
                            this.randomNumber2 + ')' + this.operators[this.randomOperatorFromArray2] + this.randomNumber3;
    this.split2 = this.equation2.split('',7);
}

  checkValueOfFirstSplit(){
    let equationFirstHalf: number;
    switch(this.split1[2]){
      case '+':
        equationFirstHalf = Number(this.split1[1]) + Number(this.split1[3]);
        break;
      case '-':
        equationFirstHalf = Number(this.split1[1]) - Number(this.split1[3]);
        break;
      case '*':
        equationFirstHalf = Number(this.split1[1]) * Number(this.split1[3]);
        break;
      case '/':
        equationFirstHalf = Number(this.split1[1]) / Number(this.split1[3]);
        break;
    }
    switch(this.split1[5]){
      case '+':
        this.number1 = equationFirstHalf + Number(this.split1[6]);
        break;
      case '-':
        this.number1 = equationFirstHalf - Number(this.split1[6]);
        break;
      case '*':
        this.number1 = equationFirstHalf * Number(this.split1[6]);
        break;
      case '/':
        this.number1 = equationFirstHalf / Number(this.split1[6]);
        break;
    }
  }

  checkValueOfSecondSplit(){
    let equationFirstHalf: number;
    switch(this.split2[2]){
      case '+':
        equationFirstHalf = Number(this.split2[1]) + Number(this.split2[3]);
        break;
      case '-':
        equationFirstHalf = Number(this.split2[1]) - Number(this.split2[3]);
        break;
      case '*':
        equationFirstHalf = Number(this.split2[1]) * Number(this.split2[3]);
        break;
      case '/':
        equationFirstHalf = Number(this.split2[1]) / Number(this.split2[3]);
        break;
    }
    switch(this.split2[5]){
      case '+':
        this.number2 = equationFirstHalf + Number(this.split2[6]);
        break;
      case '-':
        this.number2 = equationFirstHalf - Number(this.split2[6]);
        break;
      case '*':
        this.number2 = equationFirstHalf * Number(this.split2[6]);
        break;
      case '/':
        this.number2 = equationFirstHalf / Number(this.split2[6]);
        break;
    }
  }

  onClicked(str: string){
    if(str === 'first'){
      this.checkValueOfFirstSplit();
      this.checkValueOfSecondSplit();
      this.checkPoint(this.number1);
    } else if (str === 'second') {
      this.checkValueOfFirstSplit();
      this.checkValueOfSecondSplit();
      this.checkPoint(this.number2);
    } else {
      this.checkValueOfFirstSplit();
      this.checkValueOfSecondSplit();
      this.checkPoint(this.number1, this.number2);
    }
  }

  checkPoint(paramNumber1: number, paramNumber2?: number){
    if(paramNumber1 === this.number1 && !paramNumber2){
      if (this.number1 > this.number2){
        this.result += 1;
      } else {
        this.result -= 1;
      }
    } else if (paramNumber1 === this.number2 && !paramNumber2){
      if (this.number1 < this.number2){
        this.result += 1;
      } else {
        this.result -= 1;
      }
    } else {
      if (paramNumber1 === paramNumber2){
        this.result += 1;
      } else {
        this.result -= 1;
      }
    }
    this.generateFirstEquation();
    this.generateSecondEquation();
  }

  async getDataOfAverageUser(){
    await this.dataAverageUser.getDataOfAverageUser('fourthgame').then(() => {
      this.playedGamesAverage = Number(localStorage.getItem('playedGamesAverage'))+1;
      this.sumScoreAverage = Number(localStorage.getItem('sumScoreAverage'))+this.result;
      this.averageScoreAverage = this.sumScoreAverage / this.playedGamesAverage;
    });
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('fourthgame').then(() => {
      this.playedGames = Number(localStorage.getItem('playedGames'))+1;
      this.sumScore = Number(localStorage.getItem('sumScore'))+this.result;
      this.averageScore = this.sumScore / this.playedGames;
      this.bestScore = Number(localStorage.getItem('bestScore'));
      if(this.bestScore < this.result || this.bestScore === 0){
        this.bestScore = this.result;
      }
    });
  }

  ionViewDidLeave(){
    this.ended = false;
    this.drawChart = false;
  }

  createIntervalText(interval: number[]) {
    return interval[0] + '-' + interval[1];
  }

  getAverageInterval(age: number) {
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
    this.getAverageInterval(this.userAge);
  }

  async end(){
    this.playing = false;
    this.ended = true;
    this.finalResult = 'You have got ' + this.result + ' points!';
    await this.getDataOfGames();
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('fourthgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFirestore.collection('Statistics').doc(this.average).collection('game').doc('fourthgame').update({
      playedGames: this.playedGamesAverage,
      sumScore: this.sumScoreAverage,
      averageScore: this.averageScoreAverage,
    });

    clearInterval(this.interval);
    localStorage.setItem('result', String(this.result));
    localStorage.setItem('averageScore', String(this.averageScoreAverage));
    this.drawChart = true;
  }

  goBack(){
    clearInterval(this.interval);
    this.seconds = 120;
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
