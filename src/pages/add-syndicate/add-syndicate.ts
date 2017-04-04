import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

import { OffersForYouPage } from '../offers-for-you/offers-for-you';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';

@Component({
  selector: 'page-add-syndicate',
  templateUrl: 'add-syndicate.html'
})
export class AddSyndicatePage {
	@ViewChild('tabs') tabsRef: Tabs;

    tab1Root: any = OffersForYouPage;
    tab2Root: any = CreateSyndicatePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSyndicatePage');
    // this.tabsRef.select(1, {animate: false});

  }


}
