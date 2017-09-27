
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { VoucherService } from '../../services/voucherList_service';

@Component({
    selector: 'affiliate-popup',
    templateUrl: 'affiliate_popups.html'
})
export class AffiliatePopup {
    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        private viewctrl: ViewController,
        private navParms: NavParams, public voucher_service: VoucherService, private loadingCtrl: LoadingController) {

    }
    dismissPopUp(data) {
        this.viewctrl.dismiss(data);
    }
    done(){
        
    }
}

