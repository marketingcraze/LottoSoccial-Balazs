import { Component } from '@angular/core';
import { Platform,NavController, NavParams,LoadingController } from 'ionic-angular';
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


export class OffersPage   {
  toptab:string="offer";
  credit_filter_line:any;
  credit_filter_draw:any;
  credit_filter_day:any;
  credit_offer : any;
  credit_product:any;
  credit_game:any;
  Credit_Points:any;
  buyoffer:any;
  private loading : any;
  resultshow:boolean=false;
  errorshow:boolean=false;
  slider:any;
 
  constructor(public navCtrl: NavController,private loadingCtrl: LoadingController,  public platform: Platform,public navParams: NavParams,public authSrv:AuthService ) {
      //  this.spaceBetween = Math.floor(platform.width() * -0.22);
     
  }
     // draw day click  call this function     
  drawday(day,gamename){
    switch (day) {
      case "Mon" :  this.credit_filter_day="Monday";     break;
      case "Tue" :  this.credit_filter_day="Tuesday";    break;
      case "Wed" :  this.credit_filter_day="Wednesday";  break;
      case "Thu" :  this.credit_filter_day="Thursday";   break;
      case "Fri" :  this.credit_filter_day="Friday";     break;
      case "Sat" :  this.credit_filter_day="Saturday";   break;
      case "Sun" :  this.credit_filter_day="Sunday";     break;
      default :     this.credit_filter_day="Not selected";
    }
    this.credit_filter_draw=day;
    var string = gamename;
    this.credit_game= string.charAt(0).toUpperCase() + string.slice(1);
  }
  // line select  call this function   
  credit_line(line){
      this.credit_filter_line=parseInt(line);
  }
   
   
  ionViewWillEnter() {
  // get creaditoffer call api
      this.authSrv.get_credit_offer().subscribe(data=>{
        if (data) {
            this.credit_offer=data.response.response.offers;
            this.credit_product=data.response.response.product;
        }
        console.log("get_credit_offer",data);
         
      },
        err=>{
              console.log("error", err);
        },
        ()=> console.log("offer dislpay sucesss")
      );
         

      

  // get creditpoints call api 
      this.authSrv.get_Credit_Points().subscribe(data=>{
        if(data){
          this.Credit_Points=data.response.response.bonus_credit;
          }
          //console.log("get_Credit_Points",data)
      },
        err=>{     
          console.log("error", err);
        },
        ()=> console.log("creadit points get successfully")
      );
  }
 
  // buy buton click call this function
  buyCreditOffer(){
     this.loading = this.loadingCtrl.create();
    this.loading.present().then(() => {
      this.authSrv.buy_Credit_Offer().subscribe(data=>{
        this.loading.dismiss();
        this.resultshow=true;
          this.buyoffer=data;
          console.log(this.buyoffer);    
        },
        err=>{   
          this.errorshow=true;
          console.log("error", err);
        },
        ()=> console.log("offer buy successfully")
      );
    })
  }
  getmoreline(){
    this.resultshow=false;
  }
  tryagain(){
    this.errorshow=false;
  }
 watchSlider(value){
  
        //Converting slider-steps to custom values
   const steps = [];
    
    for (let key in value) {
      steps.push(value[key]);
    }
    this.credit_filter_line=parseInt(steps[this.slider]);
     console.log(steps[this.slider]);
    }

}