import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';

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

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private dataOfGame: DataOfGameService, private dataOfUser: DataOfUserService,
    private dataAverageUser: DataAverageUserService) {
  }

  ngOnInit() {
  }

  onStart(){
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
    console.log(this.equation1);
    this.split1 = this.equation1.split('',7);
    console.log(this.split1);
  }

  generateSecondEquation(){
    this.randomNumber1 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber2 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber3 = Math.floor(Math.random() * (9 - 1) + 1); //nehogy nullával kelljen osztani
    this.randomOperatorFromArray1 = Math.floor(Math.random() * (3 - 0) + 0);
    this.randomOperatorFromArray2 = Math.floor(Math.random() * (3 - 0) + 0);
    this.equation2 = '(' + this.randomNumber1 + this.operators[this.randomOperatorFromArray1] +
                            this.randomNumber2 + ')' + this.operators[this.randomOperatorFromArray2] + this.randomNumber3;
    console.log(this.equation2);
    this.split2 = this.equation2.split('',7);
    console.log(this.split2);
}

  checkValueOfFirstSplit(){
    let equationFirstHalf: number;
    switch(this.split1[2]){
      case '+':
        equationFirstHalf = Number(this.split1[1]) + Number(this.split1[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
      case '-':
        equationFirstHalf = Number(this.split1[1]) - Number(this.split1[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
      case '*':
        equationFirstHalf = Number(this.split1[1]) * Number(this.split1[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
      case '/':
        equationFirstHalf = Number(this.split1[1]) / Number(this.split1[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
    }
    switch(this.split1[5]){
      case '+':
        this.number1 = equationFirstHalf + Number(this.split1[6]);
        console.log(this.number1 + 'EZ A VÉGE');
        break;
      case '-':
        this.number1 = equationFirstHalf - Number(this.split1[6]);
        console.log(this.number1 + 'EZ A VÉGE');
        break;
      case '*':
        this.number1 = equationFirstHalf * Number(this.split1[6]);
        console.log(this.number1 + 'EZ A VÉGE');
        break;
      case '/':
        this.number1 = equationFirstHalf / Number(this.split1[6]);
        console.log(this.number1 + 'EZ A VÉGE');
        break;
    }
  }

  checkValueOfSecondSplit(){
    let equationFirstHalf: number;
    switch(this.split2[2]){
      case '+':
        equationFirstHalf = Number(this.split2[1]) + Number(this.split2[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
      case '-':
        equationFirstHalf = Number(this.split2[1]) - Number(this.split2[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
      case '*':
        equationFirstHalf = Number(this.split2[1]) * Number(this.split2[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
      case '/':
        equationFirstHalf = Number(this.split2[1]) / Number(this.split2[3]);
        console.log(equationFirstHalf + 'EZ A ASZÁM');
        break;
    }
    switch(this.split2[5]){
      case '+':
        this.number2 = equationFirstHalf + Number(this.split2[6]);
        console.log(this.number2 + 'EZ A VÉGE A KETTESNEK');
        break;
      case '-':
        this.number2 = equationFirstHalf - Number(this.split2[6]);
        console.log(this.number2 + 'EZ A VÉGE A KETTESNEK');
        break;
      case '*':
        this.number2 = equationFirstHalf * Number(this.split2[6]);
        console.log(this.number2 + 'EZ A VÉGE A KETTESNEK');
        break;
      case '/':
        this.number2 = equationFirstHalf / Number(this.split2[6]);
        console.log(this.number2 + 'EZ A VÉGE A KETTESNEK');
        break;
    }
  }

  onClicked(str: string){
    if(str === 'first'){
      this.checkValueOfFirstSplit();
      this.checkValueOfSecondSplit();
      this.checkPoint(this.number1);
    } else {
      this.checkValueOfFirstSplit();
      this.checkValueOfSecondSplit();
      this.checkPoint(this.number2);
    }
  }

  checkPoint(paramNumber: number){
    if(paramNumber === this.number1){
      if (this.number1 > this.number2){
        console.log('ögyi');
        this.result += 1;
        console.log(this.result);
      } else {
        console.log('jó béna');
        this.result -= 1;
        console.log(this.result);
      }
    } else {
      if (this.number1 < this.number2){
        console.log('ögyi');
        this.result += 1;
        console.log(this.result);
      } else {
        console.log('jó béna');
        this.result -= 1;
        console.log(this.result);
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
}
