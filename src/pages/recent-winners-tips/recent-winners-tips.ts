import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { winnerTips } from '../../services/recentWinnerTips.service'

@Component({
    selector: 'recentwinner-tips',
    templateUrl: 'recent-winners-tips.html'
})
export class recentWinnerTips {
    gameInfo: any;
    constructor(private _recentWinnerTips: NavParams, private _recentTips: winnerTips, private _loadingCtrl: LoadingController) {
        debugger;
        this.gameInfo = _recentWinnerTips.get('gameInfo');
        //game_imageurl
    }
    ionViewWillEnter() {
        // let loader = this._loadingCtrl.create();
        // loader.present().then(() => {
        //     this._recentTips.getRecentWinnerTips(this.gameInfo.product_name).subscribe(data => {
        //         if (data) {
        //             debugger;
        //             let alldata=data.response.get_game_tipss
        //         }
        //     })
        // })
    }

}