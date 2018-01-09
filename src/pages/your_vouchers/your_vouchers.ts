import { Component, OnInit } from '@angular/core';
import { NavController, Tabs, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { your_vouchers_popups } from '../../pages/your_vouchers_popups/your_vouchers_popups';
import { YourOffersPage } from '../../pages/your-offers/your-offers'
import { VoucherService } from '../../services/voucherList_service'
import { SimpleTimer } from 'ng2-simple-timer';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';


@Component({
  selector: 'page-yourvouchers',
  templateUrl: 'your_vouchers.html'
})
export class your_vouchers {

  count = 0;
  h_1 = "VIEW EMPTY";
  h_2 = "STATE";
  voucher_code: String;
  height: any;
  service_data: any;
  result: any = [];
  resultDate: any = [];
  mobileNumber: any;

  countVoucher: any;
  appList: any = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private modalController: ModalController,
    public appSound: AppSoundProvider,
    public voucher_service: VoucherService,
    private loadingCtrl: LoadingController, private timerInstance: SimpleTimer, ) {
    this.voucher_code = ""
  }

  ngOnInit() {
    this.loadVouchers()
  }

  loadVouchers() {
    let loader = this._showLoader();
    this.voucher_code = ""
    this.voucher_service.getVoucherList().subscribe(
      data => {
        if (data.response[1].get_issued_voucher_code) {
          this.appList = data.response[1].get_issued_voucher_code.response.voucher_code_details
          this.mobileNumber = data.response[0].get_customer_details.response.mobile_number
          debugger
          console.log("mobile number is ", this.mobileNumber)
          this.adjustListCount()
          this.timerInstance.newTimer('1min', 1);
          this.subscribeTimer0()
        }

        loader.dismiss()
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
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    loader.present()
    return loader;
  }

  adjustListCount() {

    if (this.appList) {
      this.count = this.appList.length
      this.height = this.appList.length * 78;
    }

  }
  headerBtnClick() {
    this.h_1 = ""
    this.h_2 = ""
    this.count = 0;
  }
  voucherCodeClaimButton() {
    this.appSound.play('buttonClick');
   // document.getElementById('img').className ='red1';
    console.log("Voucher entered code is " + this.voucher_code)
    if (this.voucher_code == "") {
      let alert = this.alertCtrl.create({

        subTitle: 'Please Enter Voucher Code',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else {
      let modal = this.modalController.create(your_vouchers_popups, {
        VoucherCode: this.voucher_code,
        mobileNumbr: this.mobileNumber
      })
      modal.present();
      modal.onDidDismiss(data => {
        if (data) {
          this.loadVouchers()
        }

      })
    }

  }
  selectedButtonID(index) {
    this.appSound.play('buttonClick');
    let modal = this.modalController.create(your_vouchers_popups, {
      VoucherDetail: this.appList[index].voucher_description,
      VoucherCode: this.appList[index].voucher_code,
      mobileNumbr: this.mobileNumber
    })
    modal.onDidDismiss(data => {
      if (data) {
        this.loadVouchers()
      }
    })
    modal.present();
  }

  openOffersOfTheDay() {
    var tabs: Tabs = this.navCtrl.parent;
    tabs.select(4);
  }

  date() {
  }
  subscribeTimer0() {

    if (this.timer0Id) {

      // Unsubscribe if timer Id is defined
      this.timerInstance.unsubscribe(this.timer0Id);
      this.timer0Id = undefined;
      this.timer0button = 'Subscribe';
      console.log('timer 0 Unsubscribed.');
    } else {

      // Subscribe if timer Id is undefined
      if (this.appList) {
        this.timer0Id = this.timerInstance.subscribe('1sec', () => this.timercallback(this.appList));
      }
      this.timer0button = 'Unsubscribe';
      console.log('timer 0 Subscribed.');
    }
    console.log(this.timerInstance.getSubscription());
  }
  counter0 = 0;
  timer0Id: string;
  timer0button = 'Subscribe';





  timercallback(data): string {
    this.resultDate = [];



    for (var i = 0; i < data.length; i++) {
      var value: any = data[i].expiry_date
      this.result = "";


      let now = new Date().getTime();
      if (!value) {
        return this.result;
      }
      //value = "Tue 12 sep 17 9:00:00"
      if (typeof (value) === "string") {
        value = new Date(value);
      }

      let delta = Math.floor((now - value.getTime()) / 1000);
      if (delta < 0) {
        this.result = ""
        delta = Math.abs(delta);
      }


      let day = Math.floor(delta / 86400);

      delta %= 86400
      let hour = Math.floor(delta / 3600);
      delta %= 3600
      let minute = Math.floor(delta / 60);
      delta %= 60
      let seconds = Math.floor(delta)



      this.result += (day <= 9) ? '0' + day + 'd ' + ' ' : day + 'd ' + ' ';

      this.result += (hour <= 9) ? '0' + hour + 'h ' + ' ' : hour + 'h ' + ' ';
      this.result += (minute <= 9) ? '0' + minute + 'm' : minute + 'm';
      //this.result += (seconds <= 9) ? '0' + seconds : seconds;

      this.resultDate.push(this.result)


    }
    return this.resultDate
  }




}
