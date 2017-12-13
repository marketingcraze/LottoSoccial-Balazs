import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';
import { AppSoundProvider } from '../../../providers/app-sound/app-sound';
import { AccountService } from '../../../services/account.service';

@Component({
	selector: 'page-edit-profile-password',
	templateUrl: 'edit-profile-password.html'
})
export class EditProfilePassword {
	public password = {
		current_password: '',
		new_password:'',
		confirm_password:""
	};

	warningPasswordMatch:boolean = false;

	constructor(public navCtrl: NavController, 
		public events:Events,
		public navParams: NavParams,
		private srvAccount:AccountService,
		public appSound: AppSoundProvider,
	    private loadingCtrl:LoadingController,
	    private alertCtrl: AlertController) {

	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfilePassword');
	}

	submitPassword(passwordForm){
		this.appSound.play('buttonClick');
		console.log('EditProfilePassword::submitEmail() ', this.password);

		if (this.password.new_password != this.password.confirm_password) {
			this.warningPasswordMatch = true;
			return;
		}else{
			this.warningPasswordMatch = false;
		}

		let loader = this.loadingCtrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        loader.present();

    	// load data
    	this.srvAccount.updatePassword(this.password).take(1)
        .subscribe( (success:any) => {
            loader.dismiss();

            console.log("EditProfilePassword::submitPassword", success );
            if (success) {
            	let res = success.response[0].update_customer_password.response;

	            console.log("EditProfilePassword::submitPassword", res );

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
            console.log("EditProfilePassword::submitPassword", err);
        });
	}


	closeMe() {
		this.appSound.play('buttonClick');
		console.log('EditProfilePassword::dismiss() ');
  		let data = { 'foo': 'bar' };
		this.events.publish('closeMe', data);
	}
	
	showPassword(input: any): any {
		this.appSound.play('buttonClick');
		input.type = input.type === 'password' ? 'text' : 'password';
	}

}
