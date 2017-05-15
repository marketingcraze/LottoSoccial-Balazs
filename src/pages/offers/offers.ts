import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Params } from '../../services/params';

@Component({
    selector: 'page-offers',
    templateUrl: 'offers.html'
})
export class OffersPage {

    toptab:string="offer";

    constructor(
        public navCtrl: NavController, 
        private params: Params,
        public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad OffersPage');
    }

    goHomePage(){
        this.params.goHomePage();
    }

}