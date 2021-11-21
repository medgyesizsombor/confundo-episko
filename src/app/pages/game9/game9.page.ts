import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';

@Component({
  selector: 'app-game9',
  templateUrl: './game9.page.html',
  styleUrls: ['./game9.page.scss'],
})
export class Game9Page implements OnInit {
  memoryItems: any[] = ['heart', 'airplane', 'cart', 'fish'];
  memory: any[];
  result = 0;
  firstFlipped: any;
  waiting = false;
  playing = false;
  interval: any;
  timeText = '0 sec';
  seconds = 120;
  finalResult = '';

  globalId = 0;
  ended = false;

  uid = localStorage.getItem('uid');
  average = '';

  userBirthdate: any;
  userAge: number;
  today = moment(Date.now());

  playedGamesAverage = 0;
  sumScoreAverage = 0;
  averageScoreAverage = 0;
  drawChart = false;

  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;

  constructor(public alertController: AlertController, private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private dataOfGame: DataOfGameService, private dataOfUser: DataOfUserService,
    private dataAverageUser: DataAverageUserService) {}

  ngOnInit() {}

  startGame() {
    this.timeText = this.seconds + ' sec';
    this.playing = true;
    this.generateMemoryCard();
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

  generateMemoryCard() {
    this.globalId = 0;
    const items = [...this.generateItems(), ...this.generateItems()]; //lemásolni az értékeket
    this.memory = items;
  }

  generateItems(): any[] {
    const copyItems = [...this.memoryItems];
    const items: any[] = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.memoryItems.length; i++) {
      const copyItemsIndex = Math.floor(Math.random() * copyItems.length);
      const itemId = this.memoryItems.indexOf(copyItems[copyItemsIndex]);
      items.push({
        id: itemId,
        gId: this.globalId,
        show: false,
        matched: false,
        item: copyItems[copyItemsIndex],
        color: '',
      });
      copyItems.splice(copyItemsIndex, 1);
      this.globalId += 1;
    }
    return items;
  }

  clicked(item: any, index: number) {
    if (this.waiting) {
      // forog a kartya
      return;
    }

    item.show = true;
    if (this.firstFlipped) {
      // már van egy felfordított, ilyenkor jön a 2. felfordított
      if (this.firstFlipped.id === item.id) {
        // ugyanaz az id-jük a kártyáknak
        if (this.firstFlipped.gId !== item.gId) {
          //nem egyezik meg a globalIdjük
          this.result++;
          this.waiting = true;
          item.color = 'success';
          this.firstFlipped.color = 'success';
          setTimeout(() => {
            this.firstFlipped.matched = true;
            item.matched = true;
            this.firstFlipped = undefined;
            this.waiting = false;

            if (this.allMatched()) {
              this.globalId = 0;
              this.generateMemoryCard();
            }
          }, 750);
        }
      } else {
        // mas kartya van felforditva
        this.waiting = true;
        item.color = 'danger';
        this.firstFlipped.color = 'danger';
        setTimeout(() => {
          item.color = '';
          this.firstFlipped.color = '';
          this.firstFlipped.show = false;
          this.firstFlipped = undefined;
          item.show = false;
          this.waiting = false;
        }, 750);
      }
    } else {
      // ha nics felfordított, akkor ITEM az első feldordított
      this.firstFlipped = item;
    }
  }

  allMatched() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.memory.length; i++) {
      if (!this.memory[i].matched) {
        return false;
      }
    }

    return true;
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('ninthgame').then(() => {
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
    await this.dataAverageUser.getDataOfAverageUser('ninthgame').then(() => {
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
    this.finalResult = 'Your final result is ' + this.result;
    await this.getDataOfGames();
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('ninthgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });

    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFirestore.collection('Statistics').doc(this.average).collection('game').doc('ninthgame').update({
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
