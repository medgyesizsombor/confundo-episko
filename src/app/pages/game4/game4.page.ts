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

  equation1 = '';
  equation2 = '';
  operators = ['+', '-', '*', '/'];
  number1: number;
  number2: number;
  split1: any;
  split2: any;

  randomNumber1: number;
  randomNumber2: number;
  randomOperatorFromArray: number;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.generateFirstEquation();
    this.generateSecondEquation();
    this.checkValueOfFirstSplit();
    this.checkValueOfSecondSplit();
    this.checkResult();
  }

  start(){

  }

  end(){

  }

  generateFirstEquation(){
    this.randomNumber1 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber2 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomOperatorFromArray = Math.floor(Math.random() * (3 - 0) + 0);
    this.equation1 = this.randomNumber1 + this.operators[this.randomOperatorFromArray] + this.randomNumber2;
    console.log(this.equation1);
    this.split1 = this.equation1.split('',3);
    console.log(this.split1);
  }

  generateSecondEquation(){
    this.randomNumber1 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomNumber2 = Math.floor(Math.random() * (9 - 0) + 0);
    this.randomOperatorFromArray = Math.floor(Math.random() * (3 - 0) + 0);
    this.equation2 = this.randomNumber1 + this.operators[this.randomOperatorFromArray] + this.randomNumber2;
    console.log(this.equation2);
    this.split2 = this.equation2.split('',3);
    console.log(this.split2);
}

  checkValueOfFirstSplit(){
    switch(this.split1[1]){
      case '+':
        this.number1 = Number(this.split1[0]) + Number(this.split1[2]);
        console.log(this.number1 + 'EZ A ASZÁM');
        break;
      case '-':
        this.number1 = Number(this.split1[0]) - Number(this.split1[2]);
        console.log(this.number1 + 'EZ A ASZÁM');
        break;
      case '*':
        this.number1 = Number(this.split1[0]) * Number(this.split1[2]);
        console.log(this.number1 + 'EZ A ASZÁM');
        break;
      case '/':
        this.number1 = Number(this.split1[0]) / Number(this.split1[2]);
        console.log(this.number1 + 'EZ A ASZÁM');
        break;
    }
  }

  checkValueOfSecondSplit(){
    switch(this.split2[1]){
      case '+':
        this.number2 = Number(this.split2[0]) + Number(this.split2[2]);
        console.log(this.number2 + 'EZ A ASZÁM2');
        break;
      case '-':
        this.number2 = Number(this.split2[0]) - Number(this.split2[2]);
        console.log(this.number2 + 'EZ A ASZÁM2');
        break;
      case '*':
        this.number2 = Number(this.split2[0]) * Number(this.split2[2]);
        console.log(this.number2 + 'EZ A ASZÁM2');
        break;
      case '/':
        this.number2 = Number(this.split2[0]) / Number(this.split2[2]);
        console.log(this.number2 + 'EZ A ASZÁM2');
        break;
    }
  }

  checkResult(){
    if (this.number2 > this.number1){
      console.log('JÜÜÜÜÜÜÜÜÜÜÜ');
    } else {
      console.log('húhúhúhú');
    }
  }
}
