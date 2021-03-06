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
  selector: 'app-game5',
  templateUrl: './game5.page.html',
  styleUrls: ['./game5.page.scss'],
})
export class Game5Page implements OnInit {

  timeText: string;
  title1= 'Is the number even?';
  title2= 'Is the letter vowel?';
  label1: string;
  label2: string;
  result = 0;
  finalResult = '';
  textLocation: number;
  isVowel: boolean;
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;

  randomNumber: number;
  randomLetter: string;
  vowel= ['A', 'E', 'I', 'O', 'U'];

  seconds = 110;
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
    private dataAverageUser: DataAverageUserService, private platform: Platform,
    private translatePipe: TranslatePipe, private languageService: LanguageService) {
  }

  ngOnInit() {
    if(this.languageService.getLanguage() === 'hu'){
      this.language = 'hu';
    } else {
      this.language = 'en';
    }
    this.isMobile = this.platform.is('mobile');
  }

  ionViewDidLeave(){
    this.ended = false;
    this.drawChart = false;
  }

  onStart(){
    this.ended = false;
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.generateLabel();
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

  generateLabel(){
    this.randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
    const randomLetterNumber = Math.floor(Math.random() * (26 - 1) + 1);
    this.randomLetter = (randomLetterNumber + 9).toString(36).toUpperCase(); //a 36-os sz??mrendszerben a 10-es a, 11-es b, stb.
    this.letterAndNumberPosition();
  }

  letterAndNumberPosition(){
    this.textLocation = Math.floor(Math.random() * (3 - 0) + 0);
    switch(this.textLocation){
      case 0:   //Ha null??t kap, az els?? labelben a sz??m el??remegy, mell?? a bet??
        this.label1 = this.randomNumber.toString() + this.randomLetter;
        break;
      case 1:   //Ha egyet kap, az els?? labelben a bet?? el??remegy, mell?? a sz??m
        this.label1 = this.randomLetter + this.randomNumber.toString();
        break;
      case 2:   //Ha kett??t kap, a m??sodik labelben a sz??m el??remegy, mell?? a bet??
        this.label2 = this.randomNumber.toString() + this.randomLetter;
        break;
      case 3:   //Ha h??rmat kap, a m??sodik labelben a bet?? el??remegy, mell?? a sz??m
        this.label2 = this.randomLetter + this.randomNumber.toString();
        break;
    }
  }

  clicked(str: string){
    if(str === 'true'){
      this.checkPoint('true');
    } else {
      this.checkPoint('false');
    }
    this.label1 = null;
    this.label2 = null;
    this.generateLabel();

  }

  checkPoint(str: string){
    switch(str){
      case 'true':
        if(this.textLocation === 0 || this.textLocation === 1){
          if(this.randomNumber % 2 !== 0){
            this.result--;
          } else {
            this.result++;
          }
        } else {
          this.checkVowel(this.randomLetter);
          if(this.isVowel === true){
            this.result++;
          } else {
            this.result--;
          }
        }
        break;
      case 'false':
        if(this.textLocation === 0 || this.textLocation === 1){
          if(this.randomNumber % 2 !== 0){
            this.result++;
          } else {
            this.result--;
          }
        } else {
          this.checkVowel(this.randomLetter);
          if(this.isVowel !== true){
            this.result++;
          } else {
            this.result--;
          }
        }
        break;
    }

  }

  checkVowel(str: string){
    for (const i of this.vowel){
      if(str === i){
        this.isVowel = true;
        break;
      } else{
        this.isVowel = false;
      }
    }
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('fifthgame').then(() => {
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
    await this.dataAverageUser.getDataOfAverageUser('fifthgame').then(() => {
      this.playedGamesAverage = Number(localStorage.getItem('playedGamesAverage'))+1;
      this.sumScoreAverage = Number(localStorage.getItem('sumScoreAverage'))+this.result;
      this.averageScoreAverage = this.sumScoreAverage / this.playedGamesAverage;
    });
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
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('fifthgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFirestore.collection('Statistics').doc(this.average).collection('game').doc('fifthgame').update({
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
    this.seconds = 110;
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
