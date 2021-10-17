import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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
  username: string;


  constructor(private router: Router, private route: ActivatedRoute,
    private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth) {
  }
  ngOnInit() {

    /*this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('firstgame').valueChanges().subscribe(res =>{
      this.asd = res.a;
    }, err => {
      console.log(err);
    });*/

    /*this.angularFirestore.collection('Users').doc(this.uid).valueChanges().subscribe(res =>{
      this.name = res.password;
    }, err => {
      console.log(err);
    });*/

    this.angularFirestore.collection('Users').doc(this.uid).valueChanges().subscribe((res: any) => {
      this.name = res.name;
      this.email = res.email;
      this.username = res.username;
      this.birthdate = res.birthdate;
    }, err => {
      console.log(err);
    });
  }

}
