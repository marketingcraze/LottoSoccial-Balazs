import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { productOffer } from '../../services/productoffer.service';
import { OfferService } from '../../services/offer.service';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Rx";
import { buyOfferTips } from '../BuyofferPageTips/BuyofferPageTips';
import { IonPullUpFooterState } from 'ionic-pullup';
import { forkOffersSyndicate } from '../../services/syndicateForkOffer.service';

@Component({
    selector: 'offer-buy',
    templateUrl: 'offerbuy-page.html'
})
export class offerBuy {
    userCards: any;
    showDown: boolean;
    paymentType: any;
    @ViewChild("confirmPayment") confirmPayment;
    @ViewChild("pullup") pullUp: any;
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
    TimeLeft: string = ""
    NewTimeLeft: any;
    day: any = [];
    hrs: any = [];
    mins: any = [];
    sec: any = [];
    Nday: any = [];
    Nhrs: any = [];
    Nmins: any = [];
    Nsec: any = [];
    check: boolean = false;
    visitorId: any;
    buyoffer: any;
    buyOfferStatus: any;
    result: any = [];
    change: boolean = false
    dealTimer: any = [];
    private lotteryProductData: any = []
    footerState: IonPullUpFooterState;
    constructor(private offerBuyData: productOffer,
        private loadingCtrl: LoadingController,
        private storage: Storage,
        private modalCtrl: ModalController,
        private getCardsSrv: forkOffersSyndicate,
        private offerService: OfferService,
        private navprms: NavParams,
    public cdf: ChangeDetectorRef ) {


        this.footerState = IonPullUpFooterState.Collapsed;
        this.NewTimeLeft = "";
        this.NewTimeLeft = this.navprms.get("Time");
        this.dealTimer = this.navprms.get("dealTimer")

        this.TimeLeft = "";
        this.result = "";
        this.productName = navprms.get("offersData").product_name;
        storage.get('firstTimeLoad').then((firstTimeLoad: any) => {
            this.visitorId = firstTimeLoad;
            console.log('firstTimeLoad storage', firstTimeLoad);
        });
    }
    ionViewWillUnload() {
        //   console.log("view is unload ")
        this.TimeLeft = "";
        this.NewTimeLeft = "";
    }

    calTime() {

        let now = new Date().getTime();
        if (!this.NewTimeLeft) {
            return this.result;
        }
        if (typeof (this.NewTimeLeft) === "string") {
            this.NewTimeLeft = new Date(this.NewTimeLeft);
        }

        let delta = Math.floor((now - this.NewTimeLeft.getTime()) / 1000);
        if (delta < 0) {
            this.result = "-"
            delta = Math.abs(delta);
        }


        let dayCal = Math.floor(delta / 86400);
        delta %= 86400
        let hourCal = Math.floor(delta / 3600);
        delta %= 3600
        let minuteCal = Math.floor(delta / 60);
        delta %= 60
        let secondsCal = Math.floor(delta)



        this.day = (dayCal <= 9) ? '0' + dayCal : dayCal;

        this.hrs = (hourCal <= 9) ? '0' + hourCal : hourCal;
        this.mins = (minuteCal <= 9) ? '0' + minuteCal : minuteCal;
        this.sec = (secondsCal <= 9) ? '0' + secondsCal : secondsCal;
    }

    NewcalTime(NewLeft: any) {

        let now = new Date().getTime();
        let now1 = new Date(NewLeft).getTime();

        if (now1 >= now) {
            if (!NewLeft) {
                return this.result;
            }
            if (typeof (NewLeft) === "string") {
                NewLeft = new Date(NewLeft);
            }

            let delta = Math.floor((now - NewLeft.getTime()) / 1000);
            if (delta < 0) {
                this.result = "-"
                delta = Math.abs(delta);
            }

            let dayCal = Math.floor(delta / 86400);
            delta %= 86400
            let hourCal = Math.floor(delta / 3600);
            delta %= 3600
            let minuteCal = Math.floor(delta / 60);
            delta %= 60
            let secondsCal = Math.floor(delta)

            this.Nday = (dayCal <= 9) ? '0' + dayCal : dayCal;
            this.Nhrs = (hourCal <= 9) ? '0' + hourCal + " :" : hourCal + " :";
            this.Nmins = (minuteCal <= 9) ? '0' + minuteCal + " :" : minuteCal + " :";
            this.Nsec = (secondsCal <= 9) ? '0' + secondsCal : secondsCal;
        }
    }

    ngOnInit() {
        Observable.interval(1000).takeWhile(() => true).subscribe(() => this.calTime());
        Observable.interval(1000).takeWhile(() => true).subscribe(() => this.NewcalTime(this.dealTimer));
    }

    ionViewWillEnter() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        this.loading.present().then(() => {
            this.offerBuyData.dedicatedOfferData(this.productName)
                .subscribe(
                responseData => {
                    debugger
                    this.calTime();
                    this.credit_offer = responseData.response[0].get_credit_offer.response.offers;
                    this.product = responseData.response[0].get_credit_offer.response.product[0];
                    // this.countDown = responseData.response[0].get_credit_offer.response.product[0];
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
    // buyCreditOffer(offerId: any) {
    //     this.loading = this.loadingCtrl.create();
    //     this.loading.present().then(() => {
    //         this.offerService.buy_Credit_Offer(offerId, this.visitorId).subscribe(data => {
    //             this.loading.dismiss();
    //             this.buyoffer = data.response.response;
    //             this.buyOfferStatus = data.response.response.status;
    //             if (this.buyOfferStatus === "FAIL") {
    //                 this.openFailureModal();
    //             }
    //             else {
    //                 this.openSuccessModal();
    //             }
    //         },
    //             err => {

    //                 console.log("error", err);
    //             },
    //             () => console.log("offer buy successfully")
    //         );
    //     })
    // }
    openFailureModal() {

    }
    openSuccessModal() {

    }
    openTipsModal() {
        let modalTips = this.modalCtrl.create(buyOfferTips);
        modalTips.present();
    }
    footerExpanded() {
        this.showDown = true;
        var a = this.pullUp;
        console.log('Footer expanded!');
    }

    footerCollapsed() {
        this.showDown = false;
        var a = this.pullUp
        console.log('Footer collapsed!');
    }

    toggleFooter() {
        if(this.change == false)
        {
            this.change = true
        }
        else{
            this.change = false
        }
        this.cdf.detectChanges()
        
        this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    }
    getMaximumHeight() {
        return (window.innerHeight / 2.5);
    }
    buyCashOffer(offer) {
        debugger
        let loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        loader.present().then(() => {
            this.getCardsSrv.paymentCardDetails(offer.offer_id).subscribe((data) => {
                console.log("StorePage::showPaymentOptions() success", data);
                let token_exists = 0;
                debugger
                for (var i = 0; i < data.response.length; ++i) {
                    if (data.response[i].get_customer_paymill_card_details) {
                        token_exists = data.response[i].get_customer_paymill_card_details.response.token_exists
                    }
                }
                if (token_exists > 0) {
                    localStorage.removeItem("buttonText");
                    localStorage.setItem("buttonText", offer.prize);
                    this.userCards = data.response;
                    this.paymentType = "CashOffer";
                    console.log("StorePage::showPaymentOptions() success", this.userCards);
                    loader.dismiss();

                    console.log("StorePage::showPaymentOptions() success", this.userCards);
                    this.confirmPayment.togglePopup()
                } else {
                    loader.dismiss()
                    // this.goPaymentWebviewHomeoffer(offerId, prosub_id);
                }
            }, (err) => {
                loader.dismiss()
                console.log("StorePage::showPaymentOptions() error", err);
            });
        })


    }
    paymentDone() {
        /*
        let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Successfully transaction completed.',
            buttons: ['OK']
        });
        alert.present();
        */
    }


}