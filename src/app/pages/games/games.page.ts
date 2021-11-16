import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  isMobile: boolean;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
    private platform: Platform) { }

  ngOnInit() {
    console.log(this.isMobile);
    this.styleCard();
  }

  ionViewWillEnter() {
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'willEnter');
    this.styleCard();

  }

  goToGame(url: string){
    if(url){
      this.router.navigate([url]);
    }
  }

  styleCard(){
    if(!this.isMobile){
      return '60%';
    }
  }

  goHomePage(){
    this.router.navigate(['main-tabs/home']);
  }

}
