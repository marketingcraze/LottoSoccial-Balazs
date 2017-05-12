import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ViewTickets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-tickets',
  templateUrl: 'view-tickets.html'
})
export class ViewTicketsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTicketsPage');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.navCtrl.pop();
  }

}
