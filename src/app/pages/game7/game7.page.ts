import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';

@Component({
  selector: 'app-game7',
  templateUrl: './game7.page.html',
  styleUrls: ['./game7.page.scss'],
})
export class Game7Page implements OnInit {

  timeText: string;
  equation1 = '';
  operators = ['+', '-'];
  number1: number;
  number2: number;
  createdNumber: string;
  number3: number;
  currentNumber: string = null;
  split1: any;
  result = 0;
  finalResult = 0;
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;

  randomNumber1: number;
  randomNumber2: number;
  randomNumber3: number;
  randomOperatorFromArray1: number;
  randomOperatorFromArray2: number;

  seconds = 20;
  playing = false;
  ended = false;
  interval: any;
  uid = localStorage.getItem('uid');

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private dataOfGame: DataOfGameService) {
  }

  ngOnInit() {
  }

  onStart(){
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.generateFirstEquation();
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
    this.randomNumber2 = Math.floor(Math.random() * (20 - -20) + -20);
    this.randomOperatorFromArray1 = Math.floor(Math.random() * (1 - 0) + 0);
    this.equation1 = this.randomNumber1 + this.operators[this.randomOperatorFromArray1] + 'X' + '=' + this.randomNumber2;
    console.log(this.equation1);
    if(this.equation1.length === 5){
      this.split1 = this.equation1.split('',5);
    } else if (this.equation1.length === 6){
      this.split1 = this.equation1.split('',6);
      this.randomNumber2 = Number(this.split1[4] + this.split1[5]);
    } else {
      this.split1 = this.equation1.split('', 7);
      this.randomNumber2 = Number(this.split1[4] + this.split1[5] + this.split1[6]);
    }
    console.log(this.split1);
    this.checkValueOfFirstSplit();
  }

  checkValueOfFirstSplit(){
    switch(this.split1[1]){
      case '+':
        this.number3 = this.randomNumber2 - this.randomNumber1;
        console.log(this.number3 + 'EZ A SZÁM');
        break;
      case '-':
        this.number3 = (this.randomNumber2 * -1) + this.randomNumber1;
        console.log(this.number3 + 'EZ A SZÁM');
        break;
    }
  }

  clickedOk(num: number){
    if(Number(num) === this.number3){
      this.result++;
    } else {
      this.result--;
    }
    this.currentNumber = null;
    this.generateFirstEquation();
  }

  addNumber(num: string){
    if(this.currentNumber === null){
      this.currentNumber = num;
    } else {
      this.currentNumber = this.currentNumber + num;
    }
    console.log(this.currentNumber);
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('seventhgame').then(() => {
      this.playedGames = Number(localStorage.getItem('playedGames'))+1;
      this.sumScore = Number(localStorage.getItem('sumScore'))+this.result;
      this.averageScore = this.sumScore / this.playedGames;
      this.bestScore = Number(localStorage.getItem('bestScore'));
      if(this.bestScore < this.result || this.bestScore === 0){
        this.bestScore = this.result;
      }
    });
  }

  async end(){
    this.playing = false;
    this.ended = true;
    this.finalResult = this.result;
    await this.getDataOfGames();
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('seventhgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });
    console.log(this.bestScore);
    console.log(this.playedGames);
    console.log(this.sumScore);
    console.log(this.averageScore);
    clearInterval(this.interval);
    localStorage.removeItem('playedGames');
    localStorage.removeItem('sumScore');
    localStorage.removeItem('bestScore');
    localStorage.removeItem('averageScore');
  }
}
