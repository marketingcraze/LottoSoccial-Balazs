import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { SyndicateService } from '../../providers/syndicate-service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CommonService } from '../../services/common.service';
import { OfferService } from '../../services/offer.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

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
  
  dataArr = [];
  syndId: any;
  offerArr = [];

    userCards: any;
    userCardsCount:number = 0;
    customerToken:string;


  constructor(public navCtrl: NavController, 
      public iab: InAppBrowser,
      public navParams: NavParams, 
      public srvOffer: OfferService,
      public appSound:AppSoundProvider,
      public _syndService: SyndicateService, public loadingCtrl: LoadingController) {

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
      console.log("ConfirmNumberPage", res);
      this.offerArr = res.response[0].get_big_jackpot_list.response.rollover_jackpot_group;
      this.offerArr = this.offerArr.concat(res.response[1].get_special_offer_details.response.product_group);
      console.log(this.offerArr);
    })
  }

  showPaymentOptions() {
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
            content: "Loading data..."
        });
        loader.present()
        return loader;
    }

    // -------------------   slider   -----------------------
    slide = $('.slider-single');
    slideTotal;
    slideCurrent = -1;
    slideInitial() {
        this.slide = $('.slider-single');
        this.slideTotal = this.slide.length - 1;
        this.slideCurrent = -1;
        
        this.slide.addClass('proactivede');
        this.slideRight();
    }

    slideRight() {
        if (this.slideCurrent < this.slideTotal) {
          this.slideCurrent++;
        } else {
          this.slideCurrent = 0;
        }

        if (this.slideCurrent > 0) {
          var preactiveSlide = this.slide.eq(this.slideCurrent - 1);
        } else {
          var preactiveSlide = this.slide.eq(this.slideTotal);
        }
        var activeSlide = this.slide.eq(this.slideCurrent);
        if (this.slideCurrent < this.slideTotal) {
          var proactiveSlide = this.slide.eq(this.slideCurrent + 1);
        } else {
          var proactiveSlide = this.slide.eq(0);
        }

        this.slide.each(function() {
            var thisSlide = $(this);
            if (thisSlide.hasClass('preactivede')) {
                thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
            }
            if (thisSlide.hasClass('preactive')) {
                thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
            }
        });
        preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
        activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
        proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
        this.appSound.play('cardFlip');
    }

    slideLeft() {
        if (this.slideCurrent > 0) {
          this.slideCurrent--;
        } else {
          this.slideCurrent = this.slideTotal;
        }

        if (this.slideCurrent < this.slideTotal) {
          var proactiveSlide = this.slide.eq(this.slideCurrent + 1);
        } else {
          var proactiveSlide = this.slide.eq(0);
        }
        var activeSlide = this.slide.eq(this.slideCurrent);
        if (this.slideCurrent > 0) {
          var preactiveSlide = this.slide.eq(this.slideCurrent - 1);
        } else {
          var preactiveSlide = this.slide.eq(this.slideTotal);
        }
        this.slide.each(function() {
          var thisSlide = $(this);
          if (thisSlide.hasClass('proactivede')) {
            thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
          }
          if (thisSlide.hasClass('proactive')) {
            thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
          }
        });
        preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
        activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
        proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
        this.appSound.play('cardFlip');
    }

    swipeLeft(ev) {
        this.slideRight();
    }

    swipeRight(ev) {
        this.slideLeft();
    }

}
