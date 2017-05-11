import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';

@Component({
  selector: 'page-edit-profile-details',
  templateUrl: 'edit-profile-details.html'
})
export class EditProfileDetails {

	public signup = {
		image:"",
		profile_image_url:"",
		email:"",
		free_reg_msn:'',
		free_reg_pwd: '',
		mobile:'',
		country_code:""
	};
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
		public navParams: NavParams) {

	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfileDetails');
	}

	closeMe() {
		console.log('EditProfileDetails::dismiss() ');
  		let data = { 'foo': 'bar' };
		this.events.publish('closeMe', data);
	}


}
