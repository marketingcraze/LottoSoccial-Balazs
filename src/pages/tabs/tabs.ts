import { ViewChild, Component, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, LoadingController, 
    AlertController, Tabs } from 'ionic-angular';

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
    @ViewChild("homeTabs") homeTabs: Tabs;

    tab1Root: any = StorePage;
    tab2Root: any = StorePage;
    tab3Root: any = SyndicatesPage;
    tab4Root: any = GamesPage;
    tab5Root: any = AccountPage;
    tab6Root: any = OffersPage;

    mySelectedIndex: number;

    homeCardData:any;
    gameData:any;
    homeData:any;

    private cache: CacheController;

    constructor(

        public el: ElementRef, public renderer: Renderer,

        private params: Params,
        private storage: Storage,
        private navParams: NavParams,
        public navCtrl: NavController,
        private iab: InAppBrowser,
        public platform: Platform, 
        private srvDb:DatabaseService,
        private srvHome:HomeService,
        public modalCtrl: ModalController,
        private loadingCtrl:LoadingController,
        private alertCtrl:AlertController) {

        console.log("TabsPage");

        this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);

        this.gameData = "game data";

        this.mySelectedIndex = navParams.data.tabIndex || 0;

        if (this.params.events) {
            this.params.events.subscribe('go-page', (tab) => {
                console.log("go-page", tab, this.homeTabs.getActiveChildNav());
                if (tab && this.homeTabs.getActiveChildNav().enabled) {
                    this.homeTabs.getActiveChildNav().push(tab);
                }
            });
            this.params.events.subscribe('go-tab', (tab) => {
                console.log("go-tab", tab);
                if (!tab) {
                    tab = 0;
                }
                this.homeTabs.select( tab );
            });


        }

    }

    ionViewDidLoad(){
        console.log("TabsPage::ionViewDidLoad");
        this.homeTabs.select(0);
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

        this.cache.loadModules("home", "1", ["get_home_card", "get_account_details", "get_home_message"])
        .then( data => {
            loader.dismiss();

            console.log("TabsPage::ionViewDidEnter", data);
            this.params.setHomeData( data ); 
      
            /*
            for (var i = data.length - 1; i >= 0; i--) {
            // console.log("TabsPage::ionViewDidEnter", i, data[i].get_home_card);
            if ( data[i].get_home_card ) {
              // this.populateHomeData(data[i].get_home_card.response);
              break;
            }
            }*/
        }, err => {
            loader.dismiss();
            // show offline
            this.params.setIsInternetAvailable(false);
            console.log("TabsPage::ionViewDidEnter", err);
        });
    }

    onSelectTab(tab){
        // console.log("TabsPage::onSelectTab", tab);
        
        switch(tab){
            case 'account':
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hidehome', false)
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hide-account', true)
                break
            case 'store':
                this.goToStore();
            default:
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hidehome', true)
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hide-account', false)
                break

        }
    }

    populateHomeData(data:any){
        this.homeCardData = data;
        this.gameData = this.homeCardData.game;
        this.homeData = this.homeCardData.information_for_you;
        this.params.setHomeData( this.homeData );
    }

    goToStore(){
        // console.log("goToStore()");
        this.storage.get('session')
        .then(
            data => {
              let session:any = JSON.parse(data);
              let url = 'https://nima.lottosocial.com/webview-auth/?redirect_to=store&customer_id=';
              url += session.customer_id + '&customer_token=' + session.customer_token;
              // console.log("session data", data, url);
              
              let opt:string = "toolbarposition=top";
              const browser = this.iab.create(url, "_blank", opt);
            }, error =>{
                // show offline
                this.params.setIsInternetAvailable(false);
                console.log(error)
            } 
        );
    }

}
