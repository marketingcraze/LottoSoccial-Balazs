import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController,Tabs } from 'ionic-angular';



@Component({
  selector: 'page-Help',
  templateUrl: 'Help.html'
})
export class HelpPage {
 
  constructor(public navCtrl: NavController, private viewctrl:ViewController,) {
  }

  openSyndicatePage(){
    var tabs: Tabs = this.navCtrl.parent;
      tabs.select(1);
  }
  openGamesPage(){
    var tabs: Tabs = this.navCtrl.parent;
      tabs.select(3);
  }
  openOfferPage(){
    var tabs: Tabs = this.navCtrl.parent;
      tabs.select(4);
  }
}