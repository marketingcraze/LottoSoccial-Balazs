import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';

@Component({
  selector: 'page-edit-profile-password',
  templateUrl: 'edit-profile-password.html'
})
export class EditProfilePassword {
	public password = {
		current: '',
		new:'',
		confirm:""
	};


	constructor(public navCtrl: NavController, 
		public events:Events,
		public navParams: NavParams) {

	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfilePassword');
	}

	closeMe() {
		console.log('EditProfilePassword::dismiss() ');
  		let data = { 'foo': 'bar' };
		this.events.publish('closeMe', data);
	}
	
	showPassword(input: any): any {
		input.type = input.type === 'password' ? 'text' : 'password';
	}

}
