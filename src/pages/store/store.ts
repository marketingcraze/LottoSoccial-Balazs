import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { App, Platform, NavController, NavParams, ActionSheetController, 
    Slides, LoadingController, AlertController, ModalController, Loading, Tabs
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { InviteFriendsPage } from '../invite_friends/invite_friends';
import { JoinSyndicatePage } from '../join-syndicate/join-syndicate';
import { AddSyndicatePage } from '../add-syndicate/add-syndicate';
import { BadgesPage } from '../badges/badges';
import { Storage } from '@ionic/storage';

import { Params } from '../../services/params';
import { CommonService } from '../../services/common.service';
import { HomeService } from '../../services/service.home';
import { OfferService } from '../../services/offer.service';
import { referFriend } from '../refer-friend-page/refer-friend-page';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { IonPullUpFooterState } from 'ionic-pullup';
import { SimpleTimer } from 'ng2-simple-timer';
import { offerBuyResultPage } from '../offerBuyresultpage/offerBuyresultpage';
import { PlayGamePage } from '../play-games/play-games';
import { confirmOfferPurchasePage } from '../confirm-offer-purchase/confirm-offer-purchase'
// import * as $ from 'jquery';
declare var $:any;

@Component({
    selector: 'page-store',
    templateUrl: 'store.html'
})
export class StorePage {
    buyoffer: any;
    @ViewChild(Slides) home_slides: Slides;
    @ViewChild("confirmPayment") confirmPayment;
    public footerState: IonPullUpFooterState;
    public homeCardData:any;
    public spaceBetween:number = 0;
    public whatsOn:boolean = false;
    public nav:NavController;

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
    // payment variables
    userCards: any;
    userCardsCount:number = 0;
    customerToken:string;
    jackpotList:any
    jackpotGroup:any
    total_cards = 0

    //buy credit
    loading:Loading;
    buyOfferStatus:any;
    offerStatus:boolean=false;
    errorshow:boolean=false;
    visitorId:any;

    slideInUp:boolean = false;
    tip11:boolean = false;
    tip22:boolean = false;
    
    flyInOutState: String = 'out';

    homeCard:any;
    gameGroup:any;
    siteUrl:string = CommonService.sitename;

    offersForYou:any = {
        card_title:"",
        offer_group:[]
    };

    accountDetails:any = {
        bonus_credit:0.00,
        reward_points:0
    };
    homeMessage:any;
    homeBlog:any;
    homeEvents:any;
    popMainSlide:any;
    popSlides:any;

    homeData:any = {};

    sliderOptions = {
        loop:'true',
        initialSlide:2,
        effect:'coverflow'
    };

    coverflow = {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
    };

    private slides = [];
    private mySlides = [{
        id: 0,
        description: 'Slide',
        color: '#630460',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 1,
        description: 'Slide',
        color: '#0072bc',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 2,
        description: 'Slide',
        color: '#39b54a',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 3,
        description: 'Slide',
        color: '#f26522',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    }
    ];


    
    constructor(
        public app:App,
        private st: SimpleTimer,
        public params:Params,
        private ref: ChangeDetectorRef,
        private srvHome:HomeService,
        private loadingCtrl:LoadingController,
        private alertCtrl:AlertController,
        public platform: Platform, 
        public navCtrl: NavController, 
        public navParams: NavParams,
        private storage: Storage,
        public srvOffer: OfferService,
        private iab: InAppBrowser,
        public commonSrv:CommonService,
        public appSound:AppSoundProvider,
        public offerService:OfferService,
        public modalCtrlr:ModalController,
        public actionSheetCtrl: ActionSheetController) 
        {
           
        storage.get('firstTimeLoad').then( (firstTimeLoad:any) => {
            this.visitorId=firstTimeLoad;
            });
        this.footerState = IonPullUpFooterState.Collapsed;
        // this.homeData = this.navParams.data;
        console.log("StorePage", this.navParams.data);

        this.srvHome.getCreditOffers().subscribe((data:any)=> {
            console.log("StorePage->getCreditOffers() success", data);
            if (data && data.response) {
              
                // let res = JSON.parse( data.response );
                // console.log("StorePage->getCreditOffers() success", res);
            }
            
        }, (err:Error)=> {
            console.log("StorePage->getCreditOffers() error", err);
        });

        this.nav = this.app.getRootNav();
        this.spaceBetween = Math.floor( platform.width() * -0.10 );

        this.params.events.subscribe('home-data', data => {
            console.log("home-data", data);
            
            for (var i = 0; i < data.length; i++) {

                if ( data[i].get_home_card ) {
                    this.homeCard = data[i].get_home_card.response;
                    
                    if ( this.homeCard.game 
                        && this.homeCard.game.game 
                        && this.homeCard.game.game.game_group ) {

                        this.gameGroup = this.homeCard.game.game.game_group;
                        this.total_cards += this.gameGroup.length
                    }
                    if (this.homeCard.offers_for_you) {
                        this.offersForYou = this.homeCard.offers_for_you;
                      
                        this.st.newTimer('1sec', 1);
                        this.subscribeTimer0();
                        this.total_cards++
                        
                        // updates every seconds
                        setInterval(() => {
                            this.currentTime = new Date();
                        }, 1000);
                    }
                    
                }else if ( data[i].get_account_details ) {
                    this.accountDetails = data[i].get_account_details.response;
                }else if ( data[i].get_home_message ) {
                    this.homeMessage = data[i].get_home_message.response;
                    params.setUnreadCount(this.homeMessage.count);
                }else if ( data[i].get_home_events ) {
                    this.homeEvents = data[i].get_home_events.response.events[0];
                }else if ( data[i].get_home_blog ) {
                    this.homeBlog = data[i].get_home_blog.response.blogs;
                }
            }
            this.slides = this.mySlides;

            // this.home_slides.coverflow.slideShadows = false;
            
            let timeoutId = setTimeout(() => {  
              this.slideInitial();
              clearTimeout(timeoutId);
            }, 1000);
            
            console.log("home data", this.homeMessage );
        });        

        this.checkCardExists();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StorePage');
        // initialize slider

        // this.slideInitial();
        // initialize slider end

    }

    ionViewWillEnter() {
        this.commonSrv.trackSegmentPage("Store","StorePage").subscribe(
            data=>{
                console.log("track segment called");
            },
            err=>{            
            },
            ()=> {  }
            );
    }

    checkCardExists(){
        console.log("StorePage::checkCardExists()");
        let loader = this._showLoader();
        
        this.srvOffer.getJackpotList().subscribe((data) => {
            console.log("StorePage::getJackpotList() success", data);
            if (data.response && data.response[0] 
                && data.response[0].get_big_jackpot_list) {
                this.jackpotList = data.response[0].get_big_jackpot_list.response;
                this.customerToken = this.jackpotList.customer_token;
               
            }
            loader.dismiss();
          
        }, (err) => {
            console.log("StorePage::getJackpotList() error", err);
            loader.dismiss();
        });
    }

    showPaymentOptions(offer) {
    
        this.appSound.play('buttonClick');
        if (!this.customerToken) {
            this.goPaymentWebview(offer);
        }else{
            let loader = this._showLoader();

            // get all the cards details
            this.srvOffer.getExistingPaymilCardsDetails().subscribe((data) => {
                console.log("StorePage::showPaymentOptions() success", data);
              
                let token_exists = 0;
                for (var i = 0; i < data.response.length; ++i) {
                    if (data.response[i].get_customer_paymill_card_details) {
                        token_exists = data.response[i].get_customer_paymill_card_details.response.token_exists
                    } 
                }

                if (token_exists > 0) {
                   
                    data.response.push({ offer: offer });
                    this.userCards = data.response;

                    console.log("StorePage::showPaymentOptions() success", this.userCards);
                    loader.dismiss();
                    this.confirmPayment.togglePopup()
                }else{
                    this.goPaymentWebview(offer);
                    loader.dismiss();
                }
            }, (err) => {
                console.log("StorePage::showPaymentOptions() error", err);
                loader.dismiss();
            });
        }
    }
    goPaymentWebviewHomeoffer(offer:any,prosub_id){
        
           let opt:string = "toolbarposition=top";
           let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
           str += '&customer_id='+CommonService.session.customer_id+'&customer_token='
           str += this.customerToken+'&offer_id=' + offer+ '&prosub_id='+prosub_id;
           console.log("goPaymentWebview", str);
           this.iab.create( str, 'blank', opt);
          
       }

    goPaymentWebview(offer:any){
     
        let opt:string = "toolbarposition=top";
        let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
        str += '&customer_id='+CommonService.session.customer_id+'&customer_token='
        str += this.customerToken+'&offer_id=' + offer+ '&prosub_id=1111';
        console.log("goPaymentWebview", str);
        this.iab.create( str, 'blank', opt);
       
    }
    paymentDone(){
        /*
        let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Successfully transaction completed.',
            buttons: ['OK']
        });
        alert.present();
        */
    }
        
    loadLink(url){
        this.appSound.play('buttonClick');
        let urlRedirect = url;
        console.log("::gameTargetLink to ", url);
        let opt:string = "toolbarposition=top";
        this.iab.create(urlRedirect, '_blank', opt);
        
    }

    mgmPageOpen(){
     
        let modal=this.modalCtrlr.create(referFriend);
        modal.present()
    }

    gameTargetLink(target){
       
      this.appSound.play('buttonClick');
      var parts=target.split('/');  
      var gameId=parts[1].slice(8);
      this.nav.push(PlayGamePage,{"game":gameId});
    }

    ngAfterViewInit() {
        console.log( "ngAfterViewInit()" );
        // this.home_slides.freeMode = true;
        // this.home_slides.loop = true;
        // this.home_slides.autoplayDisableOnInteraction = false;
    }

    showWhatsOn(){
        console.log("showWhatsOn: " + this.slideInUp);
        this.appSound.play('buttonClick');

        if(this.slideInUp) {

            let timeoutId = setTimeout(() => {
                this.whatsOn = !this.whatsOn;
                clearTimeout(timeoutId);
            }, 500);
            this.slideInUp = !this.slideInUp;

        }else{

            this.whatsOn = !this.whatsOn;

            let timeoutId = setTimeout(() => {  
              this.slideInUp = !this.slideInUp;
              clearTimeout(timeoutId);
            }, 10);
        }
    }

    showLottoSocial(){
          console.log("showLottoSocial()");
        this.appSound.play('buttonClick');
          let actionSheet = this.actionSheetCtrl.create({
          title: 'Modify your album',
          cssClass:'bottom-sheet',
          buttons: [
            {
              text: 'Destructive',
              role: 'destructive',
              handler: () => {
                console.log('Destructive clicked');
              }
            },{
              text: 'Archive',
              handler: () => {
                console.log('Archive clicked');
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
    }

    viewAllOffers(){
        this.params.goTab(4);
    }

    openTarget(str:string){
        console.log("openTarget", str);
    }

    handle(str:string){
        console.log("handle", str);
        this.appSound.play('buttonClick');
        switch (str) {
            case 'invite_firends':
                this.nav.push(JoinSyndicatePage);
               // this.nav.push(InviteFriendsPage);
              break;
          case 'add_syndicate':
               this.nav.push(AddSyndicatePage);
              break;
          case 'join_syndicate':
               this.nav.push(JoinSyndicatePage);
              break;
            case 'your_badges':
                this.params.goPage( BadgesPage )
                break
          
          default:
              // code...
              break;
        }

    }

    playFor(){
        this.appSound.play('buttonClick');
    }

    goHomePage(){
        this.params.goHomePage();
    }

    selectProducer(producer: any) {
    }


    // -------------------   slider   -----------------------
    slide = $('.slider-single');
    slideTotal;
    slideCurrent = -1;
    slideInitial() {
        this.slide = $('.slider-single');
        this.slideTotal = this.slide.length - 1;
        this.slideCurrent = -1;
        
        this.slide.addClass('proactivede');
        this.slideRight();
    }

    slideRight() {
        if (this.slideCurrent < this.slideTotal) {
          this.slideCurrent++;
        } else {
          this.slideCurrent = 0;
        }

        if (this.slideCurrent > 0) {
          var preactiveSlide = this.slide.eq(this.slideCurrent - 1);
        } else {
          var preactiveSlide = this.slide.eq(this.slideTotal);
        }
        var activeSlide = this.slide.eq(this.slideCurrent);
        if (this.slideCurrent < this.slideTotal) {
          var proactiveSlide = this.slide.eq(this.slideCurrent + 1);
        } else {
          var proactiveSlide = this.slide.eq(0);
        }

        this.slide.each(function() {
            var thisSlide = $(this);
            if (thisSlide.hasClass('preactivede')) {
                thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
            }
            if (thisSlide.hasClass('preactive')) {
                thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
            }
        });
        preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
        activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
        proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
        this.appSound.play('cardFlip');
    }

    slideLeft() {
        if (this.slideCurrent > 0) {
          this.slideCurrent--;
        } else {
          this.slideCurrent = this.slideTotal;
        }

        if (this.slideCurrent < this.slideTotal) {
          var proactiveSlide = this.slide.eq(this.slideCurrent + 1);
        } else {
          var proactiveSlide = this.slide.eq(0);
        }
        var activeSlide = this.slide.eq(this.slideCurrent);
        if (this.slideCurrent > 0) {
          var preactiveSlide = this.slide.eq(this.slideCurrent - 1);
        } else {
          var preactiveSlide = this.slide.eq(this.slideTotal);
        }
        this.slide.each(function() {
          var thisSlide = $(this);
          if (thisSlide.hasClass('proactivede')) {
            thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
          }
          if (thisSlide.hasClass('proactive')) {
            thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
          }
        });
        preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
        activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
        proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
        this.appSound.play('cardFlip');
    }

    swipeLeft(ev) {
        this.slideRight();
    }

    swipeRight(ev) {
        this.slideLeft();
    }

    private _showLoader() {
        let loader = this.loadingCtrl.create({
            content: "Loading data..."
        });
        loader.present()
        return loader;
    }


    tip(){
        console.log("clicked1")
        if( this.tip11 == true )
        {
            
            this.tip11 = false   
            
            
        }
        else{
            this.tip22 = false  
            this.delay(300);
            this.tip11 = true   
            
            
        }
    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    tip2(){
        console.log("clicked2")
        if( this.tip22 == true )
        {
            this.tip22 = false   
        }
        else{
            this.tip11 = false  
            this.delay(300);
            this.tip22 = true   
            
        }
    }

    //pull up code here
    footerExpanded() {
       
        this.count=1;
        console.log('Footer expanded!');
      }

      footerCollapsed() {
        console.log('Footer collapsed!');
      }

      toggleFooter() {
        this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
      }
      getMaximumHeight() {
        return window.innerHeight / 1.02 ;
    }
   
//countDown timer

subscribeTimer0() {

    if (this.timer0Id) {

        // Unsubscribe if timer Id is defined
        this.st.unsubscribe(this.timer0Id);
        this.timer0Id = undefined;
        this.timer0button = 'Subscribe';
        console.log('timer 0 Unsubscribed.');
    } else {

        // Subscribe if timer Id is undefined
        this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback(this.offersForYou.offer_group));
        this.timer0button = 'Unsubscribe';
        console.log('timer 0 Subscribed.');
    }
    console.log(this.st.getSubscription());
}


timer0callback(data) {

        var value: any = data[0].countdown
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
clicked(){
    this.tip11 = false;
    this.tip22 = false;
    
}

buyCreditOffer(offerId: any,prosub_id:any) {
    
    console.log("StorePage::showPaymentOptions()", offerId);
    // let offer = {total_cost:4.99} ;

    this.appSound.play('buttonClick');
    if (!this.customerToken) {
        this.goPaymentWebviewHomeoffer(offerId,prosub_id);
    }else{

       let loader=this.loadingCtrl.create();
       loader.present().then(()=>{
        this.srvOffer.buyCurrentOfferOnHomeCard(offerId).subscribe((data) => {
            console.log("StorePage::showPaymentOptions() success", data);
            let token_exists = 0;
      
            for (var i = 0; i < data.response.length; ++i) {
                if (data.response[i].get_customer_paymill_card_details) {
                    token_exists = data.response[i].get_customer_paymill_card_details.response.token_exists
                } 
            }
            if (token_exists > 0) {
                loader.dismiss()
                let modal = this.modalCtrlr.create(confirmOfferPurchasePage, {
                })
                modal.present();

              //  console.log("StorePage::showPaymentOptions() success", this.userCards);
               // this.confirmPayment.togglePopup()
            }else{
                loader.dismiss()
                this.goPaymentWebviewHomeoffer(offerId,prosub_id);
            }
        }, (err) => {
            loader.dismiss()
            console.log("StorePage::showPaymentOptions() error", err);
        });
       })
        
    }
}
showModalForcreditoffer(){
    let homeCard:boolean=true;
    let resultModal=this.modalCtrlr.create(offerBuyResultPage,{syndicateName:this.buyoffer,status:this.offerStatus,homeCard});
    resultModal.present();
    resultModal.onDidDismiss((data: any[]) => {
        if (data) {
          var tabs:Tabs=this.navCtrl.parent.parent.parent;
          tabs.select(1);
        }
    })
}
mgmOpenPage(){
    this.navCtrl.push(referFriend);
}

}
