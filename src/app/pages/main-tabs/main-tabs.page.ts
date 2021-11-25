import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.page.html',
  styleUrls: ['./main-tabs.page.scss'],
})
export class MainTabsPage implements OnInit {

  isMobile: boolean;

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
  }

  buttonStyle(){
    if(!this.isMobile){
      return{
        'font-size': '14px'
      };
    } else {
      return{
        'font-size': '12px'
      };
    }
  }

}
