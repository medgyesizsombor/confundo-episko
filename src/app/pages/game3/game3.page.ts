import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataAverageUserService } from 'src/app/services/data-average-user/data-average-user.service';
import { DataOfGameService } from 'src/app/services/data-of-game/data-of-game.service';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';

@Component({
  selector: 'app-game3',
  templateUrl: './game3.page.html',
  styleUrls: ['./game3.page.scss'],
})
export class Game3Page implements OnInit {
  round = 1;
  numOfGenNumbers = 3;
  selectedNumbers = [];
  selectedSorted = [];
  clickedItems = [];

  constructor(private angularFireStore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private authService: AuthService, private dataOfGame: DataOfGameService,
    private dataOfUser: DataOfUserService, private dataAverageUser: DataAverageUserService){ }

  ngOnInit(){
    this.selectedNumbers = this.generateNumbers(this.numOfGenNumbers);
    this.selectedSorted = this.sort(this.copy(this.selectedNumbers));
  }

  sort(numbers: number[]) {
    // eslint-disable-next-line arrow-body-style
    return numbers.sort((a, b) => {
      return a - b;
    });
  }

  copy(arr: any[]) {
    const c = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      c.push(arr[i]);
    }
    return c;
  }

  generateNumbers(num: number) {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const selectedNumbers = [];
    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * nums.length);
      selectedNumbers.push(nums[index]);
      nums.splice(index, 1);
    }
    return selectedNumbers;
  }

  clickOnItem(num: number, index: number) {
    setTimeout(() => {
      this.clickedItems.push(num);
      const idx = this.clickedItems.length - 1;
      if (this.clickedItems[idx] === this.selectedSorted[idx]) {
        console.log('GOOD');
        if (this.clickedItems.length === this.selectedNumbers.length) {
          console.log('ALL GOOD');
          this.nextRound();
        }
      } else {
        console.log('NO GOOD');
        this.nextRound();
      }
    }, 250);
  }

  nextRound() {
    this.round++;
    console.log(this.round, this.numOfGenNumbers);

    if (this.round % 3 === 0 && this.selectedNumbers.length < 5) {
      this.numOfGenNumbers++;
    }

    this.selectedNumbers = this.generateNumbers(this.numOfGenNumbers);
    this.selectedSorted = this.sort(this.copy(this.selectedNumbers));
    this.clickedItems = [];
  }
}
