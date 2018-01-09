import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, ModalController, App, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { PlayGame } from '../../services/playgame.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { GameThankyouSubmittip } from '../game-Thank-You-SubmitTip-modal/game-Thank-You-SubmitTip-modal';



@Component({
  selector: 'game-Thank-You',
  templateUrl: 'game-Thank-You.html'
})
export class GameThankYou {
  @ViewChild('comment') comment: any;
  gameName: any;
  public nav: NavController;
  private get_game_info_thankyou_page: any[];
  GameId: any;
  loading: any;
  Customer_award_log_id: any;
  CurrentGameId: any;
  constructor(
    private _modalController: ModalController,
    public platform: Platform,
    public app: App,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private appSound: AppSoundProvider,
    public navParams: NavParams,
    public playgameService: PlayGame,
    private loadingCtrl: LoadingController) {
    this.nav = this.app.getRootNav();
    this.Customer_award_log_id = this.navParams.get('customerAwardLogId');
    this.CurrentGameId = this.navParams.get('GameIdThanku');
    this.gameName = this.navParams.get('game_name')

  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    this.loading.present().then(() => {
      this.playgameService.gameThankyouPage(this.Customer_award_log_id)
        .subscribe(
        (responseData: any) => {
          this.get_game_info_thankyou_page = responseData.response[0].get_game_info_thankyou_page.response;
          this.loading.dismiss();
        },
        err => {
          console.log("error", err);
        }
        );
    });
  }

  OpenSubmitTipModal() {
    this.appSound.play('buttonClick');
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    this.loading.present().then(() => {
      var data = this.comment._value;
      this.playgameService.submitTip(this.gameName.game_name, data)
        .subscribe(
        (responseData: any) => {
          this.loading.dismiss();
          if (responseData) {
            debugger
            // if (responseData.response[0].insert_game_review.response.messsage == 'SUCCESS') {
              let modal = this._modalController.create(GameThankyouSubmittip, { current_gameid: this.CurrentGameId });
              modal.present();
            // }
          }
        },
        err => {
          console.log("error", err);
          this.appSound.play('Error');
        }
        );
    });
  }

}