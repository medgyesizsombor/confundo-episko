import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-game3',
  templateUrl: './game3.page.html',
  styleUrls: ['./game3.page.scss'],
})
export class Game3Page implements OnInit {
  round = 1;
  numOfGenNumbers = 3;
  selectedNumbers = [];
  selectedSorted = [];
  clickedItems = [];
  result = 0;
  timeText = '';
  seconds = 5;
  interval: any;
  playing = false;
  ended = false;
  finalResult= '';
  playedGames: number;
  sumScore: number;
  averageScore: number;
  bestScore: number;

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

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService, private dataAverageUser: DataAverageUserService,
    private router: Router, private platform: Platform, private translatePipe: TranslatePipe,
    private languageService: LanguageService){ }

  ngOnInit(){
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

  start(){
    this.ended = false;
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.selectedNumbers = this.generateNumbers(this.numOfGenNumbers);
    this.selectedSorted = this.sort(this.copy(this.selectedNumbers));
    this.startCountDownGame();
  }

  startCountDownGame() {
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

  sort(numbers: number[]) {
    // eslint-disable-next-line arrow-body-style
    return numbers.sort((a, b) => {
      return a - b;
    });
  }

  copy(arr: any[]) {
    const c = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      c.push(arr[i]);
    }
    return c;
  }

  generateNumbers(num: number) {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const selectedNumbers = [];
    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * nums.length);
      selectedNumbers.push(nums[index]);
      nums.splice(index, 1);
    }
    return selectedNumbers;
  }

  clickOnItem(num: number, index: number) {
    setTimeout(() => {
      this.clickedItems.push(num);
      const idx = this.clickedItems.length - 1;
      if (this.clickedItems[idx] === this.selectedSorted[idx]) {
        this.result++;
        console.log(this.result);
        if (this.clickedItems.length === this.selectedNumbers.length) {
          console.log('ALL GOOD');
          this.nextRound();
        }
      } else {
        this.result = this.result - this.selectedNumbers.length;
        console.log(this.result);
        console.log('NO GOOD');
        this.nextRound();
      }
    }, 250);
  }

  nextRound() {
    this.round++;

    if (this.round % 3 === 0 && this.selectedNumbers.length < 5) {
      this.numOfGenNumbers++;
    }

    this.selectedNumbers = this.generateNumbers(this.numOfGenNumbers);
    this.selectedSorted = this.sort(this.copy(this.selectedNumbers));
    this.clickedItems = [];
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('thirdgame').then(() => {
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
    await this.dataAverageUser.getDataOfAverageUser('thirdgame').then(() => {
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
    this.ended = true;
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    await this.getDataOfGames();
    this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc('thirdgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFireStore.collection('Statistics').doc(this.average).collection('game').doc('thirdgame').update({
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
