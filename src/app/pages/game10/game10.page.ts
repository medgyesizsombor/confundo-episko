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
  selector: 'app-game10',
  templateUrl: './game10.page.html',
  styleUrls: ['./game10.page.scss'],
})
export class Game10Page implements OnInit {
  generatedGrids = [];
  timeText = '';
  timeText2 = '';
  seconds = 120;
  playing = false;
  generatedIndexes = [];
  generatedSortedIndexes = [];
  clickedItems = [];
  ended = false;
  interval: any;
  intervalTurn: any;
  result = 0;
  isInTheArray: boolean;

  finalResult = '';
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
  waiting: boolean;

  isMobile: boolean;
  language: string;

  constructor(
    private angularFireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService,
    private dataAverageUser: DataAverageUserService,
    private router: Router,
    private platform: Platform,
    private translatePipe: TranslatePipe,
    private languageService: LanguageService
  ) {}

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

  start() {
    this.ended = false;
    this.generatedIndexes = this.generateIndexes();
    this.generatedSortedIndexes = this.sort(this.copy(this.generatedIndexes));
    this.generatedGrids = this.generateGrid(this.generatedIndexes);
    console.log(this.generatedGrids);
    this.startCountDownGame();
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.showAndHideSelecteds(2000, 1000);
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

  startCountDownTurn() {
    this.intervalTurn = setInterval(() => {
      this.timeText2 = this.seconds + ' sec';
    }, 1000);
  }

  generateIndexes() {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const selectedIndexes = [];
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * nums.length);
      selectedIndexes.push(nums[index]);
      nums.splice(index, 1);
    }
    return selectedIndexes;
  }

  copy(arr: any[]) {
    const c = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      c.push(arr[i]);
    }
    return c;
  }

  sort(numbers: number[]) {
    // eslint-disable-next-line arrow-body-style
    return numbers.sort((a, b) => {
      return a - b;
    });
  }

  generateGrid(selectedIndexes: number[]) {
    const gridItems = [];
    for (let i = 0; i < 12; i++) {
      const item = {
        num: i,
        show: false,
        selected: false,
        colour: 'primary',
        clicked: false
      };
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      if (selectedIndexes.includes(i)) {
        item.selected = true;
      }
      gridItems.push(item);
    }
    console.log(gridItems);
    return gridItems;
  }

  clickOnItem(item: any, index: number) {
    if (this.waiting) {
      return;
    }

    if (this.clickedItems.length < this.generatedSortedIndexes.length) {
      if (this.checkTile(index) === true) {
        item.colour = 'success';
        item.show = true;
        this.clickedItems.push(index);
        if (this.clickedItems.length === this.generatedSortedIndexes.length) {
          this.checkPoint(this.clickedItems);
        }
      } else {
        this.result--;
        this.errorAll();
        setTimeout(() => {
          this.nextTurn(1000);
        }, 1000);
      }
    } else {
      this.result--;
        this.errorAll();
        setTimeout(() => {
          this.nextTurn(1000);
        }, 1000);
    }

    console.log(this.generatedGrids);
  }

  getSelectedGrids() {
    return this.generatedGrids.filter(item => item.selected === true);
  }

  getSelectedNumbers() {
    const numbers = [];
    const selecteds = this.getSelectedGrids();
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < selecteds.length; i++) {
      numbers.push(selecteds[i].num);
    }
    return numbers;
  }

  checkTile(num: number) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.generatedSortedIndexes.length; i++) {
      if (num === this.generatedSortedIndexes[i]) {
        this.isInTheArray = true;
        console.log('good');
        return this.isInTheArray;
      } else {
        console.log('jajaj');
        this.isInTheArray = false;
      }
    }
  }

  checkPoint(clickedItems: number[]) {
    const clickedSortedItems = this.sort(this.copy(clickedItems));
    const idx = clickedSortedItems.length - 1;
    console.log(clickedSortedItems);
    console.log(this.generatedSortedIndexes);
    if (clickedSortedItems[idx] === this.generatedSortedIndexes[idx]) {
      this.result++;
      this.nextTurn(1000);
    } else {
      this.result--;
      this.nextTurn(1000);
    }
  }

  showAndHideSelecteds(timeout: number, memoryTimeout?: number) {
    this.waiting = true;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.generatedGrids.length; i++) {
      if (this.generatedGrids[i].selected) {
        this.generatedGrids[i].show = true;
      }
    }

    console.log('WAITING');
    this.inactivateAll();
    setTimeout(() => {
      this.hideAll();
      if (memoryTimeout) {
        console.log('MEMORIYWAITNG');
        setTimeout(() => {
          console.log('LESSGO');
          this.activateAll();
          this.waiting = false;
        }, memoryTimeout);
      } else {
        this.activateAll();
        this.waiting = false;
      }
    }, timeout);
  }

  hideAll() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.generatedGrids.length; i++) {
      this.generatedGrids[i].show = false;
    }
  }

  nextRound() {
    this.start();
  }

  inactivateAll() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.generatedGrids.length; i++) {
      this.generatedGrids[i].colour = 'medium';
    }
  }

  errorAll() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.generatedGrids.length; i++) {
      this.generatedGrids[i].colour = 'danger';
    }
  }

  activateAll() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.generatedGrids.length; i++) {
      this.generatedGrids[i].colour = 'primary';
    }
  }

  nextTurn(millis: number = 1000) {
    setTimeout(() => {
      this.clickedItems = [];
      this.generatedIndexes = this.generateIndexes();
      this.generatedSortedIndexes = this.sort(this.copy(this.generatedIndexes));
      this.generatedGrids = this.generateGrid(this.generatedSortedIndexes);
      this.showAndHideSelecteds(2000);
      console.log(this.generatedGrids);
    }, millis);
  }
  async getDataOfGames() {
    await this.dataOfGame.getDataOfGames('tenthgame').then(() => {
      this.playedGames = Number(localStorage.getItem('playedGames')) + 1;
      this.sumScore = Number(localStorage.getItem('sumScore')) + this.result;
      this.averageScore = this.sumScore / this.playedGames;
      this.bestScore = Number(localStorage.getItem('bestScore'));
      if (this.bestScore < this.result || this.bestScore === 0) {
        this.bestScore = this.result;
      }
      console.log(this.playedGames + 'playedGames');
      console.log(this.sumScore + 'sumScore');
      console.log(this.averageScore + 'average');
      console.log(this.bestScore);
    });
  }

  async getDataOfAverageUser() {
    await this.dataAverageUser.getDataOfAverageUser('tenthgame').then(() => {
      this.playedGamesAverage =
        Number(localStorage.getItem('playedGamesAverage')) + 1;
      this.sumScoreAverage =
        Number(localStorage.getItem('sumScoreAverage')) + this.result;
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
      [95, 99],
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

  async getDataOfUser() {
    await this.dataOfUser.getDataOfUser().then(() => {
      this.userBirthdate = localStorage.getItem('birthdate');
    });

    const diff = moment.duration(this.today.diff(this.userBirthdate));
    this.userAge = Number(diff.years());
    this.getAverageInterval(this.userAge);
  }

  async end() {
    this.ended = true;
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    await this.getDataOfGames();
    this.angularFireStore
      .collection('Users')
      .doc(this.uid)
      .collection('game')
      .doc('tenthgame')
      .update({
        playedGames: this.playedGames,
        sumScore: this.sumScore,
        bestScore: this.bestScore,
        averageScore: this.averageScore,
      });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFireStore
      .collection('Statistics')
      .doc(this.average)
      .collection('game')
      .doc('tenthgame')
      .update({
        playedGames: this.playedGamesAverage,
        sumScore: this.sumScoreAverage,
        averageScore: this.averageScoreAverage,
      });

    clearInterval(this.interval);
    clearInterval(this.intervalTurn);
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
