import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AverageScoreComponent } from 'src/app/components/average-score/average-score.component';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  sumData: any;
  sumData2: any;
  isMobile: boolean;

  language = localStorage.getItem('language');


  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private dataOfUser: DataOfUserService, private platform: Platform, private router: Router,
    private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.setLanguage(this.language);
    this.dataOfUser.getAllSumStats().then(res => {
      this.sumData = res;
    });
    this.datas();

  }

  async datas(){
  await this.dataOfUser.getAllDatas().then(res => {
    this.sumData = res;
  });
}

  ionViewDidEnter(){
    this.isMobile = this.platform.is('mobile');
    console.log(this.isMobile + 'change');
    this.datas();

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
      return {
        width: '100%'
      };
    }
  }

  styleContainer() {
    if (!this.isMobile) {
      return {
        width: '75%',
        display: 'flex',
        'flex-direction': 'row',
        margin: 'auto'
      };
    }
  }

  goHomePage(){
    this.router.navigate(['main-tabs/home']);
  }

}
