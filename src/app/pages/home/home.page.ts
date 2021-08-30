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

  constructor(private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth, private router: Router, private loadingController: LoadingController, private authService: AuthService) { }

  async ngOnInit() {
    console.log(await this.authService.currentUser());
    /*this.authService.getPlayerGameStats('4qzQWe7fC6qcD8pDMOXJ', 'memoriajatek').subscribe(res => {
      console.log(res.data())
    }, err => {

    });*/
  }

  goToGames() {
    this.router.navigate(["main-tabs/games"]);
  }

}
