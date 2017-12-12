import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { HomePage } from '../home/home';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { CreateSyndicate5Page } from '../create-syndicate5/create-syndicate5';
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
	public sid:any;
	public mid:any;
	public sDetails: any;

	constructor( 
		public app:App,
		public navParams: NavParams,
		public _syndService: SyndicateService, public loadingCtrl: LoadingController) {

		this.navCtrl = app.getRootNav();
		this.sid = this.navParams.get('private_syndicate_id')
		this.mid = this.navParams.get('invite_member_id')
		console.log('sid ', this.sid, 'mid ', this.mid);

	}

	ionViewDidLoad() {
		this.getSyndicateDetails();
    	console.log('ionViewDidLoad SignupInvitedPage');
	}

	goHome(){
		this.navCtrl.push( HomePage );
	}

	joinSyndicate() {
			let loader = this.loadingCtrl.create({
					spinner: 'hide',
                	content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
			});
			loader.present();
			this._syndService.joinSyndicate(this.sid, this.mid)
			.subscribe((res) => {
				loader.dismiss();
				localStorage.setItem('synd_id', this.sid);
				this.navCtrl.push(CreateSyndicate5Page);
				console.log(res);
			})
	}

	getSyndicateDetails() {
		  let loader = this.loadingCtrl.create({
				spinner: 'hide',
				content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
			});
			loader.present();

		  this._syndService.geInvitedSyndicateDetails(this.sid)
		  .subscribe((res)=> {
			loader.dismiss()
			console.log(res);
			this.sDetails = res.response["0"].get_invited_private_syndicate.response;
		  })
		  
	}


}
