import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { VoucherService } from '../../services/voucherList_service'
declare var $: any;


@Component({
  selector: 'page-yourvoucherspopups',
  templateUrl: 'your_vouchers_popups.html'
})
export class your_vouchers_popups {
  show: boolean=false;
  VoucherCode: any = "";
  VoucherCodeDescription: any = "";

  value: any = 0
  VCODE: String = "VOUCHERCODER"
  mobileNumber: any = "";
  middleData: any = "";
  lottoMiddleJson: any = "";
  sucessState: any = "";
  gift_status: any = "";
  contentHeight: any = "";
  shButton:any= 0

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private viewctrl: ViewController,
    private navParms: NavParams, public voucher_service: VoucherService, private loadingCtrl: LoadingController) {
    this.VoucherCode = this.navParms.get("VoucherCode")
    this.VoucherCodeDescription = this.navParms.get("VoucherDetail")
    this.VCODE = this.navParms.get("VCODE")
    this.mobileNumber = this.navParms.get("mobileNumbr")
    console.log("voucher code is ", this.VoucherCode)
    console.log("mobile Number is ", this.mobileNumber)




    // if(this.VCODE == undefined)
    //   {
    //     this.VCODE = "VOUCHERCODER"
    //   }
    // console.log("VCODE value is " + this.VCODE)


  }
  ionEnter() {

    //  this.contentHeight = $("#list").height + 80; //50 added for top and bottom margin
    // console.log("main height is ", this.contentHeight)
    // console.log("height is ", document.getElementById('list').getBoundingClientRect().height + 40)   
    // console.log("height is ", document.getElementById('list').scrollHeight + 40)   
    // console.log("height is ",document.getElementById('list').offsetHeight + 40)   
    // console.log($("#list").height());
    // console.log($("#list").innerHeight());
    // console.log($("#list").outerHeight());

  }
  ionViewWillUnload() {
    this.contentHeight = 0;
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  ionViewWillEnter() {
    let loader = this._showLoader();
    this.voucher_service.getPopUpVoucherData(this.mobileNumber, this.VoucherCode).subscribe(
      data => {
        this.middleData = data.response[0].voucher_validation.response.Voucher_description;
        this.gift_status = data.response[0].voucher_validation.response.gift_status;

        this.lottoMiddleJson = this.middleData.split("#");
        if(data.response[0].voucher_validation.response.status == "1")
        {
          this.shButton = 1
        }
        else{
          this.shButton = 0
        }
        debugger
        this.delay(300);
        this.ionEnter();
        loader.dismiss()
        this.show = true;

      },
      err => {
        console.log("error", err);
        loader.dismiss();
      }
    )

  }
  private _showLoader() {
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
    loader.present()
    return loader;
  }

  dismissPopUp(data) {
    this.viewctrl.dismiss(data);
  }
  done() {



    this.callSucessAPI()
  }
  callSucessAPI() {
    let loader = this._showLoader();
    this.voucher_service.getPopUpVoucherSucess(this.mobileNumber, this.VoucherCode, this.gift_status).subscribe(
      data => {

        this.sucessState = data.response[0].save_gift_voucher.response.status
        console.log("before sucess the voucher code is ", this.VoucherCode)
        console.log("before sucess the mobile number is ", this.mobileNumber)
        console.log("before sucess the gift status is ", this.gift_status)


        if (this.sucessState == "SUCCESS") {
          this.value = "1"
        }
        else {
          this.value = "2"
        }
        loader.dismiss()
      },
      err => {
        console.log("error", err);
        loader.dismiss();
      }
    )
  }
  moveToVouchers() {
    debugger;
    var data = { "foo": "foo" }
    this.viewctrl.dismiss(data);
  }
  close() {
    this.navCtrl.popAll();
  }

}






