import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { HomePage } from '../home/home';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
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
		public navParams: NavParams,
		public _syndService: SyndicateService, public loadingCtrl: LoadingController) {

		this.navCtrl = app.getRootNav();

	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad SignupInvitedPage');
			this.joinSyndicate()
	}

	goHome(){
		this.navCtrl.push( HomePage );
	}

	joinSyndicate() {
			let loader = this.loadingCtrl.create({
					content: "Please wait..."
			});
			loader.present();
			this._syndService.joinSyndicate(20,20)
			.subscribe((res) => {
				console.log(res);
			})
	}


}
