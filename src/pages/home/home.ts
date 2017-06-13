import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, MenuController, Nav, NavController, LoadingController, 
    AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CheckWinningsPage } from '../check-winnings/check-winnings'
import { AccountPage } from '../account/account';

import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CommonService } from '../../services/common.service';
import { CacheController } from '../../services/cache_controller';


import { TabsPage } from '../tabs/tabs';
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
export class HomePage {
    @ViewChild(Nav) nav: Nav;

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
        private alertCtrl:AlertController,
        private loadingCtrl:LoadingController) {

        this.cache = new CacheController(platform, srvDb, srvHome, alertCtrl);

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
    }



    ionViewDidEnter() {
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

    closeMenu1(){
        this.menu.close();
    }

    onLeftMenuSelection(selection){
        this.menu.close();
        switch(selection){
            case 'accounts':
                // this.params.goTab(4)
                this.params.goPage( AccountPage )
                break
            case 'check_winnings':
                this.params.goPage( CheckWinningsPage )
                break
            case 'help':
                let opt:string = "toolbarposition=top";
                this.iab.create('https://help.lotto-social.com/hc/en-us', 'blank', opt);
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

    onOpenLeftMenu(){

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
}

