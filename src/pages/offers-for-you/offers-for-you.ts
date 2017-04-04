import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-offers-for-you',
  templateUrl: 'offers-for-you.html'
})
export class OffersForYouPage {
	spaceBetween:number = -70;

	constructor(public navCtrl: NavController, 
		public platform: Platform, 
		public navParams: NavParams) {

		this.spaceBetween = Math.floor( platform.width() * -0.10 );

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersForYouPage');
  }

}
