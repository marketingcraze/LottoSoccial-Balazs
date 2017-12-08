import { Component,NgModule,ViewChild,ChangeDetectorRef,OnInit } from '@angular/core';
import { App,NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GetBooster } from '../play-games-get-booster/play-games-get-booster';
import { PlayGamePage } from '../play-games/play-games';
import { Params } from '../../services/params';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { Content, Platform } from 'ionic-angular'

declare var webengage:any;
@Component({
  selector: 'page-your-games',
  templateUrl: 'your-games.html'
})
export class YourGamesPage implements OnInit {
  @ViewChild(Content) content: Content;
  private loading : any;
   game_group:any[]=[];
   down_arrow_showing = 0;
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
        public platform:Platform,
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

    ngOnInit(): void {
      this.platform.ready().then((readySource) => {
        var CurrentUserid = localStorage.getItem('appCurrentUserid');
        if (this.platform.is('cordova')) {
          webengage.track('Your Games page', {
            "UserId": CurrentUserid,
          });
          webengage.screen("GamesPage")
          webengage.notification.onDismiss((inAppData)=> {
         });
        }
      });
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
        this.down_arrow_showing = 0
        this.cdRef.detectChanges();
      }
      }
      delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    ionViewDidEnter(){
    
    }
    ionViewWillEnter() {
    
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
      });
      debugger
      this.loading.present().then(() => {
        this.authSrv.your_games().subscribe(
          data => {
            this.game_group = data.response.response.game_group;
          
            
            this.loading.dismiss();   // Hide the message when the data is ready
         
          },
          err => {
            console.log("error", err);
          },
          () =>this.downA()
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
downA(){

  if(localStorage.getItem("yourGamesP") == undefined || localStorage.getItem("yourGamesP") == null)
  {
   
    var len = this.game_group.length
    debugger
    if(len < 6)
    {
      this.down_arrow_showing = 0
    }
    else{
      this.down_arrow_showing = 1
    }
   }
  else{
    this.down_arrow_showing = 0
  }
  localStorage.setItem("yourGamesP","1")
  this.content.enableScrollListener();
  setTimeout(()=>
  {
    this.down_arrow_showing = 0
    this.cdRef.detectChanges()
    console.log("value changed for dwn arow in yours offer")
  }, 3000);
}

    goHomePage(){
        this.params.goHomePage();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad YourGamesPage', this.navParams.data);
    }
   
}
