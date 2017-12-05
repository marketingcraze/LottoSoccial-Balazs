import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NewSyndicatePage } from '../new-syndicate/new-syndicate';

@Component({
  selector: 'page-confirm-modal',
  templateUrl: 'confirm-modal.html'
})
export class ConfirmModalPage {
  deviceHeight: any;
  topmar: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App) { }

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;
    this.topmar = (this.deviceHeight / 2) - 150;
    console.log('ionViewDidLoad LeavePage', this.deviceHeight, this.topmar);
  }

  dismissm() {
    let data = { 'foo': 'bar' }
    this.viewCtrl.dismiss(data);
  }
  nothanks() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(TabsPage, {tabIndex: 1});
  }
  find() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(NewSyndicatePage)
  }

}
