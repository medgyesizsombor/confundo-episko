import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  sumData: any;
  isMobile: boolean;



  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private dataOfUser: DataOfUserService, private platform: Platform, private router: Router) { }

  ngOnInit() {
    this.dataOfUser.getAllSumStats().then(res => {
      this.sumData = res;
    });

  }

  ionViewDidEnter(){
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'change');
  }

  ionViewWillEnter() {
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'willEnter');
    this.dataOfUser.getAllSumStats().then(res => {
      this.sumData = res;
    });
  }

  styleCard(){
    if(!this.isMobile){
      return {width: '60%', margin: '30px auto'};
    }
  }

  goHomePage(){
    this.router.navigate(['main-tabs/home']);
  }

}
