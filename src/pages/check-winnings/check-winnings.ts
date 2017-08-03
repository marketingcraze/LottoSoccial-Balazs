import { Component } from '@angular/core';
import { NavController, NavParams, App, ViewController } from 'ionic-angular';
import { CheckWinningsNextPage } from '../check-winnings-next/check-winnings-next';
/*
  Generated class for the CheckWinnings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-winnings',
  templateUrl: 'check-winnings.html'
})
export class CheckWinningsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckWinningsPage');
  }
  next() {
    this.app.getRootNav().push(CheckWinningsNextPage);
  }
  

}
