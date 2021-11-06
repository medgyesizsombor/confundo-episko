import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  @ViewChild('chartComp') chartComp: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log('stats');

    setTimeout(() => {
      console.log(this.chartComp.nativeElement)
    }, 1000);
  }

}
