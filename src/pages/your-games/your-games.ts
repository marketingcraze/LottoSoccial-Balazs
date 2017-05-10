import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Params } from '../../services/params';

@Component({
  selector: 'page-your-games',
  templateUrl: 'your-games.html'
})
export class YourGamesPage {

	yourGames:any[];
    private unreadCount:number = 0;
    private homeMessage:any = {};

    constructor(
        private params: Params,
        public navCtrl: NavController, 
      	public navParams: NavParams) {

        console.log(typeof(this.yourGames),  typeof(this.navParams.data));

        if ( Object.keys(this.navParams.data).length != 0) {
          this.yourGames = this.navParams.data;
        }
      	console.log('constructor YourGamesPage', this.navParams.data);
    }


    goHomePage(){
        this.params.goHomePage();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad YourGamesPage', this.navParams.data);
    }
}
