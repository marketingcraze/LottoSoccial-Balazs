import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';


declare var webengage: any;
declare var cordova: any;
@Component({
    selector: 'inbox-modal',
    templateUrl: 'inbox-popup.html'
})
export class inboxModal {
    public PageData: any;
    customerId: any;
    customerToken: any;
    constructor(private _navParams: NavParams, public appSound: AppSoundProvider, private platform: Platform, private viewctrl: ViewController, ) {
        debugger;
        this.customerId = CommonService.session.customer_id;
        this.customerToken = CommonService.session.customer_token;
        this.PageData = this._navParams.get("CurrentMessage");
    }
    openWebView(url: any) {
        this.appSound.play('buttonClick');
        this.platform.ready().then(() => {
            if (typeof cordova !== 'undefined') {
                const browser = cordova.InAppBrowser.open('https://nima.lottosocial.com/webview-auth/?redirect_to=' + [url] + '&customer_id=' + this.customerId + '&customer_token=' + this.customerToken + '', '_blank', 'location=no');
            }
        });
        // const browser = cordova.InAppBrowser.open('https://nima.lottosocial.com/webview-auth/?redirect_to=' + [url] + '&customer_id=' + this.customerId + '&customer_token=' + this.customerToken + '', '_blank','location=no');
    }
    dismissPopUp(data) {
        this.viewctrl.dismiss(data);
    }
}