import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Slides, AlertController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { SyndicateService } from '../../providers/syndicate-service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CommonService } from '../../services/common.service';
import { OfferService } from '../../services/offer.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { SimpleTimer } from 'ng2-simple-timer';

import { HomePage } from '../home/home';
declare var $: any;
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
    @ViewChild("confirmPayment") confirmPayment;
    @ViewChild(Slides) slides: Slides;
  
  dataArr = [];
  syndId: any;
  offerArr = [];
  propertyArr = [];
  TotalPaybale = 0;
  syndicatePrice = 0;
  offerSelected = false


    userCards: any;
    userCardsCount:number = 0;
    customerToken:string;

    private currentTime:Date = new Date();

    result: any = [];
    resultDate: any = [];
    counter0 = 0;
	timer0Id: string;
	timer0button = 'Subscribe';
    count:number;
    day:any;
    hrs:any;
    min:any;
    sec:any;
    alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","z"]

  constructor(public navCtrl: NavController, 
      public iab: InAppBrowser,
      public navParams: NavParams, 
      public srvOffer: OfferService,
      public appSound:AppSoundProvider,
      public _syndService: SyndicateService,
      public loadingCtrl: LoadingController,
      private st: SimpleTimer,
      public alertCtrl: AlertController) {

    this.dataArr = JSON.parse(localStorage.getItem('numberData'));
    for (var i=0; i<this.dataArr.length; i++) {
      this.syndicatePrice = this.syndicatePrice + (this.dataArr[i].value * this.dataArr[i].line_count * this.dataArr[i].draw_day.length)
    }
    this.TotalPaybale = this.syndicatePrice;
    this.syndId = localStorage.getItem('synd_id');
    console.log(this.dataArr);
  }

  ionViewDidLoad() {
    this.getbigjack(this.syndId)
  }

  next() {
    var count = 0;
    for(var i=0; i<this.offerArr.length; i++) {
      if(this.offerArr[i].selected) {
        count++;
      }
    }
    if(count > 0) {
      this.buysyndicate();
    }else {
      this.showConfirm();
    }   
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
      spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
    loader.present();
    this._syndService.getBigJack(id).subscribe((res) => {
      loader.dismiss();
      console.log("ConfirmNumberPage", res);
      this.offerArr = res.response[2].get_private_syndicate_offers.response
      this.offerArr = this.offerArr.concat(res.response[1].get_big_jackpot_list.response.rollover_jackpot_group)
      this.propertyArr = res.response["0"].fetch_lottery_products.response.lottery_product_data;
      for(var i=0; i<this.offerArr.length; i++) {
        for(var j=0; j<this.propertyArr.length; j++) {
          if(this.offerArr[i].product_category.toLowerCase() == this.propertyArr[j].product_name) {
            this.offerArr[i].product_details = this.propertyArr[j]
            this.offerArr[i].selected = false
          }
        }
      }
      // this.offerArr = this.offerArr.concat(res.response[0].get_big_jackpot_list.response.rollover_jackpot_group);
      console.log(this.offerArr);
      this.st.newTimer('1sec', 1);
      this.subscribeTimer0(0);
                        
      // updates every seconds
      setInterval(() => {
          this.currentTime = new Date();
      }, 1000);
    })
  }

  showPaymentOptions() {
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
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
      "session_ID": CommonService.sessionId,
      "page_ID": "4",
      "screen_id": "4.9",
      "action": "syndicate_buy",
      "website": "Lotto Social",
      "website_id": "27",
      "source_site": "mobi.lottosocial.com",
      "module_name": "save_private_syndicate_tickets",
      "customer_id": CommonService.session.customer_id,
      "private_syndicate_id": this.syndId,
      "product_group": arr,
      "trigger_action": "ACTIVATE/DEACTIVATE",
      "rollover_prosub_id": "2236",
      "rollover_offer_id": "1851"
    }

    this._syndService.buySyndicate(data).subscribe((res) => {
      console.log(res);
      loader.dismiss();
      
    })
  }



    buysyndicate() {
        console.log("ConfirmNumberPage::showPaymentOptions()");
        let offer = {total_cost:9.00} ;

        this.appSound.play('buttonClick');
        
        let loader = this._showLoader();
        // get all the cards details
        this.srvOffer.getExistingPaymilCardsDetails().subscribe((data) => {
            console.log("ConfirmNumberPage::showPaymentOptions() success", data);

            data.response.push({ offer: offer });
            this.userCards = data.response;

            console.log("ConfirmNumberPage::showPaymentOptions() success", this.userCards);
            loader.dismiss();
            this.confirmPayment.togglePopup()
            
        }, (err) => {
            console.log("ConfirmNumberPage::showPaymentOptions() error", err);
            loader.dismiss();
        });
        
    }

    onPaymentComplete(){
        console.log("ConfirmNumberPage::onPaymentComplete");
        this.navCtrl.setRoot(HomePage);
    }


    private _showLoader() {
        let loader = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        loader.present()
        return loader;
    }

    //countDown timer

subscribeTimer0(i:any) {

    if (this.timer0Id) {

        // Unsubscribe if timer Id is defined
        this.st.unsubscribe(this.timer0Id);
        this.timer0Id = undefined;
        this.timer0button = 'Subscribe';
        console.log('timer 0 Unsubscribed.');
    } else {

        // Subscribe if timer Id is undefined
        this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback(this.offerArr[i]));
        this.timer0button = 'Unsubscribe';
        console.log('timer 0 Subscribed.');
    }
    console.log(this.st.getSubscription());
}
changesubscribeTimer0(i:any) {

        this.st.unsubscribe(this.timer0Id);
        this.timer0Id = undefined;
        this.timer0button = 'Subscribe';
        console.log('timer 0 Unsubscribed.');

        // Subscribe if timer Id is undefined
        this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback(this.offerArr[i]));
        this.timer0button = 'Unsubscribe';
        console.log('timer 0 Subscribed.');
}

timer0callback(data) {

        var value: any = data.product_details.draw_countdown
        this.result = "";


        let now = new Date().getTime();
        if (!value) {
            return this.result;
        }
        if (typeof (value) === "string") {
            value = new Date(value);
        }

        let delta = Math.floor((now - value.getTime()) / 1000);
        if (delta < 0) {
            delta = Math.abs(delta);
        }

        let day = Math.floor(delta / 86400);
        delta %= 86400
        let hour = Math.floor(delta / 3600);
        delta %= 3600
        let minute = Math.floor(delta / 60);
        delta %= 60
        let seconds = Math.floor(delta)
        this.day = (day <= 9) ? '0' + day + '' : day + '';
        this.hrs = (hour <= 9) ? '0' + hour + '' : hour + '';
        this.min = (minute <= 9) ? '0' + minute + '' : minute + '';
        this.sec = (seconds <= 9) ? '0' + seconds : seconds;

}

  slideChanged(ev:any) {
    console.log('active slide', ev.realIndex);
    this.changesubscribeTimer0(ev.realIndex)
    this.appSound.play('cardFlip');
  }
  nextSlide() {
    this.slides.slideNext()
  }
  close() {
    this.navCtrl.pop();
  }

  selecetOffer(i:any) {
    this.TotalPaybale = this.syndicatePrice
    this.offerArr[i].selected = !this.offerArr[i].selected
    for(var j=0; j<this.offerArr.length; j++) {
      if(this.offerArr[j].selected) {
        if(this.offerArr[j].app_lines) {
          if(this.offerArr[j].product_price == '') {
           this.TotalPaybale = this.TotalPaybale + 0
          }else {
           this.TotalPaybale = this.TotalPaybale + parseFloat(this.offerArr[j].product_price)
          }
        }else {
          if(this.offerArr[j].package_price == '') {
           this.TotalPaybale = this.TotalPaybale + 0
          }else {
           this.TotalPaybale = this.TotalPaybale + parseFloat(this.offerArr[j].package_price)
          }
        }
      }
    }

    var count = 0;
    for(var ii=0; ii<this.offerArr.length; ii++) {
      if(this.offerArr[ii].selected) {
        count++;
      }
    }
    if(count > 0) {
      this.offerSelected = true
    }else {
      this.offerSelected = false
    }   
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you don’t want our special offers',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('no clicked')
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.buysyndicate();
          }
        }
      ]
    });
    confirm.present();
  }

  skip() {
    this.navCtrl.setRoot(HomePage)
  }

}
