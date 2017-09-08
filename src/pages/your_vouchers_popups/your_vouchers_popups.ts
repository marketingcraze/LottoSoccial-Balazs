import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';



@Component({
  selector: 'page-yourvoucherspopups',
  templateUrl: 'your_vouchers_popups.html'
})
export class your_vouchers_popups {
  VoucherCode:any;
  VCODE:String = "VOUCHERCODER"
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private viewctrl:ViewController,
              private navParms: NavParams,) {
    this.VoucherCode = this.navParms.get("VoucherCode")
    this.VCODE = this.navParms.get("VCODE")
    if(this.VCODE == undefined)
      {
        this.VCODE = "VOUCHERCODER"
      }
    console.log("VCODE value is " + this.VCODE)
   
  }

  dismissPopUp(data) {
    this.viewctrl.dismiss(data);
}
}






