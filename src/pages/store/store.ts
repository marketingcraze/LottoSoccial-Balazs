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

    homeData:any;
    
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

      // this.initData();
      this.homeData = this.navParams.data;
      console.log("StorePage", this.homeData);

      this.nav = this.app.getRootNav();
      this.spaceBetween = Math.floor( platform.width() * -0.10 );


      this.params.events.subscribe('home-data', data => {
        console.log("home-data", data);
        this.homeData = data;
      });
    }

    initData(){
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      this.srvHome.getHomeCard().subscribe(
        data=>{
          loader.dismiss();

          if(data) {
            this.homeCardData = data.response[0].get_home_card.response;
            console.log("HomeCard successful", this.homeCardData);
            
          }
        },
        err => {
          loader.dismiss();
          console.log("HomeCard error", err);

          this.alertCtrl.create({
            title: 'Error!!!',
            subTitle: 'Internet disabled or server error.',
            buttons: [
            {
              text: 'OK',
              handler: data => {
                this.platform.exitApp();
              }
            }
            ],
            enableBackdropDismiss:false
          });
        },
        ()=> {}
        );
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad StorePage');
    }

    loadLink(){
        let browser = this.iab.create('https://google.com');
        browser.show();
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

  handle(str:string){
      switch (str) {
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

  inviteFriends(){
    console.log("inviteFriends()");
    this.nav = this.app.getRootNav();
    this.nav.push(InviteFriendsPage);
  }



}
