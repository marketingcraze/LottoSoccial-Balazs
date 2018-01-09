import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Slides, Platform } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { SimpleTimer } from 'ng2-simple-timer';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { forkOffersSyndicate } from '../../services/syndicateForkOffer.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

declare const $
declare var cordova: any;
@Component({
    selector: 'page-prize-summary-No-syndicate',
    templateUrl: 'Prize-summary-No-syndicate.html'
})
export class PrizeSummaryNoSyndicate {
    userCards: any;
    @ViewChild("confirmPayment") confirmPayment;
    loader: any;
    data: any;
    bgStyle: any
    private currentTime: Date = new Date();
    result: any = [];
    resultDate: any = [];
    counter0 = 0;
    timer0Id: string;
    timer0button = 'Subscribe';
    count: number;
    day: any;
    hrs: any;
    min: any;
    sec: any;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        private storage: Storage,
        private getCardsSrv: forkOffersSyndicate,
        private iab: InAppBrowser,
        public appSound: AppSoundProvider,
        public viewCtrl: ViewController,
        public _syndService: SyndicateService,
        public loadingCtrl: LoadingController,
        private st: SimpleTimer
    ) {

    }

    ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
        this.getData()

    }
    //countDown timer

    subscribeTimer0(d: any) {

        if (this.timer0Id) {

            // Unsubscribe if timer Id is defined
            this.st.unsubscribe(this.timer0Id);
            this.timer0Id = undefined;
            this.timer0button = 'Subscribe';
            console.log('timer 0 Unsubscribed.');
        } else {

            // Subscribe if timer Id is undefined
            this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback(d));
            this.timer0button = 'Unsubscribe';
            console.log('timer 0 Subscribed.');
        }
        console.log(this.st.getSubscription());
    }


    timer0callback(data) {

        var value: any = data
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
    getData() {
        this.loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        this.loader.present();
        this._syndService.prizeBreakDown().
            subscribe((res) => {
                this.loader.dismiss();
                console.log(JSON.stringify(res));
                this.data = res.response["0"].check_mywinnings.response.syndicate_offer;
                this.bgStyle = {
                    'background': 'url(' + this.data.next_draw.offer_img + ')',
                    'background-size': 'cover'
                }
                this.subscribeTimer0(this.data.next_draw.countdown)

            })
    }
    openpaymentPopup() {
        this.appSound.play('buttonClick');
        let loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        loader.present().then(() => {
            this.getCardsSrv.paymentCardDetails(this.data.offer_id).subscribe((data) => {
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
                    localStorage.setItem("buttonText", this.data.prize);
                    this.userCards = data.response;
                    // this.paymentType = "CashOffer";
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
    goToStore() {
        this.appSound.play('buttonClick');
        this.storage.get('session')
            .then(
            data => {
                let session: any = JSON.parse(data);
                this.platform.ready().then(() => {
                    if (typeof cordova !== 'undefined') {
                        var browser = this.iab.create('https://nima.lottosocial.com/webview-auth/?redirect_to=store-new&customer_id=' + session.customer_id + '&customer_token=' + session.customer_token + '', '_blank', 'location=no,toolbarposition=top')
                    }
                });
            }, error => {
                console.log(error)
            }
            );
    }
}
