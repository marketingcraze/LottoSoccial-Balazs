import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckWinningsPage } from '../check-winnings/check-winnings';
import { MySyndicatePage } from '../my-syndicate/my-syndicate';
import { Params } from '../../services/params';


@Component({
	selector: 'page-syndicates',
	templateUrl: 'syndicates.html'
})
export class SyndicatesPage {
    tab1child = MySyndicatePage;
    tab2child = CheckWinningsPage;

    indexSelected: number;

    constructor(
        public params:Params,
        public navCtrl: NavController, 
        public navParams: NavParams) {
    
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SyndicatePage');
    }

    ionViewWillEnter() {
        this.indexSelected = this.navParams.data.tabIndex || 0;
    }

    goHomePage(){
        this.params.goHomePage();
    }

}
