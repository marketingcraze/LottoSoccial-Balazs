import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { SyndicateService } from '../../providers/syndicate-service';
/*
  Generated class for the ConfirmNumber page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirm-number',
  templateUrl: 'confirm-number.html'
})
export class ConfirmNumberPage {
  
  dataArr = []
  syndId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _syndService: SyndicateService, public loadingCtrl: LoadingController) {
    this.dataArr = JSON.parse(localStorage.getItem('numberData'));
    this.syndId = localStorage.getItem('synd_id');
    console.log(this.dataArr);
  }

  ionViewDidLoad() {
    this.getbigjack(this.syndId)
  }

  next() {
    this.buysyndicate();
  }

  small(index, c) {
    if(index<5) {
      return c 
    }else {
      return undefined;
    }
  }

  getbigjack(id:any) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._syndService.getBigJack(id).subscribe((res) => {
      loader.dismiss();
      console.log(res);
    })
  }

  buysyndicate() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    var arr = [];    
    for(var i=0; i<this.dataArr.length; i++) {
      var name = this.dataArr[i].product_name;
      var tickets = {};
      for(var j=0; j< this.dataArr[i].lines.length; j++) {
        tickets["ticket"+(j+1)] = this.dataArr[i].lines[j].toString()
      }
      arr.push({
        "product_name": name,
        "ticket_group": tickets
      })
    }
    var data = {
      "session_ID": "avjtjgu0f257f0orggqufcn5g2",
      "page_ID": "4",
      "screen_id": "4.9",
      "action": "syndicate_buy",
      "website": "Lotto Social",
      "website_id": "27",
      "source_site": "mobi.lottosocial.com",
      "module_name": "save_private_syndicate_tickets",
      "customer_id": "1970400",
      "private_syndicate_id": this.syndId,
      "product_group": arr,
      "trigger_action": "ACTIVATE/DEACTIVATE",
      "rollover_prosub_id": "2236",
      "rollover_offer_id": "1851"
    }

    this._syndService.buySyndicate(data).subscribe((res) => {
      console.log(res);
      loader.dismiss();
      this.navCtrl.push(PaymentPage);
    })
  }

}
