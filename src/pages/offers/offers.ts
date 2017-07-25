import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { OfferService } from '../../services/offer.service';
import { Params } from '../../services/params';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {
  @ViewChild("confirmPayment") confirmPayment;

  toptab: string = "offer";

  userCards: any;
  userCardsCount: number = 0;
  customerToken: string;
  jackpotList: any
  jackpotGroup: any


  credit_lines: any;
  credit_offer: any;
  credit_filter_line: any;
  credit_filter_draw: any;
  credit_filter_day: any;

  fetch_lines: any;
  fetch_offer: any;
  fetch_filter_line: any;
  fetch_filter_draw: any;
  fetch_filter_day: any;
  drawdaytue: any = "#2F76F1";
  drawdayfri: any = "#AAAAAA";
  drawdaywed: any = "#FF0000";
  drawdaysat: any = "#AAAAAA";
  Credit_Points: any;

  spaceBetween: number;

  constructor(
    public platform: Platform,
    public params: Params,
    public iab: InAppBrowser,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authSrv: AuthService,
    public srvOffer: OfferService,
    public commonSrv: CommonService,
    public appSound: AppSoundProvider,
    public loadingCtrl: LoadingController) {

    this.spaceBetween = Math.floor(platform.width() * -0.22);

    //   this.spaceBetween = Math.floor( platform.width() * -0.14 );
    this.checkCardExists();
  }

  checkCardExists() {
    console.log("OffersPage::checkCardExists()");
    let loader = this._showLoader();

    this.srvOffer.getJackpotList().subscribe((data) => {
      console.log("OffersPage::getJackpotList() success", data);
      if (data.response && data.response[0]
        && data.response[0].get_big_jackpot_list) {
        this.jackpotList = data.response[0].get_big_jackpot_list.response;
        this.customerToken = this.jackpotList.customer_token;
      }

      loader.dismiss();

    }, (err) => {
      console.log("OffersPage::getJackpotList() error", err);
      loader.dismiss();
    })
  }

  showPaymentOptions() {
    console.log("OffersPage::showPaymentOptions()");
    let offer = { total_cost: 4.99 };

    this.appSound.play('buttonClick');
    if (this.customerToken) {
      this.goPaymentWebview();
    } else {
      let loader = this._showLoader();
      // get all the cards details
      this.srvOffer.getExistingPaymilCardsDetails().subscribe((data) => {
        console.log("OffersPage::showPaymentOptions() success", data);
        let token_exists = 0;
        for (var i = 0; i < data.response.length; ++i) {
          if (data.response[i].get_customer_paymill_card_details) {
            token_exists = data.response[i].get_customer_paymill_card_details.response.token_exists
          }
        }

        if (token_exists > 0) {
          data.response.push({ offer: offer });
          this.userCards = data.response;
          console.log("OffersPage::showPaymentOptions() success", this.userCards);
          loader.dismiss();
          this.confirmPayment.togglePopup()
        } else {
          this.goPaymentWebview();
        }

      }, (err) => {
        console.log("OffersPage::showPaymentOptions() error", err);
        loader.dismiss();
      })
    }
  }
  tabChanged() {
    // console.log("OffersPage::tabChanged()");
    this.appSound.play('menuClick');
  }

  goPaymentWebview() {
    let opt: string = "toolbarposition=top";
    let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
    str += '&customer_id=' + CommonService.session.customer_id + '&customer_token=' + this.customerToken + '&Offer_ID=1188'
    this.iab.create(str, 'blank', opt);
  }

  private _showLoader() {
    let loader = this.loadingCtrl.create({
      content: "Loading data..."
    });
    loader.present()
    return loader;
  }


  wed(drawday) {
    this.fetch_filter_draw = drawday;
    this.fetch_filter_day = "Wednesday";
    this.drawdaywed = "#FF0000";
    this.drawdaysat = "#AAAAAA";
  }
  tue(drawday) {
    this.credit_filter_draw = "Tue";
    console.log();
    this.credit_filter_day = "Tuesday";
    this.drawdaytue = "#2F76D1";
    this.drawdayfri = "#AAAAAA";
  }
  fri(drawday) {
    this.credit_filter_draw = drawday;
    this.credit_filter_day = "Friday";
    this.drawdayfri = "#2F76D1";
    this.drawdaytue = "#AAAAAA";
  }
  sat(drawday) {
    this.fetch_filter_draw = drawday;
    this.fetch_filter_day = "Saturday";
    this.drawdaywed = "#AAAAAA";
    this.drawdaysat = "#FF0000";
  }


  credit_line(line) {
    this.credit_filter_line = parseInt(line);
  }
  fetch_line(line) {
    this.fetch_filter_line = parseInt(line);
  }

  ionViewWillEnter() {
    this.credit_filter_line = 1;
    this.credit_filter_draw = "Tue";
    this.credit_filter_day = "Tuesday";
    this.fetch_filter_line = 1;
    this.fetch_filter_draw = "Wed";
    this.fetch_filter_day = "Wednesday";

    this.commonSrv.trackSegmentPage("Offer", "OffersPage").subscribe(
      data => {
        console.log("track segment called");
      },
      err => {
      },
      () => { }
    );

    this.authSrv.get_credit_offer().subscribe(data => {
      this.credit_lines = data.response.response.product[0];
      this.credit_offer = data.response.response.offers;
      console.log("get_credit_offer", data);
    },
      err => {
        console.log("error", err);
      },
      () => console.log("offer dislpay sucesss")
    );

    this.authSrv.get_fetch_offer().subscribe(data => {
      this.fetch_lines = data.response.response.product[3];
      this.fetch_offer = data.response.response.offers;
      console.log("dd", data)
    },
      err => {
        console.log("error", err);
      },
      () => console.log("offer dislpay sucesss")
    );

    this.authSrv.get_Credit_Points().subscribe(data => {
      this.Credit_Points = data.response.response.bonus_credit;
    },
      err => {
        console.log("error", err);
      },
      () => console.log("creadit points get successfully")
    );

  }
}


