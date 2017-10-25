import { Component, OnInit, NgModule } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { App, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { GetBooster } from '../play-games-get-booster/play-games-get-booster'
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { PlayGamesThankYou } from '../play-games-thank-you/play-games-thank-you';
import { PlayGame } from '../../services/playgame.service';
import { CommonService } from '../../services/common.service';
import { howtoplay } from '../game-start-how-to-play/game-start-how-to-play';
import { recentWinnerTips } from '../recent-winners-tips/recent-winners-tips';
import { gameTerms } from '../game-start-game-terms/game-start-game-terms';
import { gameLoss } from '../play-gamesLoss/play-gamesLoss';
import { Observable } from "rxjs/Observable";
import { CordovaInstance } from "@ionic-native/core";
import { Subscription } from "rxjs/Rx";


declare var $: any;

/*
  Generated class for the PlayGame page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var webengage: any;
declare var cordova: any;

@NgModule({
  providers: [InAppBrowser]
})

@Component({
  selector: 'play-game',
  templateUrl: 'play-games.html'
})

export class PlayGamePage implements OnInit {
  scrollContent: any;
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
  progressPercentage: any = 0;
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
  public totalGameLevel: any;
  public howToPlayModal: any;
  public event: string;
  public inAppBrowser: any;
  public gameLoss: boolean = true;
  pageLoaded: boolean = false;
  boosterInfo = ""

  constructor(
    private _modalController: ModalController,
    public platform: Platform,
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
    // this.slider();
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    console.log('ionViewDidLoad PlayGamePage');
    this.loading.present().then(() => {
      this.playgameService.getGameInfo(this.GameId)
        .subscribe(
        (responseData: any) => {
          this.gameInfo = responseData.response[0].get_game_info.response;
          this.boosterInfo = responseData.response[0].get_game_info.response.booster_status
          this.gameLevelThanlyou = responseData.response[0].get_game_info.response.game_level;
          this.totalGameLevel = responseData.response[0].get_game_info.response.total_game_level;
          this.progressPercentage = (this.gameLevelThanlyou / this.totalGameLevel * 100);
          this.slider(this.gameLevelThanlyou);
          this.customerAwardLogId = responseData.response[0].get_game_info.response.customer_award_logid;

          this.gameUrl = responseData.response[0].get_game_info.response.destination_url;
          this.loading.dismiss();
          this.pageLoaded = true;
        },
        err => {
          console.log("error", err);
        }
        );
    });

  }
  showBoosterModal() {
    this.scrollContent = document.querySelector('.scroll-content');
    this.scrollContent.style['overflow'] = 'hidden';
    let myModal = this._modalController.create(GetBooster, { customer_award_log_id: this.gameInfo });
    myModal.present();
    myModal.onDidDismiss((data: any[]) => {
      if (data) {
        this.scrollContent = document.querySelector('.scroll-content');
        this.scrollContent.style['overflow'] = 'none';
      }
    })
  }
  ionViewWillEnter() {

  }
  close() {
    this.navCtrl.pop();
  }

  openThankyouPage() {
    this.platform.ready().then(() => {
      if (typeof cordova !== 'undefined') {
        const browser = cordova.InAppBrowser.open('https://nima.lottosocial.com/webview-auth/?redirect_to=' + [this.gameUrl] + '&customer_id=' + this.customerId + '&customer_token=' + this.customerToken + '', '_blank', 'location=no,toolbarposition=top');
        browser.addEventListener('loadstart', (event) => {
          if (event.url.includes("win")) {
            browser.close();
            this.nav.push(PlayGamesThankYou, { customer_awardLog_id: this.customerAwardLogId, gameLevel: this.gameLevelThanlyou, game_Id: this.GameId })
          }
          else if (event.url.includes("loss")) {
            browser.close();
            this.navCtrl.push(gameLoss, { gameId: this.GameId })
          }
        });

        //If we want to close the page after the page is loaded

        //   browser.addEventListener('loadstop', (event) => {
        //     alert("loadstop"+event);

        // });

      }
    });

  }
  howToPlay() {
    this.howToPlayModal = this._modalController.create(howtoplay, { gameInfo: this.gameInfo })
    this.howToPlayModal.present();
  }
  recentWinnerTipsmodal() {
    this.howToPlayModal = this._modalController.create(recentWinnerTips, { gameInfo: this.gameInfo })
    this.howToPlayModal.present();
  }
  gameTermsModal() {
    this.howToPlayModal = this._modalController.create(gameTerms, { gameTermsdata: this.gameInfo })
    this.howToPlayModal.present();
  }

  slider(level: any) {
    setTimeout(function () {
      $('.progressbarPlayGame').each(function () {
        var t = $(this);
        var dataperc = t.attr('data-perc'),
          barperc = Math.round(dataperc * 2.5);
        t.find('.barPlayGame').animate({ width: barperc }, dataperc * 25);
        t.find('.labelPlayGame').append('<div class="perc"></div>');

        function perc() {
          var length = t.find('.barPlayGame').css('width'),
            perc = Math.round(parseInt(length) / 2.5),
            labelpos = (parseInt(length) - 2);
          t.find('.labelPlayGame').css('left', labelpos);
          t.find('.perc').text("Level " + level);
        }
        perc();
        setInterval(perc, 0);
      });
    }, 1000);
  }
}