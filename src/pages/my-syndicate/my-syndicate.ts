import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Tabs, LoadingController } from 'ionic-angular';
import { ManageSyndicatePage } from '../manage-syndicate/manage-syndicate';
import { ManageSyndicate2Page } from '../manage-syndicate2/manage-syndicate2';
import { YourTicketsPage } from '../your-tickets/your-tickets';
import { SyndicateService } from '../../providers/syndicate-service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferService } from '../../services/offer.service';
import { CommonService } from '../../services/common.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

declare var $: any;

@Component({
    selector: 'page-my-syndicate',
    templateUrl: 'my-syndicate.html'
})
export class MySyndicatePage {
    @ViewChild("confirmPayment") confirmPayment;

    private syndArr = [];
    private toggled = [];
    userCards: any;
    userCardsCount:number = 0;
    customerToken:string;
    jackpotList:any
    jackpotGroup:any
    chatcount: any;
    customer_id:any;

    constructor(
        public app: App,
        public iab: InAppBrowser,
        public navParams: NavParams,
        public srvOffer: OfferService,
        public navCtrl: NavController,
        public appSound:AppSoundProvider,
        public _syndService: SyndicateService,
        public loadingCtrl: LoadingController) { 


        this.checkCardExists()
    }

    ionViewDidLoad() {
        this.customer_id = CommonService.session.customer_id;
        this.loadSyndicate();

    }
    ionViewWillEnter() {
    }
    checkwins() {
        this.appSound.play('buttonClick');
        var t: Tabs = this.navCtrl.parent;
        t.select(1);
    }
    manage_syndicates() {
        this.appSound.play('buttonClick');
        this.app.getRootNav().push(ManageSyndicatePage);
    }
    manage_syndicates2() {
        this.appSound.play('buttonClick');
        this.app.getRootNav().push(ManageSyndicate2Page);
    }
    viewTickets(i) {
        this.appSound.play('buttonClick');
        var grp = this.syndArr[i].product_group;
        var sid = this.syndArr[i].syndicate_id;
        var stype = this.syndArr[i].syndicate_type;
        this.app.getRootNav().push(YourTicketsPage, {'products':grp, 'synd':sid, 'stype':stype});
    }
    loadSyndicate() {
    let loader = this.loadingCtrl.create({
      content:"Please wait..."
    });
    loader.present();
    this._syndService.syndicateList().subscribe((res) => {
      console.log('syndicate list');
      loader.dismiss();
        this.syndArr = res.response[0].get_syndicate_list.response.syndicate_group;
        this.chatcount = res.response[0].get_syndicate_list.response.peepso_notification_count.data["ps-js-notifications"].count;
        if(this.chatcount >0){
            $(".ctNow").removeClass('pulse');
        }
        for(var i=0; i<this.syndArr.length; i++) {
          this.toggled.push(false);
        }
        this.toggled[0] = true;
      console.log(this.syndArr);
    })
  }

   toggleAcc(i) {
    this.appSound.play('buttonClick');
    this.toggled[i] = !this.toggled[i];
  }

    checkCardExists() {
        console.log("OffersPage::checkCardExists()");
        let loader = this._showLoader();

        this.srvOffer.getJackpotList().subscribe((data) => {
            console.log("OffersPage::getJackpotList() success", data);
            if (data.response && data.response[0].get_big_jackpot_list) {
                this.jackpotList = data.response[0].get_big_jackpot_list.response;
                this.customerToken = this.jackpotList.customer_token;
            }

            loader.dismiss();

        }, (err) => {
            console.log("OffersPage::getJackpotList() error", err);
            loader.dismiss();
        });
    }

    showPaymentOptions(syndicate) {
        console.log("OffersPage::showPaymentOptions()", syndicate);

        this.appSound.play('buttonClick');

        if (this.customerToken) {
            let opt: string = "toolbarposition=top";
            let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
            str += '&customer_id=1970400&customer_token=' + this.customerToken + '&Offer_ID=1188'
            this.iab.create(str, 'blank', opt);
        } else {
            let loader = this._showLoader();
            // get all the cards details
            this.srvOffer.getExistingPaymilCardsDetails().subscribe((data) => {
                console.log("OffersPage::showPaymentOptions() success", data);
                data.response.push({ syndicate: syndicate });
                this.userCards = data.response;
                loader.dismiss();
                this.confirmPayment.togglePopup();
            }, (err) => {
                console.log("OffersPage::showPaymentOptions() error", err);
                loader.dismiss();
            })
        }
    }

    chatNow(i) {
         if(this.chatcount > 0) {
            let opt: string = "toolbarposition=top";
            let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to='+this.syndArr[i].peepso_group_url;
            str += '&customer_id='+ this.customer_id+'&customer_token=' + this.customerToken ;
            this.iab.create(str, 'blank', opt);
         }
    }

    addMembers(){
        this.appSound.play('buttonClick');
    }

    private _showLoader() {
        let loader = this.loadingCtrl.create({
            content: "Loading data..."
        });
        loader.present()
        return loader;
    }


}
