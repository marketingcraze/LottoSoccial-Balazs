import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Slides } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { SimpleTimer } from 'ng2-simple-timer';
declare const $

@Component({
  selector: 'page-prize-summary-No-syndicate',
  templateUrl: 'Prize-summary-No-syndicate.html'
})
export class PrizeSummaryNoSyndicate {
    loader:any;
    data:any;
    bgStyle:any
    private currentTime:Date = new Date();
    result: any = [];
    resultDate: any = [];
    counter0 = 0;
	  timer0Id: string;
	  timer0button = 'Subscribe';
    count:number;
    day:any;
    hrs:any;
    min:any;
    sec:any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    private st: SimpleTimer
    ) {
        this.loader = this.loadingCtrl.create({
          content:"Please wait..."
        });
    }

  ionViewDidLoad() {
    this.getData()
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    
  }
  //countDown timer

subscribeTimer0(d:any) {

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
        this.loader.present();
        this._syndService.prizeBreakDown().
        subscribe((res)=> {
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
}
