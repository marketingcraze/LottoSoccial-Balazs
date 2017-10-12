import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { winnerTips } from '../../services/recentWinnerTips.service'

@Component({
    selector: 'recentwinner-tips',
    templateUrl: 'recent-winners-tips.html'
})
export class recentWinnerTips {
    tipsData: any;
    gameInfo: any;
    constructor(private _recentWinnerTips: NavParams, private _recentTips: winnerTips, private _loadingCtrl: LoadingController) {
        this.gameInfo = _recentWinnerTips.get('gameInfo');
    }
    ionViewWillEnter() {
        let loader = this._loadingCtrl.create();
        loader.present().then(() => {
            this._recentTips.getRecentWinnerTips(this.gameInfo.game_name).subscribe(
                data => {
                    if (data) {
                        this.tipsData = data.response[0].get_game_tipss.response.tips;
                        loader.dismiss();
                    }
                },
                err => {
                    loader.dismiss();
                    console.log("error", err);
                }
            )
        })
    }

}