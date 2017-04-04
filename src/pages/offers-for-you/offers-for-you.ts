import { Component } from '@angular/core';
import { App, NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-offers-for-you',
  templateUrl: 'offers-for-you.html'
})
export class OffersForYouPage {
	spaceBetween:number = -70;
	public nav:NavController;

	constructor(
		public app:App,
		public navCtrl: NavController, 
		public platform: Platform, 
		public navParams: NavParams) {

		this.nav = this.app.getRootNav();

		this.spaceBetween = Math.floor( platform.width() * -0.10 );

	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad OffersForYouPage');
	}

	goBack(){
		this.nav.pop();
	}

}
