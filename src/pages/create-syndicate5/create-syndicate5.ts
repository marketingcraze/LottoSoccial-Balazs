import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CreateSyndicate4Page } from '../create-syndicate4/create-syndicate4';
import { ChooseNumberPage } from '../choose-number/choose-number';

/*
  Generated class for the CreateSyndicate5 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate5',
  templateUrl: 'create-syndicate5.html'
})
export class CreateSyndicate5Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicate5Page');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.navCtrl.pop(CreateSyndicate4Page);
  }
  next() {
    this.navCtrl.push(ChooseNumberPage);
  }

}
