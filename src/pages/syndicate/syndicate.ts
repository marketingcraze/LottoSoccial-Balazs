import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckWinningsPage } from '../check-winnings/check-winnings';
import { MySyndicatePage } from '../my-syndicate/my-syndicate';

/*
  Generated class for the Syndicate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-syndicate',
  templateUrl: 'syndicate.html'
})
export class SyndicatePage {
  tab2child = CheckWinningsPage
  tab1child = MySyndicatePage
  indexSelected: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyndicatePage');
  }

  ionViewWillEnter() {
    this.indexSelected = this.navParams.data.tabIndex || 0;
  }

}
