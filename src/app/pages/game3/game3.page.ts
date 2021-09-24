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
  clickedlbl1text = false;
  clickedlbl2text = false;
  clickedlbl3text = false;
  clickedlbl4text = false;
  clickedlbl5text = false;
  clickedlbl6text = false;
  clickedlbl7text = false;
  clickCounter = 0;

  turn = 0;
  numberArray = [0, 0, 0];
  timetext = 120;

  playing = false;

  constructor(){ }

  ngOnInit(){
  }

  start(){
    this.playing = true;
    this.changeNumber();
  }

  clicked() {
    this.changeNumber();
  }

  clicklbl1() {
    this.clickCounter = this.clickCounter + 1;
    this.checkPoint(this.lbl1text);
    this.clickedlbl1text = true;
    this.numberArray[0] = 100;
    this.hasEnded();

  }

  clicklbl2() {
    this.checkPoint(this.lbl2text);
    this.clickedlbl2text = true;
    this.clickCounter = this.clickCounter + 1;
    this.numberArray[1] = 100;
    this.hasEnded();
  }

  clicklbl3() {
    this.checkPoint(this.lbl3text);
    this.clickedlbl3text = true;
    this.clickCounter = this.clickCounter + 1;
    this.numberArray[2] = 100;
    this.hasEnded();
  }

  clicklbl4() {
    this.clickCounter = this.clickCounter + 1;
    this.checkPoint(this.lbl4text);
    this.clickedlbl4text = true;
    this.numberArray[3] = 100;
    this.hasEnded();
  }

  clicklbl5() {
    this.clickCounter = this.clickCounter + 1;
    this.checkPoint(this.lbl5text);
    this.clickedlbl5text = true;
    this.numberArray[4] = 100;
    this.hasEnded();
  }

  clicklbl6() {
    this.clickCounter = this.clickCounter + 1;
    this.checkPoint(this.lbl6text);
    this.clickedlbl6text = true;
    this.numberArray[5] = 100;
    this.hasEnded();
  }

  clicklbl7() {
    this.clickCounter = this.clickCounter + 1;
    this.checkPoint(this.lbl7text);
    this.clickedlbl7text = true;
    this.numberArray[6] = 100;
    this.hasEnded();
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

  checkPoint(currentNumber){
    console.log(currentNumber+ ' AAAA');
    for(const element of this.numberArray){
      if(currentNumber > element){
        console.log('aJAJAJAJAJA');
        console.log('FUCK -- -20 point');
        this.endOfTurn();
        break;
      } else {
        console.log('NOIIIICE');
      }
    }
  }

  hasEnded(){
    if(this.clickCounter === this.numberArray.length){
      this.clickCounter = 0;
      this.endOfTurn();
    }
  }

  endOfTurn(){
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




}
