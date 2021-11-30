import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
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
  language: string;


  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private dataOfUser: DataOfUserService, private platform: Platform, private router: Router,
    private languageService: LanguageService, private translatePipe: TranslatePipe) { }

  ngOnInit() {
    this.dataOfUser.getAllSumStats().then(res => {
      this.sumData = res;
    });
    if (this.languageService.getLanguage() === 'hu'){
      this.language = 'hu';
    } else {
      this.language = 'en';
    }
    this.languageService.setLanguage(this.language);
  }



  ionViewWillEnter() {
    if (this.languageService.getLanguage() === 'hu'){
      this.language = 'hu';
    } else {
      this.language = 'en';
    }
    this.languageService.setLanguage(this.language);
    this.isMobile = this.platform.is('mobile');
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

  titleStyle(){
    if(!this.isMobile){
      return {
        'font-size': '36px'
      };
    } else {
      return {
        'font-size': '30px'
      };
    }
  }

}
