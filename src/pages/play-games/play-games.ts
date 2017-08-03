import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { PlayGamesThankYou } from '../play-games-thank-you/play-games-thank-you';
import { PlayGame } from '../../services/playgame.service';


/*
  Generated class for the PlayGame page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'play-game',
  templateUrl: 'play-games.html'
})
export class PlayGamePage {
  public nav: NavController;
  private game_Info: any[];
  GameId: any;
  loading: any;

  constructor(
    public app: App,
    public navCtrl: NavController,
    private appSound: AppSoundProvider,
    public navParams: NavParams,
    public playgameService: PlayGame,
    private loadingCtrl: LoadingController) {
    this.nav = this.app.getRootNav();
    this.GameId = navParams.get('game').game_id;
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    console.log('ionViewDidLoad PlayGamePage');
    this.loading.present().then(() => {
      this.playgameService.getGameInfo(this.GameId)
        .subscribe(
        responseData => {
          this.game_Info = responseData.response[0].get_game_info.response;
          this.loading.dismiss();
        },
        err => {
            console.log("error", err);
        }
      );
    });
  }
  ionViewWillEnter() {

  }
  close() {
    this.navCtrl.pop();
  }

  openThankyouPage() {
    this.navCtrl.push(PlayGamesThankYou);
  }


}