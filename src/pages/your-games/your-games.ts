import { Component } from '@angular/core';
import { App,NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PlayGamePage } from '../play-games/play-games';
import { Params } from '../../services/params';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'page-your-games',
  templateUrl: 'your-games.html'
})
export class YourGamesPage {
  private loading : any;
   game_group:any[]=[];
   tab:Tabs;
	yourGames:any[];
    private unreadCount:number = 0;
    private homeMessage:any = {};
  	public nav:NavController;

    constructor(
     		public app:App,
        private params: Params,
        public navCtrl: NavController, 
      	public navParams: NavParams, 
        public authSrv:AuthService,
        public appSound:AppSoundProvider,
        private loadingCtrl: LoadingController,
        private iab: InAppBrowser) {

     		this.nav = this.app.getRootNav();


        console.log(typeof(this.yourGames),  typeof(this.navParams.data));

        if ( Object.keys(this.navParams.data).length != 0) {
          this.yourGames = this.navParams.data;
        }
      	console.log('constructor YourGamesPage', this.navParams.data);
    }
    
    ionViewWillEnter() {
      this.loading = this.loadingCtrl.create();
      this.loading.present().then(() => {
        this.authSrv.your_games().subscribe(
          data => {
            this.game_group = data.response.response.game_group;
            console.log("your game", data);
            this.loading.dismiss();   // Hide the message when the data is ready
          },
          err => {
            console.log("error", err);
          },
          () => console.log("your games  get sucesss")
        );
      });
    }
    // play button click call this function
    play(game) {
      // this.appSound.play('buttonClick');
      // const browser = this.iab.create('https://nima.lottosocial.com/webview-auth/?redirect_to=' + [url] + '&customer_id=1970400&customer_token=818113679640');
      // console.log('https://nima.lottosocial.com/webview-auth/?redirect_to='+[url]+'&customer_id=1970400&customer_token=818113679640');
      // this.navCtrl.push(PlayGamePage);
      this.nav.push(PlayGamePage,{"game":game});
    }
    // redeem button click call this function
    redeem() {
      this.appSound.play('menuClick');
      this.navCtrl.parent.select(1);
    }


    goHomePage(){
        this.params.goHomePage();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad YourGamesPage', this.navParams.data);
    }
}
