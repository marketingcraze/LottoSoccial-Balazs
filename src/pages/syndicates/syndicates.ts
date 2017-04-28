import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YourGamesPage } from '../your-games/your-games';
import { RedeemGamesPage } from '../redeem-games/redeem-games';

@Component({
  selector: 'page-syndicates',
  templateUrl: 'syndicates.html'
})
export class SyndicatesPage {
  tab1Root = YourGamesPage;
  tab2Root = RedeemGamesPage;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyndicatesPage');
  }

}
