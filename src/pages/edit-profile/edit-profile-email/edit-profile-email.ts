import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';
import { AppSoundProvider } from '../../../providers/app-sound/app-sound';
import { AccountService } from '../../../services/account.service';

@Component({
	selector: 'page-edit-profile-email',
	templateUrl: 'edit-profile-email.html'
})
export class EditProfileEmail {
	
	public email = {
		current_email:"",
		new_email:"",
		confirm_email:"",
		current_password:""
	};

	private warningEmail:boolean = false;

	constructor(
		public events:Events, 
	    public navParams: NavParams,
		public navCtrl: NavController, 
		private srvAccount:AccountService,
		public appSound: AppSoundProvider,
	    private loadingCtrl:LoadingController,
	    private alertCtrl: AlertController) {

		console.log('EditProfileEmail ', navParams.data);
		this.email.current_email = navParams.data.accountData.email_address;
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfileEmail');
	}

	submitEmail(emailForm){
		this.appSound.play('buttonClick');
		console.log('EditProfileEmail::submitEmail() ', this.email);

		if (this.email.new_email != this.email.confirm_email) {
			this.warningEmail = true;
			return;
		}else{
			this.warningEmail = false;
		}

		let loader = this.loadingCtrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        loader.present();

    	// load data
    	this.srvAccount.saveEmail(this.email).take(1)
        .subscribe( (success:any) => {
            loader.dismiss();

            console.log("EditProfileDetails::submitDetails", success );
            if (success) {
            	let res = success.response[0].update_customer_email.response;

	            console.log("EditProfileDetails::submitDetails", res );

	            let alert = this.alertCtrl.create({
	            	title: res.status,
	            	subTitle: res.message,
	            	buttons: ['Dismiss']
	            });
	            alert.present();
            }
            

        }, err => {
			loader.dismiss();
			this.appSound.play('Error');
            console.log("AccountPage::ionViewDidLoad", err);
        });
	}

	closeMe() {
		this.appSound.play('buttonClick');
		console.log('EditProfileEmail::dismiss() ');
  		let data = { 'foo': 'bar' };
		this.events.publish('closeMe', data);
	}

	showPassword(input: any): any {
		this.appSound.play('buttonClick');
		input.type = input.type === 'password' ? 'text' : 'password';
	}


}
