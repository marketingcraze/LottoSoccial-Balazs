import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-edit-profile-email',
  templateUrl: 'edit-profile-email.html'
})
export class EditProfileEmail {
	

	public email = {
		current_email:"",
		new_email:"",
		confirm_email:"",
		free_reg_pwd:""
	};

	constructor(public navCtrl: NavController, 
		public events:Events,
		public navParams: NavParams) {
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfileEmail');
	}

	closeMe() {
		console.log('EditProfileEmail::dismiss() ');
  		let data = { 'foo': 'bar' };
		this.events.publish('closeMe', data);
	}

	showPassword(input: any): any {
		input.type = input.type === 'password' ? 'text' : 'password';
	}

}
