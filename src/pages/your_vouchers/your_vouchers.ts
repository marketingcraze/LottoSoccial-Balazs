import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { your_vouchers_popups } from '../../pages/your_vouchers_popups/your_vouchers_popups';
import { YourOffersPage } from '../../pages/your-offers/your-offers'
import { VoucherService } from '../../services/voucherList_service'



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
  appList: any[] = [
    {},
  ];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private modalController: ModalController, public voucher_service: VoucherService,
    private loadingCtrl: LoadingController) {
    this.voucher_code = ""
    this.getVoucherListData()


  }
  getVoucherListData() {
    let loader = this._showLoader();
    this.voucher_service.getVoucherList().subscribe(
      data => {
        console.log("data is ", data.response[0].get_issued_voucher_code.response.voucher_code_details);
        this.appList = data.response[0].get_issued_voucher_code.response.voucher_code_details
        this.adjustListCount()
        loader.dismiss();
      },
      err => {
        console.log("error", err);
        loader.dismiss();
      }
    )

  }
  private _showLoader() {
    let loader = this.loadingCtrl.create({
      content: "Loading data..."
    });
    loader.present()
    return loader;
  }

  adjustListCount() {
    this.count = this.appList.length

    if (this.appList.length >= 3) {
      this.height = 240;
    }
    else {
      this.height = this.appList.length * 70;
    }
    console.log("entered" + this.height)

  }



  headerBtnClick() {
    this.h_1 = ""
    this.h_2 = ""
    this.count = 0;
  }
  voucherCodeClaimButton() {
    console.log("Voucher entered code is " + this.voucher_code)
    if(this.voucher_code ==""){
      let alert = this.alertCtrl.create({
        
        subTitle: 'Please Enter Voucher Code',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else{
    let modal = this.modalController.create(your_vouchers_popups, {
      VoucherCode: this.voucher_code
    })
    modal.present();
  }
  }
  selectedButtonID(index) {
    let modal = this.modalController.create(your_vouchers_popups, {
      VoucherDetail: this.appList[index].voucher_description,
      VoucherCode: this.appList[index].voucher_code

    })
    modal.present();

  }
  openOffersOfTheDay() {

    this.navCtrl.setRoot(YourOffersPage)
  }
  date() {
  }

}
