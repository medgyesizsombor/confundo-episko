import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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
  points = 0;
  finalResult = 0;

  randomNumber1: number;
  randomNumber2: number;
  randomNumber3: number;
  randomOperatorFromArray1: number;
  randomOperatorFromArray2: number;

  seconds = 5;
  playing = false;
  ended = false;
  interval;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth) {
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
        this.points += 1;
      } else {
        console.log('jó béna');
        this.points -= 1;
      }
    } else {
      if (this.number1 < this.number2){
        console.log('ögyi');
        this.points += 1;
      } else {
        console.log('jó béna');
        this.points -= 1;
      }
    }
    this.generateFirstEquation();
    this.generateSecondEquation();
  }

  end(){
    clearInterval(this.interval);
    this.playing = false;
    this.ended = true;
    this.finalResult = this.points;
  }
}
