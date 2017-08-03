import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Tandc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tandc',
  templateUrl: 'tandc.html'
})
export class TandcPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TandcPage');
  }
  ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
  }
  close() {
    this.navCtrl.pop();
  }

}
