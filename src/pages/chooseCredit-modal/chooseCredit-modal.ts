import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
declare const $:any;
@Component({
  selector: 'page-chooseCredit-modal',
  templateUrl: 'chooseCredit-modal.html'
})
export class CreditModalPage {
  deviceHeight: any;
  topmar: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App) {}

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;

      var h = $('.m-div2').height();
      this.topmar = (this.deviceHeight - h)/2;

  }

  dismissm() {
    let data = {'foo':'bar'}
    this.viewCtrl.dismiss(data);
 }
 nothanks() {
   this.viewCtrl.dismiss();
   //this.navCtrl.push(TabsPage);
   //this.app.getRootNav().push(TabsPage); 
   //let option = [{tabIndex: 1}]
   //this.navCtrl.popToRoot()
   //this.navCtrl.setRoot(TabsPage, {tabIndex: 1});
 }
 find() {
   
 }

}
