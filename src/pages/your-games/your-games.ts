import { Component,NgModule,ViewChild,ChangeDetectorRef } from '@angular/core';
import { App,NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GetBooster } from '../play-games-get-booster/play-games-get-booster';
import { PlayGamePage } from '../play-games/play-games';
import { Params } from '../../services/params';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { Content } from 'ionic-angular'


@Component({
  selector: 'page-your-games',
  templateUrl: 'your-games.html'
})
export class YourGamesPage {
  @ViewChild(Content) content: Content;
  private loading : any;
   game_group:any[]=[];
   tab:Tabs;
	yourGames:any[];
    private unreadCount:number = 0;
    private homeMessage:any = {};
    public nav:NavController;
    
    downShowing = 0;

    constructor(
     		public app:App,
        private params: Params,
        public navCtrl: NavController, 
      	public navParams: NavParams, 
        public authSrv:AuthService,
        public appSound:AppSoundProvider,
        private loadingCtrl: LoadingController,
        private iab: InAppBrowser,
        public cdRef: ChangeDetectorRef) {

     		this.nav = this.app.getRootNav();


        console.log(typeof(this.yourGames),  typeof(this.navParams.data));

        if ( Object.keys(this.navParams.data).length != 0) {
          this.yourGames = this.navParams.data;
        }
      	console.log('constructor YourGamesPage', this.navParams.data);
    }

   
    scrollHandlerGame(event){
      
        var innerDiv = document.getElementById('innerGames').scrollHeight;
        var scrollDiv = document.getElementById('contentsGames').clientHeight;
        
        var valu = scrollDiv + this.content.scrollTop
        console.log("sdsdsdsdsdsdsds", innerDiv, scrollDiv, valu)
        if (valu > innerDiv) 
        {
          console.log("botom")
          this.downShowing = 1
          this.cdRef.detectChanges();
      }
      else
      {
        this.downShowing = 0
        this.cdRef.detectChanges();
      }
      }
      delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    ionViewDidEnter(){
      this.delay(4000);
      this.content.enableScrollListener();
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
