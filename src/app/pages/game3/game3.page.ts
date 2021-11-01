import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';

@Component({
  selector: 'app-game3',
  templateUrl: './game3.page.html',
  styleUrls: ['./game3.page.scss'],
})
export class Game3Page implements OnInit {

  lbl1text: number;
  lbl2text: number;
  lbl3text: number;
  lbl4text: number;
  lbl5text: number;
  lbl6text: number;
  lbl7text: number;
  clickedlbl1text = false;
  clickedlbl2text = false;
  clickedlbl3text = false;
  clickedlbl4text = false;
  clickedlbl5text = false;
  clickedlbl6text = false;
  clickedlbl7text = false;
  clickCounter = 0;
  result = 0;


  turn = 0;
  numberArray = [0, 0, 0];
  timeText = '';
  seconds = 5;
  interval;
  smallest: boolean;
  playing = false;
  ended = false;
  finalResult: string;
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

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService, private dataAverageUser: DataAverageUserService){ }

  ngOnInit(){
  }

  start(){
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.changeNumber();
    this.startCountDownGame();
  }

  clicked() {
    this.changeNumber();
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

  clicklbl1() {
    this.clickCounter = this.clickCounter + 1;
    this.checkSmallest(this.lbl1text);
    this.clickedlbl1text = true;

  }

  clicklbl2() {
    this.checkSmallest(this.lbl2text);
    this.clickedlbl2text = true;
    this.clickCounter = this.clickCounter + 1;
  }

  clicklbl3() {
    this.checkSmallest(this.lbl3text);
    this.clickedlbl3text = true;
    this.clickCounter = this.clickCounter + 1;
  }

  clicklbl4() {
    this.clickCounter = this.clickCounter + 1;
    this.checkSmallest(this.lbl4text);
    this.clickedlbl4text = true;
  }

  clicklbl5() {
    this.clickCounter = this.clickCounter + 1;
    this.checkSmallest(this.lbl5text);
    this.clickedlbl5text = true;
  }

  clicklbl6() {
    this.clickCounter = this.clickCounter + 1;
    this.checkSmallest(this.lbl6text);
    this.clickedlbl6text = true;
  }

  clicklbl7() {
    this.clickCounter = this.clickCounter + 1;
    this.checkSmallest(this.lbl7text);
    this.clickedlbl7text = true;
  }

  changeNumber(){
    this.generateNumberWithoutDuplicate();
    console.log(this.clickCounter + 'KLIKK');
    console.log(this.numberArray + ' ASDASDASD');
    console.log(this.numberArray);
    console.log('----');

    this.lbl1text = this.numberArray[0];
    this.lbl2text = this.numberArray[1];
    this.lbl3text = this.numberArray[2];
    this.lbl4text = this.numberArray[3];
    this.lbl5text = this.numberArray[4];
    this.lbl6text = this.numberArray[5];
    this.lbl7text = this.numberArray[6];
  }

  generateNumberWithoutDuplicate(){
    const set = new Set(this.numberArray);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < this.numberArray.length; i++){
      if(set.has(this.numberArray[i])){ //ha benne van a halmazban a this.numberArray[i]
        for(let j = Math.floor(Math.random() * (20 - 1) + 1); j < 21; j++){  //random számot generál a j 1 - 20 között
          console.log(j + 'ASDASDASDASD');
          if(!set.has(j)){  //ha nincs benne a halmazban j
            this.numberArray[i] = j;
            set.add(j);
            break;
          }
        }
      } else {
        set.add(this.numberArray[i]);
      }
    }
  }

  increaseArray(){
    if ((this.numberArray.length < 7) && (this.turn % 3 === 0)) {  //minden harmadik menet, amíg kisebb a tömb 7-nél
      this.numberArray.length = this.numberArray.length + 1;
      this.numberArray[this.numberArray.length - 1] = Math.floor(Math.random() * (20 - 1) + 1);  //random generál egy számot
    }
  }

  checkSmallest(currentNumber){
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < this.numberArray.length; i++){
      if(currentNumber <= this.numberArray[i]){
        console.log('upsi');
        this.smallest = true;
      } else {
        console.log('mégse');
        this.smallest = false;
        this.endOfTurn();
        break;
      }
    }

    for (let i = 0; i < this.numberArray.length; i++){
      if(currentNumber === this.numberArray[i]){
        this.numberArray.splice(i, 1);
      }
    }

    console.log(this.numberArray + 'mostani');

    this.hasEnded();
  }

  hasEnded(){
    if(this.clickCounter === this.numberArray.length){
      this.endOfTurn();
    }
  }

  checkPoint(){
    if(this.smallest === true){
      this.result++;
    } else {
      this.result--;
    }
  }

  endOfTurn(){
    this.clickCounter = 0;
    this.checkPoint();
    console.log('VÉGE');
    this.clickedlbl1text = false;
    this.clickedlbl2text = false;
    this.clickedlbl3text = false;
    this.clickedlbl4text = false;
    this.clickedlbl5text = false;
    this.clickedlbl6text = false;
    this.clickedlbl7text = false;
    this.increaseArray();
    this.changeNumber();
    this.turnCounter();
  }

  turnCounter(){
    this.turn++;
    console.log('turn: ' + this.turn);

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
    localStorage.removeItem('playedGames');
    localStorage.removeItem('sumScore');
    localStorage.removeItem('bestScore');
    localStorage.removeItem('averageScore');
  }




}
