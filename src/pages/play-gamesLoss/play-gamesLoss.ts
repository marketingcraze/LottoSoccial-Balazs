import { Component, OnInit,NgModule } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { App, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { GetBooster } from '../play-games-get-booster/play-games-get-booster'
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { PlayGamesThankYou } from '../play-games-thank-you/play-games-thank-you';
import { PlayGame } from '../../services/playgame.service';
import { CommonService } from '../../services/common.service';
import { howtoplay } from '../game-start-how-to-play/game-start-how-to-play';
import { recentWinnerTips } from '../recent-winners-tips/recent-winners-tips';
import { gameTerms } from '../game-start-game-terms/game-start-game-terms';
import { Observable } from "rxjs/Observable";
import { CordovaInstance } from "@ionic-native/core";
import { Subscription } from "rxjs/Rx";

declare var $:any;
declare var webengage: any;
declare var cordova: any;

@NgModule({
  providers:[InAppBrowser]
})

@Component({
  selector: 'game-loss',
  templateUrl: 'play-gamesLoss.html'
})
export class gameLoss{
    public nav: NavController;
    progressPercentage: any=0;
    private gameInfo: any[];
    GameId: any;
    loading: any;
    public customerAwardLogId: any;
    public gameLevelThanlyou: any;
    public step: any;
    public step2: any;
    public gameUrl: any;
    public customerId: any;
    public customerToken: any;
    public totalGameLevel:any;
    public howToPlayModal:any;
    public event:string;
    public inAppBrowser: any;
    pageLoaded:boolean=false;
  
    constructor(
      private _modalController:ModalController,
      public platform:Platform,
      public app: App,
      public navCtrl: NavController,
      private appSound: AppSoundProvider,
      public navParams: NavParams,
      public iab: InAppBrowser,
      public playgameService: PlayGame,
      private loadingCtrl: LoadingController) {
      this.nav = this.app.getRootNav();
      this.GameId = navParams.get('gameId');
      this.customerId = CommonService.session.customer_id;
      this.customerToken = CommonService.session.customer_token;
    }
    ionViewDidLoad(){
        this.loadData();
    }
    loadData() {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
      });
      console.log('ionViewDidLoad PlayGamePage');
      this.loading.present().then(() => {
      this.playgameService.getGameInfo(this.GameId)
          .subscribe(
          (responseData:any) => {
            this.gameInfo = responseData.response[0].get_game_info.response;
            this.gameLevelThanlyou = responseData.response[0].get_game_info.response.game_level;
            this.totalGameLevel=responseData.response[0].get_game_info.response.total_game_level;
            this.progressPercentage = (this.gameLevelThanlyou/this.totalGameLevel*100);
            this.customerAwardLogId = responseData.response[0].get_game_info.response.customer_award_logid;
            this.gameUrl = responseData.response[0].get_game_info.response.destination_url;
            this.loading.dismiss();
            this.pageLoaded=true;
          },
          err => {
              console.log("error", err);
          }
        );
      });
  
    }
    showBoosterModal() {
      let myModal = this._modalController.create(GetBooster, { customer_award_log_id: this.gameInfo });
      myModal.present();
    }
    close() {
      this.navCtrl.pop();
    }
    openThankyouPage() {
      this.platform.ready().then(() => {
        if (typeof cordova !== 'undefined') {
          var options = {
            location : "yes",
            toolbar: "no"
          };
            const browser = cordova.InAppBrowser.open('https://nima.lottosocial.com/webview-auth/?redirect_to=' + [this.gameUrl] + '&customer_id=' + this.customerId + '&customer_token=' + this.customerToken + '', '_blank','location=no');
            browser.addEventListener('loadstart', (event) => {
                if(event.url.includes("win"))
                    {
                       browser.close();
                       this.nav.push(PlayGamesThankYou,{customer_awardLog_id:this.customerAwardLogId,gameLevel:this.gameLevelThanlyou,game_Id:this.GameId})
                    }
                    else if(event.url.includes("loss"))
                      {
                        browser.close();
                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                      }
            });
        }
    });
  }   
   
}