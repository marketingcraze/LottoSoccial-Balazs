import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-splash',
	templateUrl: 'splash.html'
})
export class SplashPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams) {
		
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad SplashPagePage');
    }

}
