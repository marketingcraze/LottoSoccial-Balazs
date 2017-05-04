import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YourGamesPage } from '../your-games/your-games';
import { RedeemGamesPage } from '../redeem-games/redeem-games';

@Component({
  selector: 'page-games',
  templateUrl: 'games.html'
})
export class GamesPage {
  tab1Root = YourGamesPage;
  tab2Root = RedeemGamesPage;

  gameGroup:any = {};

  constructor(private navParams:NavParams,
    private navCtrl:NavController) {
    this.gameGroup = this.navParams.data.game.game_group;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage', this.navParams.data);
  }
}
