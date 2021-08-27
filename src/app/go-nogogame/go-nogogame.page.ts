import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-go-nogogame',
  templateUrl: './go-nogogame.page.html',
  styleUrls: ['./go-nogogame.page.scss'],
})
export class GoNogogamePage implements OnInit {

  text: number;
  task: string = '';
  counter: number = 0;
  pushCounter: number = 0;
  result: number = 0;
  finalResult: string = '';
  timeText: string = '';
  seconds: number = 5;

  playing: boolean = false;
  ended: boolean = false;
  nextTask: boolean = false;

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.task = 'Press button when it is even number';
  }

  start(){
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.startCountDown();
    this.changeNumber();
  }

  changeNumber(){
    this.text = Math.floor(Math.random() * 20 - 0) + 0;
  }

  pushed($event: PointerEvent){
    this.pushCounter++;
    if(this.pushCounter < 10){
      this.firstTask();
    } else if(this.pushCounter == 10) {
      this.task = 'Push button when it is equal or more than 9';
    } else {
      this.secondTask();
    }
    console.log(this.pushCounter);
  }

  firstTask(){
    if((this.text / 2) == 0){
      this.result = this.result + 1;
      
      console.log("Yeah");
      this.result = this.result + 1;
      console.log(this.result);
      this.changeNumber();
      
    } else {
      console.log("upsi");
      this.result = this.result - 2;
      console.log(this.result);
      this.changeNumber();
    }
  }

  secondTask(){
    if(this.text >=  10){
      this.result = this.result + 1;
      
      console.log("Yeah");
      this.result = this.result + 1;
      console.log(this.result);
      this.changeNumber();
      
    } else {
      console.log("upsi");
      this.result = this.result - 2;
      console.log(this.result);
      this.changeNumber();
    }
  }

  startCountDown() {
    setInterval(() => {
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

  end() {
    this.finalResult = "You have got " + this.result + " points!"
    this.playing = false;
    this.ended = true;
  }

}
