import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';



@Component({
  selector: 'page-confirm-offer-purchase',
  templateUrl: 'confirm-offer-purchase.html'
})
export class confirmOfferPurchasePage {
  VoucherCode: any;
  value: boolean = false;
  counter = 0;
  check1:boolean = true
  check2:boolean = true
  check3:boolean = true
  allChecked:boolean = true
  

  constructor(public navCtrl: NavController,
    private viewctrl: ViewController,
    private modalController: ModalController,
    private navprms: NavParams) {
    this.VoucherCode = this.navprms.get("VoucherCode")
    console.log("payment page")
        this.check2 = false
        this.check3 = false
        this.check1 = true

    
  }
  select(str){

    console.log("item is ", str)
    if(str == 'first'){
        this.check2 = false
        this.check3 = false
        this.check1 = true
    }
    if(str == 'second'){
        this.check1 = false
        this.check3 = false
        this.check2 = true
    }
    if(str == 'third'){
        this.check1 = false
        this.check2 = false
        this.check3 = true
    }

    

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






