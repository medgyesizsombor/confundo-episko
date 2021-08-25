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
  counter: number = 0;

  playing: boolean = false;
  nextTask: boolean = false;

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.text = Math.floor(Math.random() * 10 - 0) + 0;
  }

  start(){
    this.fillNumber();
    this.firstTask();
  }

  fillNumber(){
    this.text = Math.floor(Math.random() * 10 - 0) + 0;
  }

  firstTask(){
    if((this.text / 2) == 0){
      return true;
    } else {
      return false;
    }
  }

  secondTask(){
    if((this.text % 3) == 0){
      return true;
    } else {
      return false;
    }
  }

}
