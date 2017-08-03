import { Component, ViewChild } from '@angular/core';
import { App, Platform, NavController, NavParams, ActionSheetController, 
    Slides, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { InviteFriendsPage } from '../invite_friends/invite_friends';
import { JoinSyndicatePage } from '../join-syndicate/join-syndicate';
import { AddSyndicatePage } from '../add-syndicate/add-syndicate';

import { Params } from '../../services/params';
import { CommonService } from '../../services/common.service';
import { HomeService } from '../../services/service.home';
import { OfferService } from '../../services/offer.service';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

// import * as $ from 'jquery';
declare var $:any;

@Component({
    selector: 'page-store',
    templateUrl: 'store.html'
})
export class StorePage {
    @ViewChild(Slides) home_slides: Slides;
    @ViewChild("confirmPayment") confirmPayment;

    public homeCardData:any;
    public spaceBetween:number = 0;
    public whatsOn:boolean = false;
    public nav:NavController;

    // payment variables
    userCards: any;
    userCardsCount:number = 0;
    customerToken:string;
    jackpotList:any
    jackpotGroup:any

    slideInUp:boolean = false;
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
        public params:Params,
        private srvHome:HomeService,
        private loadingCtrl:LoadingController,
        private alertCtrl:AlertController,
        public platform: Platform, 
        public navCtrl: NavController, 
        public navParams: NavParams,
        public srvOffer: OfferService,
        private iab: InAppBrowser,
        public commonSrv:CommonService,
        public appSound:AppSoundProvider,
        public actionSheetCtrl: ActionSheetController) {

      
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

                    }
                    if (this.homeCard.offers_for_you) {
                        this.offersForYou = this.homeCard.offers_for_you;
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
        console.log("StorePage::showPaymentOptions()", offer);
        // let offer = {total_cost:4.99} ;

        this.appSound.play('buttonClick');
        if (!this.customerToken) {
            this.goPaymentWebview();
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
                    this.goPaymentWebview();
                }
            }, (err) => {
                console.log("StorePage::showPaymentOptions() error", err);
                loader.dismiss();
            });
        }
    }

    goPaymentWebview(){
        let opt:string = "toolbarposition=top";
        let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
        str += '&customer_id='+CommonService.session.customer_id+'&customer_token='
        str += this.customerToken+'&Offer_ID=1188'
        this.iab.create( str, 'blank', opt);
    }


        
    loadLink(url){
        this.appSound.play('buttonClick');
        let opt:string = "toolbarposition=top";
        this.iab.create(url, '_blank', opt);
    }

    gameTargetLink(target){
      this.appSound.play('buttonClick');
        let url = `https://nima.lottosocial.com/webview-auth/?redirect_to=${target}&customer_id=${CommonService.session.customer_id}&customer_token=${CommonService.session.customer_token}`

        console.log("::gameTargetLink to ", url);
        let opt:string = "toolbarposition=top";
        this.iab.create(url, '_blank', opt);
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




}
