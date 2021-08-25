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
  pushCounter: number = 0;
  point: number = 0;

  playing: boolean = false;
  nextTask: boolean = false;

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  start(){
    this.fillNumber();
    this.firstTask();
  }

  fillNumber(){
    this.text = Math.floor(Math.random() * 10 - 0) + 0;
  }

  pushed($event: PointerEvent){
    this.pushCounter++;
    if(this.pushCounter < 10){
      this.firstTask();
    }
    console.log(this.pushCounter);
  }

  firstTask(){
    if((this.text / 2) == 0){
      this.point = this.point + 1;
      
      console.log("Yeah");
      this.fillNumber();
    } else {
      console.log("upsi");
    }
  }

  secondTask(){
    if((this.text % 3) == 0){
      //return true;
    } else {
      //return false;
    }
  }

}
