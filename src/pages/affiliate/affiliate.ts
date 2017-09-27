import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ViewController } from 'ionic-angular';

import { AffiliateServices } from '../../services/affliate.service'
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'page-affliate',
    templateUrl: 'affiliate.html'
})
export class AffiliatePage implements OnInit {

    constructor(
        private _affiliateServices: AffiliateServices,private loadingCtrl: LoadingController,
        private viewctrl:ViewController
    ) {

    }
    affilateModel: any = [];
    affilateModelBinding :any = [];
    day: any = [];
    hrs: any = [];
    mins: any = [];
    sec: any = [];
    TimeLeft: string = ""
    NewTimeLeft: any;
    result: any = [];
    tDate:any = []
    sliceData:any = []
    lineNumber = 0;
    d1:any;
    d2:any;
    d3:any;
    d4:any;
    d5:any;
    d6:any;
    d7:any;
   
    isDisplay : boolean = true;
    

    ngOnInit() {
        this.getRanMethod()
        //     let loader = this._showLoader();
        //     this._affiliateServices.loadAffiliateData().subscribe(
        //       data => {
                
        //        this.affilateModelBinding = data.response[0].get_home_card.response.offers_for_you.offer_group[0];
        //         this.NewTimeLeft = this.affilateModelBinding.countdown
        //         this.sliceData =  (String(this.affilateModelBinding.offer_jackpot).substring(1,4))
        //         debugger
        //         Observable.interval(1000).takeWhile(() => true).subscribe(() => this.calTime());
           
        //         loader.dismiss()
        //       },
        //       err => {
        //         console.log("error", err);
        //         loader.dismiss();
        //       }
        //     )
        
        //   }
        //   private _showLoader() {
        //     let loader = this.loadingCtrl.create({
        //       content: "Loading data..."
        //     });
        //     loader.present()
        //     return loader;
         
      
    }
    // calTime(){
    //     let now = new Date().getTime();
    //     if (!this.NewTimeLeft) {
    //         return this.result;
    //     }
    //     if (typeof (this.NewTimeLeft) === "string") {
    //         this.NewTimeLeft = new Date(this.NewTimeLeft);
    //     }

    //     let delta = Math.floor((now - this.NewTimeLeft.getTime()) / 1000);
    //     if (delta < 0) {
    //         this.result = "-"
    //         delta = Math.abs(delta);
    //     }


    //     let dayCal = Math.floor(delta / 86400);
    //     delta %= 86400
    //     let hourCal = Math.floor(delta / 3600);
    //     delta %= 3600
    //     let minuteCal = Math.floor(delta / 60);
    //     delta %= 60
    //     let secondsCal = Math.floor(delta)



    //     this.day = (dayCal <= 9) ? '0' + dayCal : dayCal;

    //     this.hrs = (hourCal <= 9) ? '0' + hourCal : hourCal;
    //     this.mins = (minuteCal <= 9) ? '0' + minuteCal  : minuteCal;
    //     this.sec = (secondsCal <= 9) ? '0' + secondsCal : secondsCal;
    // }
    dismissPopUp(data) {
        this.viewctrl.dismiss(data);
    }
    genrateRanNumber(index: any) {
      
        this.isDisplay = false;
        this.lineNumber = index
        this.getRanMethod();
    }
    getRanMethod() {
        this.d1 = this.getRandomInt(1, 9);
        this.d2 = this.getRandomInt(10, 99);
        this.d3 = this.getRandomInt(10, 99);
        this.d4 = this.getRandomInt(10, 99);
        this.d5 = this.getRandomInt(10, 99);
        this.d6 = this.getRandomInt(1, 9);
        this.d7 = this.getRandomInt(10, 99);
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
}