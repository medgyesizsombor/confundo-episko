import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  uid = localStorage.getItem('uid');

  constructor(private router: Router, private loadingController: LoadingController,
    private authService: AuthService, private angularFirestore: AngularFirestore) { }


  async ngOnInit() {
    this.angularFirestore.collection('Users').doc(this.uid).collection('game').doc('firstgame').valueChanges().subscribe(res =>{
      localStorage.setItem('bestScore', res.a);
    }, err => {
      console.log(err);
    });
    console.log(localStorage.getItem('bestScore') + ' asdasdasd 2');
  }


  goToGames() {
    this.router.navigate(['main-tabs/games']);
  }

}
