import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  isMobile: boolean;

  constructor(private router: Router, private platform: Platform) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['login']);
  }

  styleCard(){
    if(!this.isMobile){
      return {width: '60%', margin: '10px auto 10px auto'};
    }
  }

}
