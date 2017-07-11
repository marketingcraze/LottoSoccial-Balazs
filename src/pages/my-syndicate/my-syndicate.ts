import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Tabs, LoadingController } from 'ionic-angular';
import { ManageSyndicatePage } from '../manage-syndicate/manage-syndicate';
import { ManageSyndicate2Page } from '../manage-syndicate2/manage-syndicate2';
import { YourTicketsPage } from '../your-tickets/your-tickets';
import { SyndicateService } from '../../providers/syndicate-service';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferService } from '../../services/offer.service';

declare var $: any;

@Component({
    selector: 'page-my-syndicate',
    templateUrl: 'my-syndicate.html'
})
export class MySyndicatePage {
    @ViewChild("confirmPayment") confirmPayment;

    private syndArr = [];

    userCards: any;
    userCardsCount:number = 0;
    customerToken:string;
    jackpotList:any
    jackpotGroup:any

    constructor(
        public app: App,
        public iab: InAppBrowser,
        public navParams: NavParams,
        public srvOffer: OfferService,
        public navCtrl: NavController,
        public _syndService: SyndicateService,
        public loadingCtrl: LoadingController) { 


        this.checkCardExists()
    }

    ionViewDidLoad() {
        this.loadSyndicate();
        $('#estate').hide();
        $('#sstate').show();
    }
    ionViewWillEnter() {
        $('#estate').hide();
        $('#sstate').show();
    }
    checkwins() {
        var t: Tabs = this.navCtrl.parent;
        t.select(1);
    }
    manage_syndicates() {
        this.app.getRootNav().push(ManageSyndicatePage);
    }
    manage_syndicates2() {
        this.app.getRootNav().push(ManageSyndicate2Page);
    }
    viewTickets() {
        this.app.getRootNav().push(YourTicketsPage);
    }
    loadSyndicate() {
        this._syndService.syndicateList().subscribe((res) => {
            console.log('syndicate list');
            if (res.response.response.status == 'SUCCESS') {
                this.syndArr = res.response.response.syndicate_group;
            }
            console.log(this.syndArr);
        })
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
                this.confirmPayment.togglePopup()
            }, (err) => {
                console.log("OffersPage::showPaymentOptions() error", err);
                loader.dismiss();
            })
        }
    }

    private _showLoader() {
        let loader = this.loadingCtrl.create({
            content: "Loading data..."
        });
        loader.present()
        return loader;
    }


}
