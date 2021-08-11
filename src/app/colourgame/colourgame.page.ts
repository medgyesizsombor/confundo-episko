import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-colourgame',
  templateUrl: './colourgame.page.html',
  styleUrls: ['./colourgame.page.scss'],
})
export class ColourgamePage implements OnInit {

  lbl1text: string;
  lbl2text: string;
  lbl1color: string;
  lbl2color: string;

  constructor(private router: Router, private route: ActivatedRoute) { 
    
  }


  ngOnInit(){
    
    
  }

  result = 0;



  changeLabelName() {
    let colours = ['red', 'yellow', 'blue', 'brown', 'green', 'violet', 'black', 'pink'];
    let randomNumber1 = Math.floor(Math.random() * (7-0) + 0);
    let randomNumber2 = Math.floor(Math.random() * (7-0) + 0);
    let randomNumber3 = Math.floor(Math.random() * (7-0) + 0);
    let randomNumber4 = Math.floor(Math.random() * (7-0) + 0);
    
    this.lbl1text = colours[randomNumber1];
    this.lbl2text = colours[randomNumber2];
    this.lbl1color = colours[randomNumber3];
    this.lbl2color = colours[randomNumber4];
   
    /*document.getElementById(lbl).innerHTML = text1;
    document.getElementById(lbl).style.color = colour1;
    document.getElementById(lbl2).innerHTML = text2;
    document.getElementById(lbl2).style.color = colour2;
    document.getElementById(asd).innerHTML = 'asd';
    console.log('ASD');*/
    //document.getElementById(bt).style.display = 'none';

  }
  
  /*point(asd, lbl, lbl2){
    if (this.lbl2color === document.getElementById(lbl2).innerHTML){
      this.result++;
      document.getElementById(asd).innerHTML = 'loool';
      console.log('loool');
      console.log(this.result);
      this.changeLabelName();
      
    } else {
      document.getElementById(asd).innerHTML = 'noob';
      console.log('nooob');
      this.changeLabelName();
    }
  }*/

  

}
