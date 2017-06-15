import { Component, Input, SimpleChange, OnChanges } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { OfferService } from '../../services/offer.service';
import { Params } from '../../services/params';


@Component({
    selector: 'popup-confirm-payment',
    templateUrl: 'popup-confirm-payment.html'
})
export class PopupConfirmPaymentComponent implements OnChanges{
    slideInUp:boolean = false;
    confirmPayment:boolean = false;
    showBuyNowView:boolean = false;

    public cardSelected:any
    public cardsValue:any
    public cardsList:any[]

    public customerDetails
    public syndicate = {
        syndicate_name: ""
    }

    @Input('existing-cards') existingPaymilCards;  
    
    ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
        // console.log('Change detected:', changes["existingPaymilCards"]);
        
        if (changes["existingPaymilCards"] && changes["existingPaymilCards"].currentValue) {
            this.cardsValue = changes["existingPaymilCards"].currentValue;
            
            console.log("existingPaymilCards", this.cardsValue);

            for (var i = 0; i < this.cardsValue.length; ++i) {
                
                console.log("existingPaymilCards", this.cardsValue[i]);

                if (this.cardsValue[i].get_customer_paymill_card_details) {
                    this.cardsList = this.cardsValue[i].get_customer_paymill_card_details.response.cards
                }else if (this.cardsValue[i].get_customer_details) {
                    this.customerDetails = this.cardsValue[i].get_customer_details.response
                }else if (this.cardsValue[i].syndicate) {
                    this.syndicate = this.cardsValue[i].syndicate

                }
            }

            console.log("cardsList", this.cardsList );
            console.log("customerDetails", this.customerDetails );
            
        }
    }
    
    constructor(
        private params:Params,
        private iab: InAppBrowser,
        public srvOffer: OfferService,
        public loadingCtrl: LoadingController) {
        console.log('Hello PopupConfirmPaymentComponent Component');
    }

    buyNow(){
        console.log("PopupConfirmPaymentComponent::buyNow", this.cardSelected);

        if (this.cardSelected == 'visa3') {
            let opt:string = "toolbarposition=top";
            let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg&customer_id=1970400&customer_token=818113679640&Offer_ID=1188'

            // this.showBuyNowView = !this.showBuyNowView
            this.iab.create( str, 'blank', opt);
        }else{
            this.makeCardPayment(this.cardSelected);
        }
    }

    makeCardPayment(selectedCardEndDigits){
        let loader = this._showLoader();

        this.srvOffer.processPaymillCardPayment().subscribe((data) => {
            console.log("OffersPage::checkCardExists() success", data);
            loader.dismiss();
            this.showBuyNowView = true;
        }, (err) => {
            console.log("OffersPage::checkCardExists() error", err);
            loader.dismiss();
        })
    }

    viewTickets(){
        this.togglePopup();
        this.params.goTab(2);
    }

    viewOffers(){
        this.togglePopup();
        this.params.goTab(4);
    }


    public togglePopup(){
        console.log("showWhatsOn: " + this.slideInUp);

        if (this.slideInUp) {
            let timeoutId = setTimeout(() => {
                this.confirmPayment = !this.confirmPayment;
                clearTimeout(timeoutId);
            }, 500);
            this.slideInUp = !this.slideInUp;
        }else{
            this.confirmPayment = !this.confirmPayment;
            let timeoutId = setTimeout(() => {
                
                this.slideInUp = !this.slideInUp;
                clearTimeout(timeoutId);

            }, 10);
        }
    }

    private _showLoader() {
        let loader = this.loadingCtrl.create({
            content: "Saving data..."
        });
        loader.present()
        return loader;
    }


}
