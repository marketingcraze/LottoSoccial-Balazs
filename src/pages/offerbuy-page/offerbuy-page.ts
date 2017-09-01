import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { productOffer } from '../../services/productoffer.service';
import { OfferService } from '../../services/offer.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'offer-buy',
    templateUrl: 'offerbuy-page.html'
})
export class offerBuy {

    credit_offer: any;
    product: any
    credit_filter_line: any = 0;
    parseInt: any = parseInt;
    position: any = 0;
    credit_filter_draw: any = 0;
    slider: any;
    loading: any;
    offersForYou: any;
    productName: any;
    countDown: any;
    TimeLeft: string;
    day: any;
    hrs: any;
    mins: any;
    sec: any;
    check: boolean = false;
    visitorId: any;
    buyoffer: any;
    buyOfferStatus: any;

    constructor(private offerBuyData: productOffer,
        private loadingCtrl: LoadingController,
        private storage: Storage,
        private offerService: OfferService,
        private navprms: NavParams, ) {
        debugger;
        this.TimeLeft = navprms.get("Time");
        if (this.TimeLeft.length == 25) {
            this.day = this.TimeLeft.substring(14, 16);
            this.hrs = this.TimeLeft.substring(17, 19);
            this.mins = this.TimeLeft.substring(20, 22);
            this.sec = this.TimeLeft.substring(23, 25);
        }
        else if (this.TimeLeft.length == 21) {
            this.day = '00';
            this.hrs = this.TimeLeft.substring(13, 15);
            this.mins = this.TimeLeft.substring(16, 18);
            this.sec = this.TimeLeft.substring(19, 21);
        }
        else if (this.TimeLeft.length == 17) {
            this.day = '00';
            this.hrs = '00';
            this.mins = this.TimeLeft.substring(12, 14);
            this.sec = this.TimeLeft.substring(15, 17);
        }
        else if (this.TimeLeft.length == 13) {
            this.day = '00';
            this.hrs = '00';
            this.mins = '00';
            this.sec = this.TimeLeft.substring(11, 13);
        }


        this.productName = navprms.get("offersData").product_name;
        storage.get('firstTimeLoad').then((firstTimeLoad: any) => {
            this.visitorId = firstTimeLoad;
            console.log('firstTimeLoad storage', firstTimeLoad);
        });
    }

    ionViewWillEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Loading data...'
        });
        this.loading.present().then(() => {
            this.offerBuyData.dedicatedOfferData(this.productName)
                .subscribe(
                responseData => {
                    this.credit_offer = responseData.response[0].get_credit_offer.response.offers;
                    this.product = responseData.response[0].get_credit_offer.response.product[0];
                    this.countDown = responseData.response[0].get_credit_offer.response.product[0];
                    this.offersForYou = responseData.response[0].fetch_lottery_products.response.offers_for_you;
                    this.check = true;
                    this.loading.dismiss();
                },
                err => {
                    console.log("error", err);
                }
                );
        })
    }



    credit_line(line) {
        this.credit_filter_line = parseInt(line);
    }
    watchSlider(currentProduct: any, Index: any, proIndex: any) {
        this.credit_filter_line = this.slider;
    }
    drawday(index) {
        this.position = index;
        this.credit_filter_draw = index;
    }
    buyCreditOffer(offerId: any) {
        this.loading = this.loadingCtrl.create();
        this.loading.present().then(() => {
            this.offerService.buy_Credit_Offer(offerId, this.visitorId).subscribe(data => {
                this.loading.dismiss();
                this.buyoffer = data.response.response;
                this.buyOfferStatus = data.response.response.status;
                if (this.buyOfferStatus === "FAIL") {
                    this.openFailureModal();
                }
                else {
                    this.openSuccessModal();
                }
            },
                err => {

                    console.log("error", err);
                },
                () => console.log("offer buy successfully")
            );
        })
    }
    openFailureModal() {

    }
    openSuccessModal() {

    }

}