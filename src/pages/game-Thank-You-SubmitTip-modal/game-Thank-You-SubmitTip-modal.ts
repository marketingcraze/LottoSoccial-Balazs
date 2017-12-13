import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { PlayGame } from '../../services/playgame.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { PlayGamePage } from '../play-games/play-games';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
    selector: 'gameThanku-submitTip',
    templateUrl: 'game-Thank-You-SubmitTip-modal.html'
})
export class GameThankyouSubmittip {
    currentGameId: any;
    loading:any;
    constructor(private nvctrl: NavController,
        private navParms: NavParams,
        public appSound: AppSoundProvider,
        private viewctrl: ViewController,
        private loadingctrl:LoadingController,
        public platform:Platform,
        public share:SocialSharing,
    ) {
        this.currentGameId = this.navParms.get('current_gameid')
    }
    goToPlayGames(data) {
        this.appSound.play('buttonClick');
        this.loading=this.loadingctrl.create({
            spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        this.loading.present();
        this.nvctrl.push(PlayGamePage, { game: this.currentGameId });
        this.loading.dismiss();
  
    
    }
    shareNow() {
        if (this.platform.is('cordova')) {
            this.share.share("Hello this is message" , "This is subject","","https://nima.lottosocial.com/").then(() => {
    
            }).catch((data) => {
                alert(data);
            })
        }
    }

}