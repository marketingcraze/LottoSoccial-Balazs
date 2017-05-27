import { Component } from '@angular/core';
import { NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { HomeService } from '../../services/service.home';
import { OffersPayment } from './offers-payment/offers-payment';

@Component({
    selector: 'page-offers',
    templateUrl: 'offers.html'
})
export class OffersPage  {
    toptab:string="offer";
    slideInUp:boolean = false;
    confirmPayment:boolean = false;
    showBuyNowView:boolean = false;

    credit_lines : any;
    credit_offer : any;
    credit_filter_line:any;
    credit_filter_draw:any;
    credit_filter_day:any;

    fetch_lines :any;
    fetch_offer : any;
    fetch_filter_line:any;
    fetch_filter_draw:any;
    fetch_filter_day:any; 

    //spaceBetween:number ;
    constructor(
        public platform: Platform, 
        public homeSrv:HomeService,
        public navParams: NavParams,
        public navCtrl: NavController, 
        public popoverCtrl:PopoverController ) {
        // this.spaceBetween = Math.floor( platform.width() * -0.14 );
    }

    makePayment(myEvent) {
        this.showWhatsOn();

        // call api to check user has token
        

    }

    showWhatsOn(){
        console.log("showWhatsOn: " + this.slideInUp);

        if(this.slideInUp) {

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



    wed(){
        this.fetch_filter_draw="Wed";
        this.fetch_filter_day="Wednesday";
    }
    tue(){
      this.credit_filter_draw="Tue";
      this.credit_filter_day="Tuesday"
    }
    fri(){
      this.credit_filter_draw="Fri"
      this.credit_filter_day="Friday"
    }
    sat(){
      this.fetch_filter_draw="Sat";
        this.fetch_filter_day="Saturday";
    }

    line1(){
      this.credit_filter_line=1;
      this.fetch_filter_line=1;
    }
    line2(){
      this.credit_filter_line=2;
      this.fetch_filter_line=2;

    }
    line3(){
      this.credit_filter_line=3;
      this.fetch_filter_line=3;
    }
    line4(){
      this.credit_filter_line=4;
      this.fetch_filter_line=4;
    }
    line5(){
      this.credit_filter_line=5;
      this.fetch_filter_line=5;
    }
    line6(){
      this.credit_filter_line=10;
      this.fetch_filter_line=10;
    }
    line7(){
      this.credit_filter_line=20;
      this.fetch_filter_line=20;
    }


    ionViewDidLoad() {
      this.credit_filter_line=1;
      this.credit_filter_draw="Tue";
      this.credit_filter_day="Tuesday";
      this.fetch_filter_line=1;
      this.fetch_filter_draw="Wed";
      this.fetch_filter_day="Wednesday";
    this.homeSrv.get_credit_offer().subscribe(
                data=>{
                  this.credit_lines=data.response.response.product;
                  this.credit_offer=data.response.offers;
               
                    console.log("get_credit_offer",this.credit_offer);
                },
                err=>{
                  
                    console.log("error", err);
                }
                );

    this.homeSrv.get_fetch_offer().subscribe(
                data=>{
                   this.fetch_lines=data.response.response.product;
                   this.fetch_offer=data.response.offers;
                 console.log("dd",data)
                },
                err=>{
                  
                    console.log("error", err);
                }
                );
      }
}