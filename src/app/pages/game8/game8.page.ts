import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-game8',
  templateUrl: './game8.page.html',
  styleUrls: ['./game8.page.scss'],
})
export class Game8Page implements OnInit {

  timeText: string;
  title= '';
  titleHUN= '';
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
  directionsHUN = ['Fel', 'Le', 'Jobbra', 'Balra'];

  seconds = 10;
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

  language = '';
  isMobile: boolean;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private dataOfGame: DataOfGameService, private dataOfUser: DataOfUserService,
    private dataAverageUser: DataAverageUserService, private platform: Platform,
    private languageService: LanguageService) {
  }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
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
          if(this.languageService.getLanguage() === 'hu'){
            this.titleHUN = this.directionsHUN[0];
          }
          this.title = this.directions[0];
          break;
        case 1:
          if(this.languageService.getLanguage() === 'hu'){
            this.titleHUN = this.directionsHUN[1];
          }
          this.title = this.directions[1];
          break;
        case 2:
          if(this.languageService.getLanguage() === 'hu'){
            this.titleHUN = this.directionsHUN[2];
          }
          this.title = this.directions[2];
          break;
        case 3:
          if(this.languageService.getLanguage() === 'hu'){
            this.titleHUN = this.directionsHUN[3];
          }
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
    this.titleHUN = '';
    this.title = '';
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

  goBack(){
    clearInterval(this.interval);
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
