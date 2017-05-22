import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';

import { Storage } from '@ionic/storage';
import { CommonService } from '../services/common.service';


@Component({
	selector: 'page-splash',
	templateUrl: 'splash.html'
})
export class SplashPage {

	constructor(
		private storage: Storage,
        public navCtrl: NavController, 
		public navParams: NavParams) {


        this.storage.ready().then( ()=> {
            this.storage.get('session').then((val) => {
                
                CommonService.session = JSON.parse(val);

                console.log('Your session is', val);
                setTimeout(()=>{
                    if (val) {
                        this.navCtrl.setRoot(HomePage);
                    }else{
                        this.navCtrl.setRoot(WelcomePage);
                    }
                }, 5000);
            });
        });

		
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad SplashPagePage');
    }

}
