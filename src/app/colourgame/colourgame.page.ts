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
  result: number = 0;
  finalResult: string;
  seconds: number = 120;
  timeText: string;

  playing: boolean = false;
  ended: boolean = false;

  points = {
    finalPoint: ''
  }
  
  constructor(private router: Router, private route: ActivatedRoute, private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth) {
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
    let colours = ['red', 'yellow', 'blue', 'brown', 'green', 'violet', 'black', 'pink'];
    let randomNumber1 = Math.floor(Math.random() * (7 - 0) + 0);
    let randomNumber2 = Math.floor(Math.random() * (7 - 0) + 0);
    let randomNumber3 = Math.floor(Math.random() * (7 - 0) + 0);
    let randomNumber4 = Math.floor(Math.random() * (7 - 0) + 0);

    if (Math.random() <= 0.2) {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber3];
      this.lbl1color = colours[randomNumber2];
      this.lbl2color = colours[randomNumber1];
      console.log('Same')
    } else {
      this.lbl1text = colours[randomNumber1];
      this.lbl2text = colours[randomNumber2];
      this.lbl1color = colours[randomNumber3];
      this.lbl2color = colours[randomNumber4];
      console.log('NOOO')
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
    this.lbl1text = null;
    this.lbl2text = null;
    this.finalResult = "You have got " + this.result + " points!"
    this.playing = false;
    this.ended = true;
    /*this.angularFireStore.collection('Users/${user}/points').add('points').then(() => {
      finalResult: this.finalResult;
    })*/
  }

}


