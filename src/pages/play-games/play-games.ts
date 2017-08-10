import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { App, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { GetBooster } from '../play-games-get-booster/play-games-get-booster'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { PlayGamesThankYou } from '../play-games-thank-you/play-games-thank-you';
import { PlayGame } from '../../services/playgame.service';
import { CommonService } from '../../services/common.service';


declare var abc;
/*
  Generated class for the PlayGame page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var webengage: any;

@Component({
  selector: 'play-game',
  templateUrl: 'play-games.html'
})
export class PlayGamePage implements OnInit {
  ngOnInit(): void {
    this.platform.ready().then((readySource) => {
      var CurrentUserid = localStorage.getItem('appCurrentUserid');
      if (this.platform.is('cordova')) {
        webengage.engage();
        webengage.track('Play Game Page', {
          "UserId": CurrentUserid,
        });
      }
    });
  }

  public nav: NavController;
  progressPercentage: any;
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
    this.GameId = navParams.get('game').game_id;
    if (this.GameId == null || this.GameId === 'undefined') {
      this.GameId = navParams.get('game');
    }
    this.customerId = CommonService.session.customer_id;
    this.customerToken = CommonService.session.customer_token;
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    console.log('ionViewDidLoad PlayGamePage');
    this.loading.present().then(() => {
      this.playgameService.getGameInfo(this.GameId)
        .subscribe(
        responseData => {
          this.gameInfo = responseData.response[0].get_game_info.response;
          this.gameLevelThanlyou = responseData.response[0].get_game_info.response.game_level;
          this.totalGameLevel=responseData.response[0].get_game_info.response.total_game_level;
          this.progressPercentage = (this.gameLevelThanlyou/this.totalGameLevel*100);
          this.progressBardesign();
          this.customerAwardLogId = responseData.response[0].get_game_info.response.customer_award_logid;
          
          this.gameUrl = responseData.response[0].get_game_info.response.destination_url;
          this.loading.dismiss();
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
  ionViewWillEnter() {

  }
  close() {
    this.navCtrl.pop();
  }

  openThankyouPage() {
    const browser = this.iab.create('https://nima.lottosocial.com/webview-auth/?redirect_to=' + [this.gameUrl] + '&customer_id=' + this.customerId + '&customer_token=' + this.customerToken + '');
  }
  progressBardesign() {

    if (this.progressPercentage >= 72) {
      this.step = "#E7D011";
      this.step2 = "#E7D011";
    }
    else {
      this.step2 = "#A54D1A";
      if (this.progressPercentage >= 28) {
        this.step = "#E7D011";
      }
      else {
        this.step = "#A54D1A";
      }
    }


  }

}