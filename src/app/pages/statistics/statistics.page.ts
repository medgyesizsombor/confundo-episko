import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataOfUserService } from 'src/app/services/data-of-user/data-of-user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  sumData: any;

  constructor(private dataOfUser: DataOfUserService) { }

  ngOnInit() {
    this.dataOfUser.getAllSumStats().then(res => {
      this.sumData = res;
    });
  }

  ionViewWillEnter() {
    this.dataOfUser.getAllSumStats().then(res => {
      this.sumData = res;
    });
  }

}
