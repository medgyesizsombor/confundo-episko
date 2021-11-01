import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import * as moment from 'moment';


@Component({
  selector: 'app-colourgame',
  templateUrl: './colourgame.page.html',
  styleUrls: ['./colourgame.page.scss'],
})
export class ColourgamePage implements OnInit {

  lbl1text: string;
  lbl2text: string;
  lbl1color: string;
  lbl2color: string;
  result = 0;
  finalResult: string;
  seconds = 2;
  timeText: string;
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;
  interval: any;
  playing = false;
  ended = false;

  uid = localStorage.getItem('uid');
  average = '';

  userBirthdate: any;
  userAge: number;
  today = moment(Date.now());

  playedGamesAverage = 0;
  sumScoreAverage = 0;
  averageScoreAverage = 0;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService, private dataAverageUser: DataAverageUserService) {
  }

  ngOnInit() {
  }

  start() {
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.startCountDown();
    this.giveValueOfLabels();
  }

  giveValueOfLabels() {
    const colours = ['red', 'yellow', 'blue', 'brown', 'green', 'violet', 'black', 'pink'];
    const randomNumber1 = Math.floor(Math.random() * (7 - 0) + 0);
    const randomNumber2 = Math.floor(Math.random() * (7 - 0) + 0);
    const randomNumber3 = Math.floor(Math.random() * (7 - 0) + 0);
    const randomNumber4 = Math.floor(Math.random() * (7 - 0) + 0);

    if (Math.random() <= 0.5) {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber3];
      this.lbl1color = colours[randomNumber2];
      this.lbl2color = colours[randomNumber1];
    } else {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber2];
      this.lbl1color = colours[randomNumber3];
      this.lbl2color = colours[randomNumber4];
    }
  }

  rightButton($event: PointerEvent) {
    if (this.lbl1text === this.lbl2color) {
      this.result = this.result + 1;
      this.giveValueOfLabels();
    } else {
      this.giveValueOfLabels();
    }
  }

  leftButton($event: PointerEvent) {
    if (this.lbl1text !== this.lbl2color) {
      this.result = this.result + 1;
      this.giveValueOfLabels();
    } else {
      this.giveValueOfLabels();
    }
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

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('colourgame').then(() => {
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
    await this.dataAverageUser.getDataOfAverageUser('colourgame').then(() => {
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
    /*valami.then(res => {

    }).catch(err => {

    })

    try {
      let res = await valami();
    } catch (err) {

    }*/
    this.lbl1text = null;
    this.lbl2text = null;
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    this.ended = true;
    await this.getDataOfGames();
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('colourgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });
    await this.getDataOfUser();
    await this.getDataOfAverageUser();
    this.angularFirestore.collection('Statistics').doc(this.average).collection('game').doc('colourgame').update({
      playedGames: this.playedGamesAverage,
      sumScore: this.sumScoreAverage,
      averageScore: this.averageScoreAverage,
    });

    localStorage.removeItem('playedGames');
    localStorage.removeItem('sumScore');
    localStorage.removeItem('bestScore');
    localStorage.removeItem('averageScore');
    clearInterval(this.interval);
  }
}
