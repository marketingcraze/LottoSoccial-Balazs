import { Component, Input, SimpleChange, OnChanges } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
    selector: 'popup-confirm-payment',
    templateUrl: 'popup-confirm-payment.html'
})
export class PopupConfirmPaymentComponent implements OnChanges{
    slideInUp:boolean = false;
    confirmPayment:boolean = false;
    showBuyNowView:boolean = false;

    public cardSelected:any;
    public cardsValue:any;

    @Input('existing-cards') existingPaymilCards;  
    
    ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
        console.log('Change detected:', changes["existingPaymilCards"]);
        
        if (changes["existingPaymilCards"]) {
            this.cardsValue = changes["existingPaymilCards"].currentValue;
        }
    }
    
    constructor(private iab: InAppBrowser) {
        console.log('Hello PopupConfirmPaymentComponent Component');
    }

    buyNow(){
        console.log("PopupConfirmPaymentComponent::buyNow", this.cardSelected);

        if (this.cardSelected == 'visa3') {
            let opt:string = "toolbarposition=top";
            let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg&customer_id=1970400&customer_token=818113679640&Offer_ID=1188'

            // this.showBuyNowView = !this.showBuyNowView
            this.iab.create( str, 'blank', opt);
        }
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
}
