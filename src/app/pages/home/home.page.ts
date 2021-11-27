import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  uid = localStorage.getItem('uid');
  lastPlayed = '';
  name = '';

  playedMath = 0;
  playedMath2 = 0;
  playedMath3 = 0;
  playedMathFinal = 10;
  playedFocus1 = 0;
  playedFocus2 = 0;
  playedFocus3 = 0;
  playedFocusFinal = 0;
  playedAttention1 = 0;
  playedAttention2 = 0;
  playedAttentionFinal = 0;

  fullName: any;
  params: any;
  isMobile: boolean;

  date: string;

  constructor(private router: Router, private angularFirestore: AngularFirestore,
    private dataOfUser: DataOfUserService, private platform: Platform,
    private translatePipe: TranslatePipe) { }


  async ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    await this.dataOfUser.getDataOfUserLastPlayed();
    this.date = '1998-04-20T17:24:27.729+02:00';
    const date2 = moment(this.date).format('YYYY-MM-DD');
    console.log(date2);

  }

  async ionViewWillEnter(){
    await this.dataOfUser.getDataOfUserLastPlayed();
    const lastPlayedGameName = localStorage.getItem('lastPlayed');
    switch (lastPlayedGameName){
      case '':{
        this.params = {
          gameName : this.translatePipe.transform('GAMES.colourGame')
        };
        break;
      }
      case 'colourgame':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.colourGame')
        };
        break;
      case 'go-nogogame':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.goNogoGame')
        };
        break;
      case 'game3':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.sortingGame')
        };
        break;
      case 'game4':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.equations')
        };
        break;
      case 'game5':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.numsAndLetters')
        };
        break;
      case 'game6':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.numsAndLetters2')
        };
        break;
      case 'game7':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.directions')
        };
        break;
      case 'game8':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.memoryCard')
        };
        break;
      case 'game9':
        this.params = {
          gameName : this.translatePipe.transform('GAMES.memoryGrid')
        };
        break;
    }

  }

  goToGames() {
    this.router.navigate(['main-tabs/games']);
  }

  playWithLastGame(){
    this.router.navigate([localStorage.getItem('lastPlayed')]);
  }

  textStyle(){
    if(!this.isMobile){
      return {
        'font-size': '18px'
      };
    }
  }

}
