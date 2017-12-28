import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { VoucherService } from '../../services/voucherList_service';
import { SimpleTimer } from 'ng2-simple-timer';

@Component({
    selector: 'affiliate-popup',
    templateUrl: 'affiliate_popups.html'
})

export class AffiliatePopup {
    result: any = [];
    resultDate: any = [];
    day: any = [];
    hrs: any = [];
    mins: any = [];
    sec: any = [];
    halfMinFirst: any = [];
    halfMinSecond: any = [];
    halfSecFirst: any = [];
    halfSecSecond: any = [];
    fifteenSec = 900000;
    now;
    finalValue;
    halfSec;
    timer0Id: string;
    timer0button = 'Subscribe';
    TimeLeft = "";
    NewTimeLeft = "";

    constructor(public navCtrl: NavController, private st: SimpleTimer,
        public alertCtrl: AlertController,
        private viewctrl: ViewController,
        private navParms: NavParams, public voucher_service: VoucherService, private loadingCtrl: LoadingController) {
        this.now = new Date().getTime();
        this.finalValue = this.now + this.fifteenSec
    }
    //dismiss popup
    dismissPopUp(data) {
        this.viewctrl.dismiss(data);
    }
    done() {

    }
    ionViewWillEnter() {
        this.st.newTimer('1sec', 1);
        this.subscribeTimer0();
    }
    //Timing
    subscribeTimer0() {
        if (this.timer0Id) {
            // Unsubscribe if timer Id is defined
            this.st.unsubscribe(this.timer0Id);
            this.timer0Id = undefined;
            this.timer0button = 'Subscribe';
            console.log('timer 0 Unsubscribed.');
        } else {
            var UTCstring = (new Date()).toUTCString();
            console.log("dateis iis isisis s ", UTCstring)
            // Subscribe if timer Id is undefined
            // var now = new Date(); 
            // var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            // console.log("date is ", now.toUTCString())
            this.timer0Id = this.st.subscribe('1sec', () => this.calTime());
            this.timer0button = 'Unsubscribe';
            console.log('timer 0 Subscribed.');
        }
        console.log(this.st.getSubscription());
    }
    //Timing call
    calTime() {
        let nowLatest = new Date().getTime();
        let delta = Math.floor((nowLatest - this.finalValue) / 1000);
        if (delta < 0) {
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
        this.halfMinFirst = String(this.mins).substr(0, 1)
        this.halfMinSecond = String(this.mins).substr(1, 2)
        this.halfSecFirst = String(this.sec).substr(0, 1)
        this.halfSecSecond = String(this.sec).substr(1, 2)
        if (this.now == nowLatest) {
            this.st.unsubscribe(this.timer0Id);
            this.timer0Id = undefined;
        }
    }
}

