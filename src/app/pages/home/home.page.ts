import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';


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

  constructor(private router: Router,
    private dataOfUser: DataOfUserService, private platform: Platform) { }


  async ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    this.fullName = {
      name: localStorage.getItem('name')
    };
  }

  async ionViewWillEnter(){
    this.fullName = {
      name: localStorage.getItem('name')
    };
    this.params = {
      gameName: localStorage.getItem('lastPlayed')
    };
  }

  goToGames() {
    this.router.navigate(['main-tabs/games']);
  }

  playWithLastGame(){
    this.router.navigate([this.lastPlayed]);
  }

  textStyle(){
    if(!this.isMobile){
      return {
        'font-size': '18px'
      };
    }
  }

}
