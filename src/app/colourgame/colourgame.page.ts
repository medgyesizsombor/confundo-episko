import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
  seconds: number = 5;
  timeText: string;
  
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  start() {
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

    this.lbl1text = colours[randomNumber1];
    this.lbl2text = colours[randomNumber2];
    this.lbl1color = colours[randomNumber3];
    this.lbl2color = colours[randomNumber4];
  }

  rightButton($event: PointerEvent) {
    console.log($event);
    if (this.lbl1text === this.lbl2color) {
      console.log($event);
      this.result = this.result + 1;
      console.log('loool');
      console.log(this.result);
      this.giveValueOfLabels();
    } else {
      this.giveValueOfLabels();
    }
  }

  leftButton($event: PointerEvent) {
    if (this.lbl1text !== this.lbl2color) {
      console.log($event);
      this.result = this.result + 1;
      console.log('loool');
      console.log(this.result);
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
  }

}


