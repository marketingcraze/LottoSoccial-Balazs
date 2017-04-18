import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfirmNumberPage } from '../confirm-number/confirm-number';

/*
  Generated class for the ChooseNumber page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-choose-number',
  templateUrl: 'choose-number.html'
})
export class ChooseNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseNumberPage');
  }
  next() {
    this.navCtrl.push(ConfirmNumberPage);
  }

}
