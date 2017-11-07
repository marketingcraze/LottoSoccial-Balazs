import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { RedeemGamesPage } from '../../pages/redeem-games/redeem-games'
import { paymentService } from '../../services/paymentService'
import { Storage } from '@ionic/storage';
import { PlayGamePage } from '../play-games/play-games';


@Component({
  selector: 'page-get-games-modal',
  templateUrl: 'get-games-modal.html'
})
export class getGamesModal {
  disable: any;
  creditBalance: any;
  awardID: any;
  visitorId: any;
  productDetail: any;
  productName: any;
  productCount: any;

  VoucherCode: any;
  title: any;
  price: any;
  price_after: any;
  pointsLive:any;
  status: any = "Passed";
  statusBuy: any = "Passed";
  value: boolean = false;
  counter = 1;

  constructor(public navCtrl: NavController,
    private viewctrl: ViewController,
    private paymentSrv: paymentService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private changeDetect: ChangeDetectorRef,
    private modalController: ModalController,
    private navprms: NavParams) {
    storage.get('firstTimeLoad').then((firstTimeLoad: any) => {
      this.visitorId = firstTimeLoad;
      console.log('firstTimeLoad storage', firstTimeLoad);
    });
    this.VoucherCode = this.navprms.get("VoucherCode")
    this.price = this.navprms.get("price")
    this.pointsLive=this.price;
    this.title = this.navprms.get("title")
    this.price_after = this.navprms.get("price_after")
    this.status = this.navprms.get("p_staus")
    this.productName = this.navprms.get("p_name")
    this.productDetail = this.navprms.get("p_detail")
    this.awardID = this.navprms.get("p_award_id")
    this.creditBalance=this.navprms.get("cBalance");
    //this.creditBalance=60;
    console.log("status is " + this.status)

  }

  dismissPopUp(data: any = 1) {

    this.viewctrl.dismiss(data);
  }
  confirmpurchase() {
     
    this.productCount = this.counter;
    let loading = this.loadingCtrl.create();
    loading.present().then(() => {
      this.paymentSrv.redeemGame(this.visitorId, this.productCount, this.price, this.productName, this.productDetail, this.awardID).subscribe(data => {
        if (data) {
          loading.dismiss()
          var status = data.response[0].reward_payment_process.response.status
          if (status === "SUCCESS") {
            // this.value = true;
            this.value = false;
            this.statusBuy = 'FAILED';

          }
          else {
            this.value = false;
            this.statusBuy = 'FAILED';

          }

        }
      })
    })

  }
  closePopup() {
    this.navCtrl.popAll()
  }
  minusCounter() {
    if (this.counter != 1 && this.price<=this.creditBalance) {
       
      this.disable=document.getElementById("imgPlus");
      this.disable.style.filter="opacity(1) drop-shadow(0 0 0 red)"
      this.counter--;
      this.price = this.pointsLive * this.counter;
      this.changeDetect.detectChanges();
    }
  }
  plusCounter() {
    if (this.counter < 5 && this.price!=this.creditBalance) {
       
      this.counter++;
      this.price = this.pointsLive * this.counter;
      this.changeDetect.detectChanges();
    }
    else if(this.price>=this.creditBalance ){
      debugger
      this.disable=document.getElementById("imgPlus");
      this.disable.style.filter="opacity(0.5) drop-shadow(0 0 0 gray)"
      // this.disable="opacity(0.5) drop-shadow(0 0 0 gray)";
    }

  }
  moveToPlayGame(){
    this.navCtrl.popAll();
    this.navCtrl.push(PlayGamePage,{game:"kjshdfjusdgf"})
  }
}






