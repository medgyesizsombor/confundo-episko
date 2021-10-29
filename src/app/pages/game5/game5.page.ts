import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game5',
  templateUrl: './game5.page.html',
  styleUrls: ['./game5.page.scss'],
})
export class Game5Page implements OnInit {

  timeText: string;
  title1= 'Is the number even?';
  title2= 'Is the letter vowel?';
  label1: string;
  label2: string;
  points = 0;
  finalResult = 0;
  textLocation: number;
  isVowel: boolean;

  randomNumber: number;
  randomLetter: string;
  vowel= ['A', 'E', 'I', 'O', 'U'];

  seconds = 120;
  playing = false;
  ended = false;
  interval;

  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.generateLabel();
  }

  onStart(){
    this.playing = true;
    this.timeText = this.seconds + ' sec';
    this.startCountDown();
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

  generateLabel(){
    this.randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
    const randomLetterNumber = Math.floor(Math.random() * (26 - 1) + 1);
    this.randomLetter = (randomLetterNumber + 9).toString(36).toUpperCase(); //a 36-os számrendszerben a 10-es a, 11-es b, stb.
    this.letterAndNumberPosition();
  }

  letterAndNumberPosition(){
    this.textLocation = Math.floor(Math.random() * (4 - 0) + 0);
    switch(this.textLocation){
      case 0:   //Ha nullát kap, az első labelben a szám előremegy, mellé a betű
        this.label1 = this.randomNumber.toString() + this.randomLetter;
        break;
      case 1:   //Ha egyet kap, az első labelben a betű előremegy, mellé a szám
        this.label1 = this.randomLetter + this.randomNumber.toString();
        break;
      case 2:   //Ha kettőt kap, a második labelben a szám előremegy, mellé a betű
        this.label2 = this.randomNumber.toString() + this.randomLetter;
        break;
      case 3:   //Ha hármat kap, a második labelben a betű előremegy, mellé a szám
        this.label2 = this.randomLetter + this.randomNumber.toString();
        break;
    }
  }

  clicked(str: string){
    if(str === 'true'){
      this.checkPoint('true');
    } else {
      this.checkPoint('false');
    }
    this.label1 = null;
    this.label2 = null;
    console.log(this.points);
    this.generateLabel();

  }

  checkPoint(str: string){
    switch(str){
      case 'true':
        if(this.textLocation === 0 || this.textLocation === 1){
          if(this.randomNumber % 2 !== 0){
            console.log('jó béna');
            this.points--;
          } else {
            console.log('jó vagy');
            this.points++;
          }
        } else {
          this.checkVowel(this.randomLetter);
          if(this.isVowel === true){
            this.points++;
          } else {
            this.points--;
          }
        }
        break;
      case 'false':
        if(this.textLocation === 0 || this.textLocation === 1){
          if(this.randomNumber % 2 !== 0){
            console.log('jó vagy');
            this.points++;
          } else {
            console.log('jó béna');
            this.points--;
          }
        } else {
          this.checkVowel(this.randomLetter);
          if(this.isVowel !== true){
            this.points++;
            console.log('jó vagy');
          } else {
            this.points--;
            console.log('jó béna');
          }
        }
        break;
    }

  }

  checkVowel(str: string){
    for (const i of this.vowel){
      if(str === i){
        console.log('SIKERÜLT');
        this.isVowel = true;
        break;
      } else{
        console.log('NEM SIKERÜLT He');
        this.isVowel = false;
      }
    }
  }

  end(){
    this.ended = true;
    clearInterval(this.interval);
  }

}