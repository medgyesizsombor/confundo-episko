import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  uid = localStorage.getItem('uid');
  name: string;
  email: string;
  birthdate: string;

  isMobile: boolean;


  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth,
    private platform: Platform) {
  }
  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    this.angularFirestore.collection('Users').doc(this.uid).valueChanges().subscribe((res: any) => {
      this.name = res.name;
      this.email = res.email;
      this.birthdate = res.birthdate;
    }, err => {
      console.log(err);
    });
  }

  goBack(){
    this.router.navigate(['main-tabs/settings']);
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
