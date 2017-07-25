import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YourGamesPage } from '../your-games/your-games';
import { RedeemGamesPage } from '../redeem-games/redeem-games';
import { CommonService } from '../../services/common.service';

import { Params } from '../../services/params';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
    selector: 'page-games',
    templateUrl: 'games.html'
})
export class GamesPage {
    tab1Root = YourGamesPage;
    tab2Root = RedeemGamesPage;

    gameGroup: any = {};

    constructor(
        public commonSrv: CommonService,
        private params: Params,
        private navParams: NavParams,
        public appSound: AppSoundProvider,
        private navCtrl: NavController) {

        console.log('GamesPage', this.navParams.data);
        if (this.navParams.data.game) {
            this.gameGroup = this.navParams.data.game.game_group;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GamesPage', this.navParams.data);
    }
    ionViewWillEnter() {

        this.commonSrv.trackSegmentPage("Games", "GamesPage").subscribe(
            data => {
                console.log("track segment called");
            },
            err => {
            },
            () => { }
        );
    }
    tabChange() {
        this.appSound.play('menuClick');
    }
}
