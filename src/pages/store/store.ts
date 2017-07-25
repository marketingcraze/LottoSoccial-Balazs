import { Component, ViewChild, trigger, state, style } from '@angular/core';
import { App, Platform, NavController, NavParams, ActionSheetController, 
    Slides, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { InviteFriendsPage } from '../invite_friends/invite_friends';
import { JoinSyndicatePage } from '../join-syndicate/join-syndicate';
import { AddSyndicatePage } from '../add-syndicate/add-syndicate';

import { Params } from '../../services/params';
import { CommonService } from '../../services/common.service';
import { HomeService } from '../../services/service.home';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';


@Component({
    selector: 'page-store',
    templateUrl: 'store.html'
})
export class StorePage {
    @ViewChild(Slides) home_slides: Slides;

    public homeCardData:any;
    public spaceBetween:number = 0;
    public whatsOn:boolean = false;
    public nav:NavController;

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
    },
    {
        id: 4,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 5,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 6,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 7,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 8,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 9,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 10,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 11,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 12,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 13,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 14,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 15,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 16,
        description: 'Slide',
        color: '#ed1c24',
        isSelected: false,
        imgUrl: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=200'
    },
    {
        id: 17,
        description: 'Slide',
        color: '#ed1c24',
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
        private iab: InAppBrowser,
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

            this.home_slides.coverflow.slideShadows = false;
            
            
            console.log("home data", this.homeMessage );
        });        

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StorePage');
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
}
