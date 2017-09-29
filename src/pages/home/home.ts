import { Component, ViewChild, NgZone ,OnInit} from '@angular/core';
import { Platform, MenuController, Nav, NavController, LoadingController, 
    AlertController, ModalController } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CheckWinningsPage } from '../check-winnings/check-winnings'
import { AccountPage } from '../account/account';
import { UpdatePage } from '../update/update';
import { BadgesPage } from '../badges/badges';
import { inboxModal } from '../inbox-popup/inbox-popup';

import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CommonService } from '../../services/common.service';
import { CacheController } from '../../services/cache_controller';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

import { TabsPage } from '../tabs/tabs';

import { your_vouchers } from '../your_vouchers/your_vouchers';
import { AffiliatePage } from '../affiliate/affiliate'
import{ HelpPage } from '../Help/Help'
import { NewSyndicatePage } from '../new-syndicate/new-syndicate'

declare var webengage:any;

export interface PageInterface {
    title: string;
    component: any;
    icon: string;
    index?: number;
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    ngOnInit(): void {

        this.platform.ready().then((readySource) => {
            var CurrentUserid = localStorage.getItem('appCurrentUserid');
             if (this.platform.is('cordova')) {
    		    webengage.engage(); 
                webengage.track('Home Page', {
                "UserId" :CurrentUserid ,
                });
              }
         });

   }

    @ViewChild(Nav) nav: Nav;
    @ViewChild("messageDetails") messageDetails;

    private cache: CacheController;

    rootPage:any = TabsPage;
    messageLoading = false;

    private homeMessage:any;
    public messages:any[] = [];

    constructor(
        public zone:NgZone,
        public params:Params,
        private iab: InAppBrowser,
        public platform: Platform, 
        private srvHome:HomeService,
        public menu: MenuController,
        private navCtrl:NavController,
        private srvDb:DatabaseService,
        private commonSrv:CommonService, 
        public appSound:AppSoundProvider,
        private alertCtrl:AlertController,
        private loadingCtrl:LoadingController,
        private _modalCtrl:ModalController
        ) {

        
        this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);

/*
        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
*/
        this.params.events.subscribe('home-data', data => {
            // console.log("home-data", data);
            
            for (var i = data.length - 1; i >= 0; i--) {
                if ( data[i].get_home_message ) {
                    this.homeMessage = data[i].get_home_message.response;
                    if (this.homeMessage.notification) {
                        // this.messages = this.homeMessage.notification;
                    }
                    params.setUnreadCount(this.homeMessage.count);
                    break;
                }
            }

            console.log("HomePage::home data", this.homeMessage, this.messages );
        });

        this.checkForNewRelease()
    }



    ionViewDidEnter() {
        if (this.messageDetails) {
            this.messageDetails.togglePopup();
        }
        
        /*
        this.menu.swipeEnable(false, 'menu1');

        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        
        this.cache.loadModules("home", "1", ["get_home_message"])
        .then( data => {
          loader.dismiss();
          console.log("HomePage::ionViewDidEnter", data);

          
          for (var i = data.length - 1; i >= 0; i--) {
            if ( data[i].get_home_message ) {

              console.log("HomePage::ionViewDidEnter", i, data[i].get_home_message.response);
              break;
            }
          }
        }, err => {
          loader.dismiss();
          console.log("TabsPage::ionViewDidEnter", err);
        });*/
    }
    ionViewWillEnter() {
        this.commonSrv.trackSegmentPage("Home","HomePage").subscribe(
            data=>{
                console.log("track segment called");
            },
            err=>{            
            },
            ()=> {  }
            );
    }

    closeMenu1(){
        this.menu.close();
    }

    onLeftMenuSelection(selection){ 
        console.log("HomePage::onLeftMenuSelection");
        this.appSound.play('menuClick');
        this.menu.close();
        switch(selection){
            case 'accounts':
                this.params.goPage( AccountPage )
                break
            case 'check_winnings':
                this.params.goPage( CheckWinningsPage )
                break
            case 'your_badges':
                this.params.goPage(BadgesPage)
                break
            case 'your_vouchers':
                this.params.goPage(your_vouchers)
                break
            case 'affiliate':
                this.params.goPage(AffiliatePage)
                break
                case 'pSyndicate':
                this.params.goPage(NewSyndicatePage)
                break
                
            case 'help':
            this.params.goPage(HelpPage)
            
             //   let opt:string = "toolbarposition=top";
               // this.iab.create('https://help.lotto-social.com/hc/en-us', 'blank', opt);
                break
        }
    }

    openPage(page: PageInterface) {
        this.menu.close();

        if (page.index) {
            this.nav.setRoot(page.component, { tabIndex: page.index });
        } else {
            this.nav.setRoot(page.component).catch(() => {
                console.log("Didn't set nav root");
            });
        }
    }

    goPage(page){
        this.menu.close();
        
        switch (page) {
            case 'create_syndicate':
                this.nav.setRoot(CreateSyndicatePage);
                break;
            
            default:
                // code...
                break;
        }

    }

    // notification menu
    onOpenRightMenu(){
        this.appSound.play('menuClick');
        this.zone.run(()=>{
            this.messageLoading = true;
        });
        this.srvHome.getHomeMessages().take(1).subscribe( (data)=> {
            console.log("onOpenRightMenu success ", data);
            this.zone.run(()=>{
                this.messageLoading = false;
                this.homeMessage = data.response[0].get_home_message.response;
                this.messages = this.homeMessage.notification;
                this.params.setUnreadCount(this.homeMessage.count);
            });
            
        }, (err)=>{
            console.log("onOpenRightMenu error ", err);
        })
    }


    checkForNewRelease(){
        this.commonSrv.getNewRelease().subscribe(data=>{
            console.log("checkForNewRelease", data);
            
            if(data.response) {
                let response = data.response[0].get_new_release.response;
                if (response && response.status == 'success') {
                    CommonService.updateAvailable = true;
                    // show update
                    this.rootPage = UpdatePage
                }
            }

            Splashscreen.hide();
        },
        err=>{
            // show offline
            this.params.setIsInternetAvailable(false);
        },
        ()=> {});
    }

    onOpenLeftMenu(){
        this.appSound.play('menuClick');
    }

    markAsUnread(){
        console.log("markAsUnread()");
    }

    deleteNotification(){
        console.log("deleteNotification()");
    }

    saveItem(){
        console.log("saveItem()");
    }
    alert(i:any){
     let inboxPopup=this._modalCtrl.create(inboxModal,{CurrentMessage: this.messages[i]});
     inboxPopup.present();
    }
}

