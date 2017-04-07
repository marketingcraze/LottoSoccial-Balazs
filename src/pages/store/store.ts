import { Component, ViewChild, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { App, Platform, NavController, NavParams, ActionSheetController, Slides } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { InviteFriendsPage } from '../invite_friends/invite_friends';
import { JoinSyndicatePage } from '../join-syndicate/join-syndicate';
import { AddSyndicatePage } from '../add-syndicate/add-syndicate';

@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
  animations: [
  
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 100%, 0)'
      })),
      transition('in => out', animate('800ms ease-in')),
      transition('out => in', animate('800ms ease-out'))
    ])
    ]
})
export class StorePage {
    @ViewChild(Slides) home_slides: Slides;

    spaceBetween:number = -70;
    whatsOn:boolean = false;
    public nav:NavController;
    slideInUp:boolean = false;
    flyInOutState: String = 'out';
    
    constructor(
        public app:App,
        public platform: Platform, 
        public navCtrl: NavController, 
      	public navParams: NavParams,
        private iab: InAppBrowser,
      	public actionSheetCtrl: ActionSheetController) {

        this.nav = this.app.getRootNav();

        this.spaceBetween = Math.floor( platform.width() * -0.10 );
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
          console.log('hello');
          this.whatsOn = !this.whatsOn;
          clearTimeout(timeoutId);
        }, 500);
      }else{
        this.whatsOn = !this.whatsOn;
      }
      
      this.slideInUp = !this.slideInUp;
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
