import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';
import { CommonService } from '../../services/common.service';

@Component({
	selector: 'page-splash',
	templateUrl: 'splash.html'
})
export class SplashPage {

	constructor(
        private storage: Storage,
        public navCtrl: NavController, 
		public navParams: NavParams) {

            this.navCtrl.setRoot(HomePage)       
	}

	ionViewDidLoad() {
    	// console.log('ionViewDidLoad SplashPage');
    }

}
