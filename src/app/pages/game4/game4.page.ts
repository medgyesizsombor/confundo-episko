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
  randomNumber3: number;
  randomOperatorFromArray1: number;
  randomOperatorFromArray2: number;

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
    this.randomNumber1 = Math.floor(Math.random() * (9 - 1) + 1);
    this.randomNumber2 = Math.floor(Math.random() * (9 - 1) + 1);
    this.randomNumber3 = Math.floor(Math.random() * (9 - 1) + 1);
    this.randomOperatorFromArray1 = Math.floor(Math.random() * (3 - 0) + 0);
    this.randomOperatorFromArray2 = Math.floor(Math.random() * (3 - 0) + 0);
    this.equation1 = '(3-3)/3';
    //this.equation1 = '(' + this.randomNumber1 + this.operators[this.randomOperatorFromArray1] +
    //                        this.randomNumber2 + ')' + this.operators[this.randomOperatorFromArray2] + this.randomNumber3;
    console.log(this.equation1);
    this.split1 = this.equation1.split('',7);
    console.log(this.split1);
  }

  generateSecondEquation(){
    this.randomNumber1 = Math.floor(Math.random() * (9 - 1) + 1);
    this.randomNumber2 = Math.floor(Math.random() * (9 - 1) + 1);
    this.randomNumber3 = Math.floor(Math.random() * (9 - 1) + 1);
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

  checkResult(){
    if (this.number2 > this.number1){
      console.log('JÜÜÜÜÜÜÜÜÜÜÜ');
    } else {
      console.log('húhúhúhú');
    }
  }
}
