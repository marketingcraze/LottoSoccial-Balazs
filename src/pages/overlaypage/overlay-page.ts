import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { VoucherService } from '../../services/voucherList_service';
@Component({
    selector: 'overlay-page',
    templateUrl: 'overlay-page.html'
})
export class OverlayPage {
    counter:any = 1;
    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        private viewctrl: ViewController,
        private navParms: NavParams, public voucher_service: VoucherService, private loadingCtrl: LoadingController) {
    }
    dismissPopUp(data:any=1) {
        this.viewctrl.dismiss(data);
    }

    closeOverlay(data:any=1) {
       this.counter++;
       if(this.counter>9)
       {
         this.viewctrl.dismiss(data);
       }
      
    }
}