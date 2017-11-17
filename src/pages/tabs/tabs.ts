import { ViewChild, Component, ElementRef, Renderer } from '@angular/core';
import {
    NavController, NavParams, ModalController, Platform, LoadingController,
    AlertController, Tabs, MenuController
} from 'ionic-angular';

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

import { AppSoundProvider } from '../../providers/app-sound/app-sound';
declare var cordova: any;

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

    mySelectedIndex: number = 2;

    homeCardData: any;
    gameData: any;
    homeData: any;

    private cache: CacheController;

    constructor(

        public el: ElementRef, public renderer: Renderer,

        private params: Params,
        private storage: Storage,
        private navParams: NavParams,
        public navCtrl: NavController,
        private iab: InAppBrowser,
        public platform: Platform,
        private srvDb: DatabaseService,
        private srvHome: HomeService,
        private menuCtrl: MenuController,
        public appSound: AppSoundProvider,
        public modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {
        this.menuCtrl
        console.log("TabsPage", navParams.data);

        this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);

        this.gameData = "game data";

        this.mySelectedIndex = navParams.data.tabIndex || 2;
// debugger
        if (this.params.events) {
            this.params.events.subscribe('go-page', (page) => {
                let currentTab = this.homeTabs.getActiveChildNav();
                console.log("go-page", page, currentTab);
                try {
                    if (page && currentTab.enabled) {
                        currentTab.push(page);
                    }
                } catch (e) {
                    console.log("why the hell", e);
                }
            });
            this.params.events.subscribe('go-tab', (tab) => {
                console.log("go-tab", tab);
                if (!tab) {
                    tab = 0;
                }
                try {
                    this.homeTabs.select(tab);
                } catch (e) {
                    console.log("home tab null", e);
                }

            });

        }
    }

    ionViewDidLoad() {
        console.log("TabsPage::ionViewDidLoad");
        this.homeTabs.select(this.mySelectedIndex);
    }

    ionViewDidEnter() {

        // this.initData();
        let loader = this.loadingCtrl.create({
            spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
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
            .then(data => {
                loader.dismiss();

                console.log("TabsPage::ionViewDidEnter", data);
                this.params.setHomeData(data);

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

    onSelectTab(tab) {
        // debugger;
        var tabss = this.homeTabs.getActiveChildNav()
        if (tabss._views[1]) {
            // tabss[0]._views[0].dismiss();
            tabss._views[1].dismiss();
        }
        var menu1 = this.menuCtrl.getMenus();
        console.log("TabsPage::onSelectTab", tab);
        this.appSound.play('menuClick');
        switch (tab) {
            case 'account':
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hidehome', false)
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hide-account', true)
                break
            case 'store':
                this.goToStore();
                break
            case 'sideMenu':
            menu1[1].open();
            default:
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hidehome', true)
                // this.renderer.setElementClass(this.homeTabs.getNativeElement(), 'hide-account', false)
                break

        }
    }

    populateHomeData(data: any) {
        this.homeCardData = data;
        this.gameData = this.homeCardData.game;
        this.homeData = this.homeCardData.information_for_you;
        this.params.setHomeData(this.homeData);
    }

    goToStore() {
        // console.log("goToStore()");
        this.storage.get('session')
            .then(
            data => {
                let session: any = JSON.parse(data);
                //   let url = 'https://nima.lottosocial.com/webview-auth/?redirect_to=store-new&customer_id=';
                //   url += session.customer_id + '&customer_token=' + session.customer_token;
                //   console.log("session data", data, url);

                //   let opt:string = "toolbarposition=top";
                //   const browser = this.iab.create(url, "_blank", opt);

                this.platform.ready().then(() => {
                    if (typeof cordova !== 'undefined') {

                        var browser = this.iab.create('https://nima.lottosocial.com/webview-auth/?redirect_to=store-new&customer_id=' + session.customer_id + '&customer_token=' + session.customer_token + '', '_blank', 'location=no,toolbarposition=top')
                        // browser.on("loadstop").
                        //     subscribe(
                        //     (data) => {
                        //         debugger
                        //         // alert(data)
                        //         browser.insertCSS({ code: "body{background-color:#4286f4!important;}" })
                        //     },
                        //     err => {
                        //         console.log("InAppBrowser Loadstop Event Error: " + err);
                        //     });
                    }
                });


            }, error => {
                this.params.setIsInternetAvailable(false);
                console.log(error)
            }
            );
    }

}
