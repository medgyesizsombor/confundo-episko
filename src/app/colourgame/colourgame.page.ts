import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colourgame',
  templateUrl: './colourgame.page.html',
  styleUrls: ['./colourgame.page.scss'],
})
export class ColourgamePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  changeLabelName(lbl, lbl2, asd) {
    
    let colours = ['red', 'yellow', 'blue', 'brown', 'green', 'violet', 'black', 'pink'];
    let text1 = '';
    let text2 = '';
    let colour1 = '';
    let colour2 = '';
    let randomNumber1 = Math.floor(Math.random() * (7-0) + 0);
    let randomNumber2 = Math.floor(Math.random() * (7-0) + 0);
    let randomNumber3 = Math.floor(Math.random() * (7-0) + 0);
    let randomNumber4 = Math.floor(Math.random() * (7-0) + 0);
    
    text1 = colours[randomNumber1];
    text2 = colours[randomNumber2];
    colour1 = colours[randomNumber3];
    colour2 = colours[randomNumber4];
   
    document.getElementById(lbl).innerHTML = text1;
    document.getElementById(lbl).style.color = colour1;
    document.getElementById(lbl2).innerHTML = text2;
    document.getElementById(lbl2).style.color = colour2;
    document.getElementById(asd).innerHTML = '';
    console.log('ASD');
    //document.getElementById(bt).style.display = 'none';

  }
  
  point(asd, lbl, lbl2){
    if (document.getElementById(lbl).style.color === document.getElementById(lbl2).innerHTML){
      document.getElementById(asd).innerHTML = 'loool';
      console.log('loool');
      this.changeLabelName(lbl, lbl2, asd);
      
    } else {
      document.getElementById(asd).innerHTML = 'noob';
      console.log('nooob');
      this.changeLabelName(lbl, lbl2, asd);
    }
  }

  

}
