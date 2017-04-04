import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

import { OffersForYouPage } from '../offers-for-you/offers-for-you';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';

@Component({
  selector: 'page-add-syndicate',
  templateUrl: 'add-syndicate.html'
})
export class AddSyndicatePage {
    @ViewChild('add_syndicate_tabs') tabsRef: Tabs;

    tab1Root: any = OffersForYouPage;
    tab2Root: any = CreateSyndicatePage;

    selectedTabId = 0;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams) {

        this.selectedTabId = navParams.get('tab');
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AddSyndicatePage');
        
    }


}
