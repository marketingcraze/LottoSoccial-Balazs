import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

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

  // set our app's pages
  appPages: PageInterface[] = [
    { title: 'Store', component: TabsPage, icon: 'cart' },
    { title: 'Syndicates', component: TabsPage, index: 1, icon: 'people' },
    { title: 'Games', component: TabsPage, index: 2, icon: 'game-controller-b' },
    { title: 'Account', component: TabsPage, index: 3, icon: 'person' },
    { title: 'Offers', component: TabsPage, index: 4, icon: 'cash' }
  ];

  rootPage = TabsPage;

  constructor(platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
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

