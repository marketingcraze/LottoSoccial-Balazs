import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YourGamesPage } from '../your-games/your-games';
import { RedeemGamesPage } from '../redeem-games/redeem-games';


import { Params } from '../../services/params';


@Component({
  selector: 'page-games',
  templateUrl: 'games.html'
})
export class GamesPage {
    tab1Root = YourGamesPage;
    tab2Root = RedeemGamesPage;

    gameGroup:any = {};

    constructor(
        private params: Params,
        private navParams:NavParams,
        private navCtrl:NavController) {

        console.log('GamesPage', this.navParams.data);
        if (this.navParams.data.game) {
            this.gameGroup = this.navParams.data.game.game_group;
        }

        this.params.events.subscribe('go-page', (page) => {
            if (page) {
                this.navCtrl.push(page);
            }
        });


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GamesPage', this.navParams.data);
    }
}
