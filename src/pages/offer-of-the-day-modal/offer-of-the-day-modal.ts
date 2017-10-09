import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CommonService } from '../../services/common.service';

declare var cordova: any;

@Component({
    selector: 'page-offer-of-the-day-modal',
    templateUrl: 'offer-of-the-day-modal.html'
})
export class offerOfTheDayModal {


    offerOftheDay: any;
    customerId: any;
    customerToken: any;
    WebViewUrl: any;

    constructor(private nvctrl: NavController,
        private navParms: NavParams,
        private viewctrl: ViewController,
        private loadingctrl: LoadingController,
        private platform: Platform
    ) {
    
        this.customerId = CommonService.session.customer_id;
        this.customerToken = CommonService.session.customer_token;
        this.offerOftheDay = this.navParms.get("offerOfTheDay")
        this.WebViewUrl = this.navParms.get("offerOfTheDay").product_web_link;
    }

    goToWbView() {
       var url = 'https://nima.lottosocial.com/webview-auth/?redirect_to=' + [this.WebViewUrl] + '&customer_id=' + this.customerId + '&customer_token=' + this.customerToken + '';
       console.log("url is ------> " + url)
        this.platform.ready().then(() => {
                const browser = cordova.InAppBrowser.open('https://nima.lottosocial.com/webview-auth/?redirect_to=' + [this.WebViewUrl] + '&customer_id=' + this.customerId + '&customer_token=' + this.customerToken + '', '_blank', 'location=no');
                browser.addEventListener('loadstart', (event) => {
                    if (event.url.includes("win")) {
                        browser.close();
                        // this.nav.push(PlayGamesThankYou,{customer_awardLog_id:this.customerAwardLogId,gameLevel:this.gameLevelThanlyou,game_Id:this.GameId})
                    }
                });
                
            })
    }

    dismiss(data:any=1) {
        this.viewctrl.dismiss(data);
    }
}

