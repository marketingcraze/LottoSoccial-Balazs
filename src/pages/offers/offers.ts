import { Component, NgZone } from '@angular/core';
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
  credit_filter_line:any=0;
  credit_filter_draw:any=0;
  credit_offer : any;
  credit_product:any;
  Credit_Points:any;
  buyoffer:any;
  private loading : any;
  resultshow:boolean=false;
  errorshow:boolean=false;
  slider:any;
  parseInt:any=parseInt;
  position:any=0;
spaceBetween:any;



  constructor( public navCtrl: NavController,private ngZone: NgZone,private loadingCtrl: LoadingController,  public platform: Platform,public navParams: NavParams,public authSrv:AuthService ) {
    
  }
     // draw day click  call this function     
  drawday(index){
    this.position =index;
    this.credit_filter_draw=index;
  }
  
  ionViewWillEnter() {
     this.spaceBetween = Math.floor(window.innerWidth * -0.10);
      window.onresize = (e) =>
          {
              this.ngZone.run(() => { 
                  this.spaceBetween = Math.floor(window.innerWidth * -0.10);
                  console.log(this.spaceBetween);
              });
      };
       // get creaditoffer call api
      this.authSrv.get_credit_offer().subscribe(data=>{
        if (data) {
            this.credit_offer=data.response.response.offers;
            this.credit_product=data.response.response.product;
            console.log("get_credit_offer",data);
        }
    
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
          this.buyoffer=data.response.response;
          this.resultshow=true;
          // if(this.buyoffer.status === "FAIL"){
          //       this.errorshow=true;
          // }
          // else{
          //        this.resultshow=true;
          // }
          
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
  watchSlider(){
    this.credit_filter_line=this.slider;
  }

}