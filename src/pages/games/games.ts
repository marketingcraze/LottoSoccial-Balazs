import { Component } from '@angular/core';
import { YourGamesPage } from '../your-games/your-games';
import { RedeemGamesPage } from '../redeem-games/redeem-games';

/*
  Generated class for the Games page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-games',
  templateUrl: 'games.html'
})
export class GamesPage {
    tab1Root = YourGamesPage;
    tab2Root = RedeemGamesPage;
  constructor() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
  }

}
