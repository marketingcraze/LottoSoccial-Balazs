import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events, Tabs, LoadingController } from 'ionic-angular';

import { EditProfileDetails } from './edit-profile-details/edit-profile-details';
import { EditProfileEmail } from './edit-profile-email/edit-profile-email';
import { EditProfilePassword } from './edit-profile-password/edit-profile-password';

import { AccountService } from '../../services/account.service';
import { Params } from '../../services/params'

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
	selector: 'page-edit-profile',
	templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
	@ViewChild("editTabs") homeTabs: Tabs;

	tab1Root: any = EditProfileDetails;
	tab2Root: any = EditProfileEmail;
	tab3Root: any = EditProfilePassword;

	dismissed:boolean = false;
	private returnData:any;

	private accountData:any;

	constructor(
		public params:Params,
		public navCtrl: NavController, 
		public viewCtrl:ViewController,
		public events:Events,
		private srvAccount:AccountService,
		public appSound:AppSoundProvider,
	    private loadingCtrl:LoadingController,
	    public navParams: NavParams) {

		console.log("EditProfilePage")

		this.events.subscribe('closeMe', userEventData => {
			console.log('EditProfilePage::tab1Root event data ', userEventData);

			this.closeModal();
			
		});
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfilePage');
    	this.dismissed = false
    	this.homeTabs.select(0);

    	this.loadProfileData();
	}


	submitDetails(detailsForm){
		this.appSound.play('buttonClick');
		console.log('EditProfilePage::submitDetails', this.accountData);
		this.appSound.play('buttonClick');

		let loader = this.loadingCtrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        loader.present();

    	// load data
    	this.srvAccount.loadProfile().take(1)
        .subscribe( (success:any) => {

            loader.dismiss();
            if (success) {
            	success = success.response;

            	for (var i = success.length - 1; i >= 0; i--) {
	            	if ( success[i].get_customer_details ) {
	            		this.accountData = success[i].get_customer_details.response;
	            		this.events.publish('edit-profile', this.accountData);
	            		break;
	            	}
	            }
	            // console.log("AccountPage::loadProfileData", this.accountData );
            }else{
            	this.closeModal();
            }
            

        }, err => {
            loader.dismiss();
            console.log("AccountPage::ionViewDidLoad", err);
            // show offline
            this.params.setIsInternetAvailable(false);
        });
	}



	loadProfileData(){
		let loader = this.loadingCtrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        })
        loader.present();

    	// load data
    	this.srvAccount.loadProfile().take(1)
        .subscribe( (success:any) => {

            loader.dismiss();
            if (success) {
            	success = success.response;

            	for (var i = success.length - 1; i >= 0; i--) {
	            	if ( success[i].get_customer_details ) {
	            		this.accountData = success[i].get_customer_details.response;
	            		this.events.publish('edit-profile', this.accountData);
	            		break;
	            	}
	            }
	            // console.log("AccountPage::loadProfileData", this.accountData );
            }else{
            	this.closeModal();
            }
            

        }, err => {
			loader.dismiss();
			this.appSound.play('Error');
            console.log("AccountPage::ionViewDidLoad", err);
            // show offline
            this.params.setIsInternetAvailable(false);
        });
	}

	private closeModal(){
		this.appSound.play('buttonClick');
		if (!this.dismissed) {
			this.dismissed = true;
			this.viewCtrl.dismiss(this.returnData);
		}
	}



}
