import { Component, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { OfferService } from '../../services/offer.service';
import { Params } from '../../services/params';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
    selector: 'popup-confirm-payment',
    templateUrl: 'popup-confirm-payment.html'
})
export class PopupConfirmPaymentComponent implements OnChanges {
    slideInUp: boolean = false;
    confirmPayment: boolean = false;
    showBuyNowView: boolean = false;
    confirmPaymentSuccess: boolean = true;
    buttonValu = "";

    public cardSelected: any
    public cardsValue: any
    public cardsList: any[]
    public offer_detail = "";

    public customerDetails
    public syndicate = {
        syndicate_name: "",
        total_cost: 0.00
    }
    public offer = {
        syndicate_name: "",
        total_cost: 0.00
    }

    @Output() onPaymentComplete = new EventEmitter();

    @Input('existing-cards') existingPaymilCards;

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {

        if (localStorage.getItem("buttonText")) {
            this.buttonValu = localStorage.getItem("buttonText").substr(9, 13);
        }

        if (changes["existingPaymilCards"] && changes["existingPaymilCards"].currentValue) {
            this.cardsValue = changes["existingPaymilCards"].currentValue;

            console.log("existingPaymilCards", this.cardsValue);

            for (var i = 0; i < this.cardsValue.length; ++i) {

                console.log("existingPaymilCards", this.cardsValue[i]);

                if (this.cardsValue[i].get_customer_paymill_card_details) {
                    this.cardsList = this.cardsValue[i].get_customer_paymill_card_details.response.cards
                    this.offer_detail = this.cardsValue[i].get_customer_paymill_card_details.response.offer_name
                } else if (this.cardsValue[i].get_customer_details) {
                    this.customerDetails = this.cardsValue[i].get_customer_details.response
                } else if (this.cardsValue[i].offer) {
                    this.syndicate = this.cardsValue[i].offer
                } else if (this.cardsValue[i].syndicate) {
                    this.syndicate = this.cardsValue[i].syndicate

                }
            }

            // console.log("cardsList", this.cardsList );
            // console.log("customerDetails", this.customerDetails );

        }
    }

    ngOnInit() {

    }
    constructor(
        private params: Params,
        private iab: InAppBrowser,
        public srvOffer: OfferService,
        public alertCtrl: AlertController,
        public appSound: AppSoundProvider,
        public loadingCtrl: LoadingController,
        public storage: Storage) {
        console.log('Hello PopupConfirmPaymentComponent Component');
        // this.storage.get('btnValue').then( (btnValue:any) => {
        //     if(btnValue){
        //     console.log('firstTimeLoad storage', btnValue);
        //     this.buttonValu = btnValue.substr(9,13);

        //     }
        // })
    }

    buyNow() {
        debugger
        console.log("PopupConfirmPaymentComponent::buyNow", this.cardSelected);
        this.appSound.play('buttonClick');

        if (this.cardSelected == '-1') {
            let opt: string = "toolbarposition=top";
            let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg&customer_id=1970400&customer_token=818113679640&Offer_ID=1188'

            // this.showBuyNowView = !this.showBuyNowView

            this.iab.create(str, 'blank', opt);
        }
        else if (typeof this.cardSelected == 'undefined') {
            alert("select any option")
        }
        else {
            this.makeCardPayment(this.cardSelected);
        }
    }

    makeCardPayment(selectedCardIndex) {
        this.appSound.play('buttonClick');
        let loader = this._showLoader();
        if (!selectedCardIndex) {
            loader.dismiss()
            let alert = this.alertCtrl.create({
                title: "Error!",
                subTitle: "Please select any option to make a payment",
                buttons: ['Dismiss']
            });
            alert.present();
        }
        let card = this.cardsList[parseInt(selectedCardIndex)]

        console.log("PopupConfirmPaymentComponent::makeCardPayment", selectedCardIndex, card)

        if (card) {
            this.srvOffer.processPaymillCardPayment(this.syndicate, this.customerDetails, card).subscribe((data) => {
                console.log("PopupConfirmPaymentComponent::checkCardExists() success", data);
                loader.dismiss();
                this.showBuyNowView = true;
                data = data.response[0];
                if (data.process_paymill_card_payment) {
                    data = data.process_paymill_card_payment.response
                    this.confirmPaymentSuccess = (data.status == "SUCCESS")
                }

                if (this.onPaymentComplete) {
                    this.onPaymentComplete.emit();
                }
            }, (err) => {
                console.log("PopupConfirmPaymentComponent::checkCardExists() error", err);
                loader.dismiss()
                this.confirmPaymentSuccess = false
                this.params.setIsInternetAvailable(false)
            })
        }
        else {
            loader.dismiss()
        }
    }

    private try_again() {
        this.appSound.play('buttonClick');
        this.togglePopup();
        this.confirmPaymentSuccess = true
        this.showBuyNowView = false;
    }

    viewTickets() {
        this.appSound.play('buttonClick');
        this.togglePopup();
        this.params.goTab(1);
        this.showBuyNowView = false;
    }

    viewOffers() {
        this.appSound.play('buttonClick');
        this.togglePopup();
        this.params.goTab(4);
        this.showBuyNowView = false;
    }


    public togglePopup() {
        console.log("showWhatsOn: " + this.slideInUp);

        if (this.slideInUp) {
            let timeoutId = setTimeout(() => {
                this.confirmPayment = !this.confirmPayment;
                clearTimeout(timeoutId);
            }, 500);
            this.slideInUp = !this.slideInUp;
        } else {
            this.confirmPayment = !this.confirmPayment;
            let timeoutId = setTimeout(() => {

                this.slideInUp = !this.slideInUp;
                clearTimeout(timeoutId);

            }, 10);
        }
    }
    private _showLoader() {
        let loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        loader.present()
        return loader;
    }


}
