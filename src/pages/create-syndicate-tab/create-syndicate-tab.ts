import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';

@Component({
  selector: 'tab-create-syndicate',
  templateUrl: 'create-syndicate-tab.html'
})
export class CreateSyndicateTab {

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

    goCreateSyndicate(){
    	this.nav.push( CreateSyndicatePage );
    }

}
