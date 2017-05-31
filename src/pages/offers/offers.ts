import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FilterPipe } from '../../pipes/filter-pipe';



/*
  Generated class for the Offers page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',

})


export class OffersPage  {
   toptab:string="offer";

   credit_lines : any;
   credit_offer : any;
   credit_filter_line:any;
   credit_filter_draw:any;
   credit_filter_day:any;

   fetch_lines : any;
   fetch_offer : any;
   fetch_filter_line:any;
   fetch_filter_draw:any;
   fetch_filter_day:any; 
    drawdaytue:any ="#6297dc";
    drawdayfri:any= "#b7b7b7";
    drawdaywed:any ="#f53d3d";
    drawdaysat:any= "#b7b7b7";
    Credit_Points:any;
  //spaceBetween:number ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,public authSrv:AuthService ) {
  //   this.spaceBetween = Math.floor( platform.width() * -0.14 );
 
 
     
}
    wed(){
        this.fetch_filter_draw="Wed";
        this.fetch_filter_day="Wednesday";
        this.drawdaywed="#f53d3d";
        this.drawdaysat="#b7b7b7";
        
    }
    tue(){
      this.credit_filter_draw="Tue";
      this.credit_filter_day="Tuesday";
      this.drawdaytue="#6297dc";
      this.drawdayfri="#b7b7b7";
    }
    fri(){
      this.credit_filter_draw="Fri";
      this.credit_filter_day="Friday";
      
      this.drawdayfri="#6297dc";
      this.drawdaytue="#b7b7b7";
    }
    sat(){
        this.fetch_filter_draw="Sat";
        this.fetch_filter_day="Saturday";
        this.drawdaywed="#b7b7b7";
        this.drawdaysat="#f53d3d";
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
    this.authSrv.get_credit_offer().subscribe(
                data=>{
                  this.credit_lines=data.response.response.product;
                  this.credit_offer=data.response.offers;
               
                //    console.log("get_credit_offer",this.credit_offer);
                },
                err=>{
                  
                    console.log("error", err);
                },
                ()=> console.log("offer dislpay sucesss")
                );

    this.authSrv.get_fetch_offer().subscribe(
                data=>{
                   this.fetch_lines=data.response.response.product;
                   this.fetch_offer=data.response.offers;
               //  console.log("dd",data)
                },
                err=>{
                  
                    console.log("error", err);
                },
                ()=> console.log("offer dislpay sucesss")
                );
                this.authSrv.get_Credit_Points().subscribe(data=>{
            this.Credit_Points=data.response.response.bonus_credit;
           // console.log(data);
                
                },
                err=>{
                  
                    console.log("error", err);
                },
                ()=> console.log("offer dislpay sucesss")
                );

    }
}