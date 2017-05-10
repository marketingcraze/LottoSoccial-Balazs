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

@Component({
  selector: 'page-store',
  templateUrl: 'store.html'
})
export class StorePage {
    @ViewChild(Slides) home_slides: Slides;

    homeCardData:any;
    spaceBetween:number = -70;
    whatsOn:boolean = false;
    public nav:NavController;
    slideInUp:boolean = false;
    flyInOutState: String = 'out';

    homeCard:any;
    gameGroup:any;
    accountDetails:any = {
      bonus_credit:0.00,
      reward_points:0
    };
    homeMessage:any;
    unreadCount:string = "0";
    homeBlog:any;
    homeEvents:any;
    popMainSlide:any;
    popSlides:any;

    homeData:any = {};
    
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
      	public actionSheetCtrl: ActionSheetController) {

      
      // this.homeData = this.navParams.data;
      console.log("StorePage", this.navParams.data);

      this.nav = this.app.getRootNav();
      this.spaceBetween = Math.floor( platform.width() * -0.10 );


      this.params.events.subscribe('home-data', data => {
        console.log("home-data", data);
        
        for (var i = data.length - 1; i >= 0; i--) {
          
          if ( data[i].get_home_card ) {
            this.homeCard = data[i].get_home_card.response;
            this.gameGroup = this.homeCard.game.game.game_group;
          }else if ( data[i].get_account_details ) {
            this.accountDetails = data[i].get_account_details.response;
          }else if ( data[i].get_home_message ) {
            this.homeMessage = data[i].get_home_message.response;
            this.unreadCount = this.homeMessage.unread;
          }else if ( data[i].get_home_events ) {
            this.homeEvents = data[i].get_home_events.response.events[0];
          }else if ( data[i].get_home_blog ) {
            this.homeBlog = data[i].get_home_blog.response.blogs;
          }
        }

        console.log("home data", this.homeMessage );
      });
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad StorePage');
    }

    loadLink(url){
        let browser = this.iab.create(url, '_blank');
        // browser.show();
    }

    ngAfterViewInit() {
        console.log( "ngAfterViewInit()" );
        // this.home_slides.freeMode = true;
        this.home_slides.autoplayDisableOnInteraction = false;
    }

    showWhatsOn(){
      console.log("showWhatsOn: " + this.slideInUp);

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

  openTarget(str:string){
    console.log("openTarget", str);
  }
  handle(str:string){
    console.log("handle", str);

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



}
