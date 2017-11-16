import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, LoadingController, ToastController } from 'ionic-angular';

import { AccountService } from '../../../services/account.service';

@Component({
	selector: 'page-edit-profile-details',
	templateUrl: 'edit-profile-details.html'
})
export class EditProfileDetails {

	public details = {
		image:"",
		profile_image_url:"",
		email:"",
		free_reg_msn:'',
		free_reg_pwd: '',
		mobile:'',
		country_code:""
	};

	constructor(public navCtrl: NavController, 
		public events:Events,
		private srvAccount:AccountService,
	    private toastCtrl:ToastController,
	    private loadingCtrl:LoadingController,
	    public navParams: NavParams) {

		console.log('EditProfileDetails');

	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfileDetails');
    	this.events.subscribe('edit-profile', accountData => {
    		this.details = accountData;
    		console.log('EditProfileDetails', this.details);
    	} );
	}

	closeMe() {
		console.log('EditProfileDetails::dismiss() ');
  		let data = { 'foo': 'bar' };
		this.events.publish('closeMe', data);
	}


	submitDetails(detailsForm){
		console.log('EditProfileDetails::submitDetails() ', this.details);

		let loader = this.loadingCtrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        loader.present();

    	// load data
    	this.srvAccount.saveDetails(this.details).take(1)
        .subscribe( (success:any) => {

            loader.dismiss();
            if (success) {
	            console.log("EditProfileDetails::submitDetails", success );
	            this.toastCtrl.create({
	            	message: 'Profile was updated successfully',
	            	duration: 3000,
	            	position: 'top'
	            });
            }
            

        }, err => {
            loader.dismiss();
            console.log("AccountPage::ionViewDidLoad", err);
        });
	}


}
