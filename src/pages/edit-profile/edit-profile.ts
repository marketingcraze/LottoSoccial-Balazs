import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events, Tabs } from 'ionic-angular';

import { EditProfileDetails } from './edit-profile-details/edit-profile-details';
import { EditProfileEmail } from './edit-profile-email/edit-profile-email';
import { EditProfilePassword } from './edit-profile-password/edit-profile-password';


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

	constructor(public navCtrl: NavController, 
		public viewCtrl:ViewController,
		public events:Events,
		public navParams: NavParams) {

		this.events.subscribe('closeMe', userEventData => {
			console.log('EditProfilePage::tab1Root event data ', userEventData);

			if (!this.dismissed) {
				this.dismissed = true;
				this.viewCtrl.dismiss(userEventData);
			}
			
		});
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfilePage');
    	this.dismissed = false
    	this.homeTabs.select(0);
	}
}
