import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';

@Component({
  selector: 'app-colourgame',
  templateUrl: './colourgame.page.html',
  styleUrls: ['./colourgame.page.scss'],
})
export class ColourgamePage implements OnInit {

  lbl1text: string;
  lbl2text: string;
  lbl1color: string;
  lbl2color: string;
  result = 0;
  finalResult: string;
  seconds = 120;
  timeText: string;
  playedGames = 0;
  averageScore = 0;
  sumScore = 0;
  bestScore = 0;

  playing = false;
  ended = false;

  uid = localStorage.getItem('uid');
  interval: any;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService) {
  }

  ngOnInit() {
  }

  start() {
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.startCountDown();
    this.giveValueOfLabels();
  }

  giveValueOfLabels() {
    const colours = ['red', 'yellow', 'blue', 'brown', 'green', 'violet', 'black', 'pink'];
    const randomNumber1 = Math.floor(Math.random() * (7 - 0) + 0);
    const randomNumber2 = Math.floor(Math.random() * (7 - 0) + 0);
    const randomNumber3 = Math.floor(Math.random() * (7 - 0) + 0);
    const randomNumber4 = Math.floor(Math.random() * (7 - 0) + 0);

    if (Math.random() <= 0.5) {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber3];
      this.lbl1color = colours[randomNumber2];
      this.lbl2color = colours[randomNumber1];
    } else {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber2];
      this.lbl1color = colours[randomNumber3];
      this.lbl2color = colours[randomNumber4];
    }
  }

  rightButton($event: PointerEvent) {
    if (this.lbl1text === this.lbl2color) {
      this.result = this.result + 1;
      this.giveValueOfLabels();
    } else {
      this.giveValueOfLabels();
    }
  }

  leftButton($event: PointerEvent) {
    if (this.lbl1text !== this.lbl2color) {
      this.result = this.result + 1;
      this.giveValueOfLabels();
    } else {
      this.giveValueOfLabels();
    }
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
    /*valami.then(res => {

    }).catch(err => {

    })

    try {
      let res = await valami();
    } catch (err) {

    }*/
    this.lbl1text = null;
    this.lbl2text = null;
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    this.ended = true;
    await this.getDataOfGames();
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('colourgame').update({
      playedGames: this.playedGames,
      sumScore: this.sumScore,
      bestScore: this.bestScore,
      averageScore: this.averageScore
    });
    clearInterval(this.interval);
    localStorage.removeItem('playedGames');
    localStorage.removeItem('sumScore');
    localStorage.removeItem('bestScore');
    localStorage.removeItem('averageScore');
  }
}
