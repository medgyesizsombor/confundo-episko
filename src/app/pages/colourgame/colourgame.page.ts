import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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
  seconds = 5;
  timeText: string;


  playing = false;
  ended = false;

  points = {
    finalPoint: ''
  };

  uid = localStorage.getItem('uid');
  bestScore = Number(localStorage.getItem('bestScore'));
  interval;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth) {
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

    if (Math.random() <= 0.2) {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber3];
      this.lbl1color = colours[randomNumber2];
      this.lbl2color = colours[randomNumber1];
      console.log('Same');
    } else {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber2];
      this.lbl1color = colours[randomNumber3];
      this.lbl2color = colours[randomNumber4];
      console.log('NOOO');
    }
  }

  rightButton($event: PointerEvent) {
    if (this.lbl1text === this.lbl2color) {
      console.log($event);
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

  end() {
    this.lbl1text = null;
    this.lbl2text = null;
    this.finalResult = 'You have got ' + this.result + ' points!';
    this.playing = false;
    this.ended = true;
    if(this.bestScore < this.result || !this.bestScore){
      localStorage.setItem('bestScore', String(this.result));
      this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('firstgame').update({
        asd: 5,
        asdasd: '8',
        a: this.result
      });
      console.log(this.bestScore + 'HALIKAAAAAA');
    }
    clearInterval(this.interval);
    console.log(this.bestScore);
    console.log('ASD');
    /*this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('firstgame').valueChanges().subscribe(res =>{
      res.asd.update({
        asd: 'ASDASDASD'
      });
    }, err => {
      console.log(err);
    });*/
  }

}
