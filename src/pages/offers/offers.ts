import { Component, ViewChild,OnInit } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { OfferService } from '../../services/offer.service';
import { Params } from '../../services/params';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';


/*
  Generated class for the Offers page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var webengage: any;

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage implements OnInit {
   ngOnInit(): void {
     this.platform.ready().then((readySource) => {
        var CurrentUserid = localStorage.getItem('appCurrentUserid');
       if (this.platform.is('cordova')) {
			      webengage.engage(); 
            webengage.track('Offers Page', {
            "UserId" :CurrentUserid ,
            });
          }
     });
   }

  @ViewChild("confirmPayment") confirmPayment;

  toptab: string = "offer";

  userCards: any;
  userCardsCount:number = 0;
  customerToken:string;
  jackpotList:any
  jackpotGroup:any


  credit_lines: any;
  credit_offer: any;
  credit_filter_line: any;
  credit_filter_draw: any;
  credit_filter_day: any;

  fetch_lines: any;
  fetch_offer: any;
  fetch_filter_line: any;
  fetch_filter_draw: any;
  fetch_filter_day: any;
    drawdaytue:any ="#2F76F1";
    drawdayfri:any= "#AAAAAA";
    drawdaywed:any ="#FF0000";
    drawdaysat:any= "#AAAAAA";
    buyoffer:any;
    private loading : any;
    credit_product:any;
    credit_game:any;
    resultshow:boolean=false;
    errorshow:boolean=false;
    slider:any;
    parseInt:any=parseInt;
    position:any=0;
  Credit_Points: any;

    spaceBetween:number ;

  constructor(
    public platform: Platform,
    public params: Params,
    public iab: InAppBrowser,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authSrv: AuthService,
    public srvOffer: OfferService,
    public commonSrv:CommonService,
    public appSound:AppSoundProvider,
    public loadingCtrl: LoadingController) {

        this.spaceBetween = Math.floor(platform.width() * -0.22);

    //   this.spaceBetween = Math.floor( platform.width() * -0.14 );
      this.checkCardExists();
  }

  checkCardExists(){
    console.log("OffersPage::checkCardExists()");
    let loader = this._showLoader();
    
    this.srvOffer.getJackpotList().subscribe((data) => {
      console.log("OffersPage::getJackpotList() success", data);
      if (data.response && data.response[0] 
        && data.response[0].get_big_jackpot_list) {
        this.jackpotList = data.response[0].get_big_jackpot_list.response;
        this.customerToken = this.jackpotList.customer_token;
      }

      loader.dismiss();
      
    }, (err) => {
      console.log("OffersPage::getJackpotList() error", err);
      loader.dismiss();
    })
  }
     // draw day click  call this function     
  drawday(index){
    this.position =index;
    this.credit_filter_draw=index;
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
    
    showPaymentOptions() {
        console.log("OffersPage::showPaymentOptions()");
        let offer = {total_cost:4.99} ;

    this.appSound.play('buttonClick');
    if (this.customerToken) {
      this.goPaymentWebview();
    }else{
      let loader = this._showLoader();
      // get all the cards details
      this.srvOffer.getExistingPaymilCardsDetails().subscribe((data) => {
        console.log("OffersPage::showPaymentOptions() success", data);
        let token_exists = 0;
        for (var i = 0; i < data.response.length; ++i) {
          if (data.response[i].get_customer_paymill_card_details) {
            token_exists = data.response[i].get_customer_paymill_card_details.response.token_exists
          } 
        }

        if (token_exists > 0) {
          data.response.push({ offer: offer });
          this.userCards = data.response;
          console.log("OffersPage::showPaymentOptions() success", this.userCards);
          loader.dismiss();
          this.confirmPayment.togglePopup()
        }else{
          this.goPaymentWebview();
        }

      }, (err) => {
        console.log("OffersPage::showPaymentOptions() error", err);
        loader.dismiss();
      })
    }
    }

  tabChanged(){
    // console.log("OffersPage::tabChanged()");
    this.appSound.play('menuClick');
  }

  goPaymentWebview(){
      let opt:string = "toolbarposition=top";
      let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
      str += '&customer_id='+CommonService.session.customer_id+'&customer_token='+this.customerToken+'&Offer_ID=1188'
      this.iab.create( str, 'blank', opt);
  }

  private _showLoader() {
    let loader = this.loadingCtrl.create({
      content: "Loading data..."
    });
    loader.present()
    return loader;
  }


}