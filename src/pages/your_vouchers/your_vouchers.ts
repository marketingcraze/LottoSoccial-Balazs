import { Component } from '@angular/core';
import { NavController, AlertController , ModalController} from 'ionic-angular';
import { your_vouchers_popups } from '../../pages/your_vouchers_popups/your_vouchers_popups';



@Component({
  selector: 'page-yourvouchers',
  templateUrl: 'your_vouchers.html'
})
export class your_vouchers {

  count = 0;
  h_1 = "VIEW EMPTY";
  h_2 = "STATE";
  voucher_code:String;
  VCODE:String;

  appList: any[] = [
    {
      "ID": "1",
      "url": 'assets/img/voucher_ico.png',
      "content": "Lottary Taps, play all week long for a reduced price",
    },
    {
      "ID": "2",
      "url": 'assets/img/voucher_ico.png',
      "content": "50 Reward Points, sorry for the inconvenience",
    },
    {
      "ID": "2",
      "url": 'assets/img/voucher_ico.png',
      "content": "Enjoy 5 FREE lines in superenalotto",
    }

  ];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private modalController:ModalController) {
    this.voucher_code = ""

  }
  ionViewDidEnter() {
    this.count = this.appList.length
    console.log("entered" + this.appList.length)
  }

  headerBtnClick() {
    this.h_1 = ""
    this.h_2 = ""
    this.count = 0;
  }
  voucherCodeClaimButton()
	{
    console.log("Voucher entered code is "+ this.voucher_code)
		let modal = this.modalController.create(your_vouchers_popups ,{
      VoucherCode: "Lottary Taps, play all week long for a reduced price",
      VCODE: this.voucher_code
      //VoucherCode: this.voucher_code
		})
		modal.present();
	}
  selectedButtonID(index){
   let modal = this.modalController.create(your_vouchers_popups ,{
      	VoucherCode: this.appList[index].content
      })
      modal.present();
  
  }
  
}
