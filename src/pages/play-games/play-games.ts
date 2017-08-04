import { Component,OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { App, NavController, NavParams, LoadingController,Platform} from 'ionic-angular';
import {GetBooster} from '../play-games-get-booster/play-games-get-booster'

import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { PlayGamesThankYou } from '../play-games-thank-you/play-games-thank-you';
import { PlayGame } from '../../services/playgame.service';


declare var abc;
/*
  Generated class for the PlayGame page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var webengage:any;

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
            "UserId" :CurrentUserid ,
            });
          }
     });

   }
  public nav: NavController;
  private game_Info: any[];
  GameId: any;
  loading: any;

  constructor(
    private _modalController:ModalController,
    public platform:Platform,
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


    var stepSize = 50;
    setTimeout((function() {
    var step = document.getElementById("step")
    var step2 = document.getElementById("step2")
    var filler = document.getElementById("filler"),
        percentage = 65;
    return function progress() {
        filler.style.width = percentage + "%";
      if(percentage>=28)
        {
        step.style.backgroundColor="#E7D011"
        }
      else
        {
        step.style.backgroundColor="#A54D1A"  
        }
        if(percentage>=72)
          {
             step2.style.backgroundColor="#E7D011"
          }
         else
          {
           step2.style.backgroundColor="#A54D1A"  
          }
    }
}()), stepSize);


     
  }
  showBoosterModal(){
    let myModal = this._modalController.create(GetBooster,{customer_award_log_id: this.game_Info});
    myModal.present();
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