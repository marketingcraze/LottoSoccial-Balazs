import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

/*
  Generated class for the SignupInvited page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup-invited',
  templateUrl: 'signup-invited.html'
})
export class SignupInvitedPage {
	public navCtrl: NavController

	constructor( 
		public app:App,
		public navParams: NavParams) {

		this.navCtrl = app.getRootNav();

	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad SignupInvitedPage');
	}

	goHome(){
		this.navCtrl.push( HomePage );
	}


}
