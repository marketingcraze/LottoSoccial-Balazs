import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { StorePage } from '../store/store';
import { SyndicatesPage } from '../syndicates/syndicates';
import { GamesPage } from '../games/games';
import { AccountPage } from '../account/account';
import { OffersPage } from '../offers/offers';

import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CacheController } from '../../services/cache_controller';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = StorePage;
  tab2Root: any = SyndicatesPage;
  tab3Root: any = GamesPage;
  tab4Root: any = AccountPage;
  tab5Root: any = OffersPage;
  tab6Root: any = StorePage;

  mySelectedIndex: number;

  homeCardData:any;
  gameData:any;
  homeData:any;

  private cache: CacheController;

  constructor(
    private params: Params,
    private storage: Storage,
    private navParams: NavParams,
    private navCtrl: NavController,
    public platform: Platform, 
    private iab: InAppBrowser,
    private srvDb:DatabaseService,
    private srvHome:HomeService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {

    console.log("TabsPage");

    this.cache = new CacheController(platform, srvDb, srvHome, alertCtrl);

    this.gameData = "game data";

    this.mySelectedIndex = navParams.data.tabIndex || 0;

    this.params.events.subscribe('home-data', data => {
      console.log("home-data", data);
    });
  }

  ionViewDidLoad(){
    console.log("TabsPage::ionViewDidLoad");

  }

  ionViewDidEnter() {
    // this.initData();
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    
    // this.navCtrl.push(StorePage);

    /*
    // this is only for test
    this.cache.loadModules("games", "3", ["get_your_game_list", "get_buy_game_list"])
    .then( data => {
      loader.dismiss();
      console.log("TabsPage::ionViewDidEnter", data);
    }, err => {
      loader.dismiss();
      console.log("TabsPage::ionViewDidEnter", err);
    });
*/

    this.cache.loadModules("home", "1", ["get_home_card"]).then( data => {
      loader.dismiss();

      console.log("TabsPage::ionViewDidEnter", data);
      for (var i = data.length - 1; i >= 0; i--) {
        // console.log("TabsPage::ionViewDidEnter", data[i]);
        if ( data[i]["get_home_card"] ) {
          this.populateHomeData(data[i].get_home_card.response);
          break;
        }
      }
    }, err => {
      loader.dismiss();
      console.log("TabsPage::ionViewDidEnter", err);
    });
  }

  populateHomeData(data:any){
    this.homeCardData = data;
    this.gameData = this.homeCardData.game;
    this.homeData = this.homeCardData.information_for_you;
    this.params.setHomeData( this.homeData ); 
  }

  goToStore(){
    console.log("goToStore()");
  }

  goToSyndicate(){
    console.log("goToSyndicate()");
    this.storage.get('session')
    .then(
        data => {
          let session:any = JSON.parse(data);
          let url = 'https://nima.lottosocial.com/webview-auth/?redirect_to=store&customer_id=';
          url += session.customer_id + '&customer_token=' + session.customer_token;
          console.log("session data", data, url);
          
          const browser = this.iab.create(url);
        }, error => console.log(error)
    );
    
  }

}
