import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-create-syndicate',
  templateUrl: 'create-syndicate.html'
})
export class CreateSyndicatePage {

	public nav:NavController;

	constructor(
		public app:App,
		public navCtrl: NavController, 
		public navParams: NavParams) {

		this.nav = this.app.getRootNav();
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreateSyndicatePage');
    }

    goBack(){
    	this.nav.pop();
    }

}
