import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import 'firebase/auth';

@Component({
  selector: 'app-go-nogogame',
  templateUrl: './go-nogogame.page.html',
  styleUrls: ['./go-nogogame.page.scss'],
})
export class GoNogogamePage implements OnInit {

  text: number;
  task = '';
  counter = 0;
  pushCounter = 0;
  result = 0;
  finalResult = '';
  timeText = '';
  timeText2 = '';
  secondsOnGame = 120;
  secondsOnTurn = 3;

  playing = false;
  ended = false;
  nextTask = false;

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService) { }

  ngOnInit() {
    this.task = 'Press button when it is even number';
    this.authService.getPlayerGameStats(localStorage.getItem('uid'), 'firstgame').subscribe(res => {
      console.log(res.data());
    }, err => {

    });
  }

  start(){
    this.playing = true;
    this.timeText = this.secondsOnGame + ' sec';
    this.timeText2 = this.secondsOnTurn + ' sec';
    this.startCountDownGame();
    this.changeNumber();
    this.startCountDownTurn();
  }

  changeNumber(){
    this.text = Math.floor(Math.random() * 20 - 0) + 0;
  }

  pushed($event: PointerEvent){
    this.pushCounter++;
    this.checkTask();
    console.log(this.pushCounter);
  }

  firstTask(){
    if(this.text % 2 === 0) {
      this.result = this.result + 1;

      console.log('Yeah');
      this.result = this.result + 1;
      console.log(this.result);
      this.changeNumber();

    } else {
      console.log('upsi');
      this.result = this.result - 2;
      console.log(this.result);
      this.changeNumber();
    }
  }

  secondTask(){
    if(this.text >= 10){
      this.result = this.result + 1;

      console.log('Yeah');
      this.result = this.result + 1;
      console.log(this.result);
      this.changeNumber();

    } else {
      console.log('upsi');
      this.result = this.result - 2;
      console.log(this.result);
      this.changeNumber();
    }
  }

  startCountDownGame() {
    setInterval(() => {
      this.updateTime();
      this.timeText = this.secondsOnGame + ' sec';
    }, 1000);
  }

  startCountDownTurn(){
    setInterval(() => {
      this.timeText2 = this.secondsOnTurn + ' sec';
    }, 1000);
  }

  updateTime() {
    if (this.secondsOnGame > 0) {
      this.secondsOnGame--;
      if(this.secondsOnTurn > 0){
        this.secondsOnTurn--;
      } else {
        this.checkTask();
        this.secondsOnTurn = 3;
        this.changeNumber();
      }
    } else {
      this.end();
    }
  }

  checkTask(){
    if(this.pushCounter < 10){
      this.firstTask();
    } else if(this.pushCounter === 10) {
      this.task = 'Push button when it is equal or more than 9';
      this.firstTask();
    } else {
      this.secondTask();
    }
  }

  end() {
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    this.ended = true;
  }

}
