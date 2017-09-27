import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { RedeemGamesPage } from '../../pages/redeem-games/redeem-games'


@Component({
  selector: 'page-get-games-modal',
  templateUrl: 'get-games-modal.html'
})
export class getGamesModal {
  VoucherCode: any;
  title:any;
  price:any;
  price_after:any;
  status:any= "Passed";
  value: boolean = false;
  counter = 0;

  constructor(public navCtrl: NavController,
    private viewctrl: ViewController,
    private modalController: ModalController,
    private navprms: NavParams) {
        this.VoucherCode = this.navprms.get("VoucherCode")
        this.price = this.navprms.get("price")
        this.title = this.navprms.get("title")
        this.price_after = this.navprms.get("price_after")
        this.status = this.navprms.get("p_staus")
        console.log("status is " + this.status)

       
  }

  dismissPopUp(data) {
  
    this.viewctrl.dismiss(data);
  }
  done() {
    this.value = true
 }
  moveToVouchers() {
    this.navCtrl.popAll()
  }
  minusCounter(){
    if(this.counter != 0){
    this.counter--;
    }
  }
  plusCounter(){
    this.counter++;
  }
}






