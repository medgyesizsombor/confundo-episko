import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {

  }

  goToGame(url: string){
    if(url){
      this.router.navigate([url]);
    }
  }

}
