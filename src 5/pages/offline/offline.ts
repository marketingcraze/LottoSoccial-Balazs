import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Network } from '@ionic-native/network';

import { Params } from '../../services/params';

@Component({
	selector: 'page-offline',
	templateUrl: 'offline.html',
})
export class OfflinePage  {

	//spaceBetween:number ;
	constructor(
		private params:Params,
		public navCtrl: NavController, 
		private network:Network ) {
		//   this.spaceBetween = Math.floor( platform.width() * -0.14 );
	}

	checkInternet(){
		console.log("checkInternet()");

		if (this.params && this.network.type != "none") {
			this.params.setIsInternetAvailable(this.network.type != "none")
		}
	}
}