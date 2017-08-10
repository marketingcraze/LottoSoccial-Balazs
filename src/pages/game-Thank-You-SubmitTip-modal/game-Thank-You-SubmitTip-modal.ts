import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { PlayGame } from '../../services/playgame.service';
import { PlayGamePage } from '../play-games/play-games';

@Component({
    selector: 'gameThanku-submitTip',
    templateUrl: 'game-Thank-You-SubmitTip-modal.html'
})
export class GameThankyouSubmittip {
    currentGameId: any;
    loading:any;
    constructor(private nvctrl: NavController,
        private navParms: NavParams,
        private viewctrl: ViewController,
        private loadingctrl:LoadingController
    ) {
        this.currentGameId = this.navParms.get('current_gameid')
    }

    goToPlayGames(data) {
        this.loading=this.loadingctrl.create();
        this.loading.present();
        this.nvctrl.push(PlayGamePage, { game: this.currentGameId });
        this.loading.dismiss();
    }
}