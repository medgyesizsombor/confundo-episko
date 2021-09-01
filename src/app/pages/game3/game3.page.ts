import { Component, OnInit } from '@angular/core';

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
  turn = 0;
  numberArray = [1, 2, 3];

  playing = false;

  constructor(){ }

  ngOnInit(){
  }

  start(){
    this.playing = true;
  }

  rightButton($event) {
    this.changeNumber();
  }

  changeNumber(){
    this.turnCount();
    for(let i = 0; i < this.numberArray.length; i++){
      this.numberArray[i] = Math.floor(Math.random() * (20 - 0) + 0);
    }
    console.log(this.numberArray);
    if ((this.numberArray.length < 7) && (this.turn % 3 === 0)) {
      this.numberArray.length = this.numberArray.length + 1;
    }
    this.numberArray[this.numberArray.length - 1] = Math.floor(Math.random() * (20 - 0) + 0);
    console.log(this.numberArray.length);
    console.log('----');

    this.lbl1text = this.numberArray[0];
    this.lbl2text = this.numberArray[1];
    this.lbl3text = this.numberArray[2];
    this.lbl4text = this.numberArray[3];
    this.lbl5text = this.numberArray[4];
    this.lbl6text = this.numberArray[5];
    this.lbl7text = this.numberArray[6];
  }

  endOfTurn(){

  }

  turnCount(){
    this.turn++;
    console.log('turn: ' + this.turn);
  }




}
