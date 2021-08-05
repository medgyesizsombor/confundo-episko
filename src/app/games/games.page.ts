import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToGame(){
    this.router.navigate(['main-tabs/colourgame']);
  }

}
