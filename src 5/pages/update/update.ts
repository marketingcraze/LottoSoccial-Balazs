import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Market } from '@ionic-native/market';


/*
  Generated class for the Offers page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-update',
	templateUrl: 'update.html',
})
export class UpdatePage  {
 
	//spaceBetween:number ;
	constructor(
		private market: Market,
		public navCtrl: NavController) {
		//   this.spaceBetween = Math.floor( platform.width() * -0.14 );

	}

	updateNow(){
		console.log("UpdatePage::updateNow ");
		this.market.open('com.appv2.lottosocial');
	}
}