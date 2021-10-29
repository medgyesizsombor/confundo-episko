import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import 'firebase/auth';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';

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
  secondsOnTurn = 2;
  intervalGame;
  intervalTurn;
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;

  playing = false;
  ended = false;
  nextTask = false;

  uid = localStorage.getItem('uid');

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService) { }

  ngOnInit() {
    this.task = 'Press button when it is even number';
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
    this.secondsOnTurn = 2;
    this.timeText2 = this.secondsOnTurn + ' sec';
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
    this.intervalGame = setInterval(() => {
      this.updateTime();
      this.timeText = this.secondsOnGame + ' sec';
    }, 1000);
  }

  startCountDownTurn(){
    this.intervalTurn = setInterval(() => {
      this.timeText2 = this.secondsOnTurn + ' sec';
    }, 1000);
  }

  updateTime() {
    if (this.secondsOnGame > 0) {
      this.secondsOnGame--;
      if(this.secondsOnTurn > 0){
        this.secondsOnTurn--;
      } else {
        this.notPushed();
        this.secondsOnTurn = 2;
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

  notPushed(){
    if(this.firstTask){
        if(this.text % 2 === 1){
          this.result = this.result + 1;
          console.log(this.result);
        } else {
          this.result = this.result - 2;
          console.log(this.result);
        }
    } else {
      if(this.text < 10){
        this.result = this.result + 1;
        console.log(this.result);
      } else {
        this.result = this.result - 2;
        console.log(this.result);
      }
    }
  }

  async getDataOfGames(){
    await this.dataOfGame.getDataOfGames('colourgame').then(() => {
      this.playedGames = Number(localStorage.getItem('playedGames'))+1;
      this.sumScore = Number(localStorage.getItem('sumScore'))+this.result;
      this.averageScore = this.sumScore / this.playedGames;
      this.bestScore = Number(localStorage.getItem('bestScore'));
      if(this.bestScore < this.result || this.bestScore === 0){
        this.bestScore = this.result;
      }
    });
  }

  async end() {
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    this.ended = true;
    await this.getDataOfGames();
    this.angularFireStore.collection('Users').doc(this.uid).collection('game').doc('go-nogogame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });
    clearInterval(this.intervalTurn);
    clearInterval(this.intervalGame);
    localStorage.removeItem('playedGames');
    localStorage.removeItem('sumScore');
    localStorage.removeItem('bestScore');
    localStorage.removeItem('averageScore');
  }

}
