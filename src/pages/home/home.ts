import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
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

  /*// set our app's pages
  appPages: PageInterface[] = [
    { title: 'Store', component: TabsPage, icon: 'cart' },
    { title: 'Syndicates', component: TabsPage, index: 1, icon: 'people' },
    { title: 'Games', component: TabsPage, index: 2, icon: 'game-controller-b' },
    { title: 'Account', component: TabsPage, index: 3, icon: 'person' },
    { title: 'Offers', component: TabsPage, index: 4, icon: 'cash' }
  ];
*/
  rootPage = TabsPage;

  private homeMessage:any;
  public unreadCount:number = 0;
  public messages:any[];

  constructor(
    public platform: Platform, 
    public params:Params,
    private srvDb:DatabaseService,
    private srvHome:HomeService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    public menu: MenuController) {

    this.cache = new CacheController(platform, srvDb, srvHome, alertCtrl);

    /*platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });*/

    this.params.events.subscribe('home-data', data => {
      // console.log("home-data", data);
      
      for (var i = data.length - 1; i >= 0; i--) {
        
        if ( data[i].get_home_message ) {
          this.homeMessage = data[i].get_home_message.response;
          this.messages = this.homeMessage.notification;
          this.unreadCount = this.homeMessage.unread;
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

