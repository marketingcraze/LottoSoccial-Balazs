import { Component } from '@angular/core';
import { NavController, NavParams, App, Tabs } from 'ionic-angular';
import { ManageSyndicatePage } from '../manage-syndicate/manage-syndicate';
import { ManageSyndicate2Page } from '../manage-syndicate2/manage-syndicate2';
import { YourTicketsPage } from '../your-tickets/your-tickets';
//import { SyndicatePage } from '../syndicate/syndicate';
declare var $: any;
/*
  Generated class for the MySyndicate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-syndicate',
  templateUrl: 'my-syndicate.html'
})
export class MySyndicatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {}

  ionViewDidLoad() {
    $('#estate').hide();
    $('#sstate').show();
  }
  ionViewWillEnter() {
    $('#estate').hide();
    $('#sstate').show();
  }
  checkwins() {
    var t: Tabs = this.navCtrl.parent;
    t.select(1);
  }
  manage_syndicates() {
    this.app.getRootNav().push(ManageSyndicatePage);
  }
  manage_syndicates2() {
    this.app.getRootNav().push(ManageSyndicate2Page);
  }
  viewTickets() {
    this.app.getRootNav().push(YourTicketsPage);
  }

}
