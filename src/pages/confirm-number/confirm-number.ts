import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

/*
  Generated class for the ConfirmNumber page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirm-number',
  templateUrl: 'confirm-number.html'
})
export class ConfirmNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmNumberPage');
  }

  next() {
    this.navCtrl.push(PaymentPage);
  }

}
