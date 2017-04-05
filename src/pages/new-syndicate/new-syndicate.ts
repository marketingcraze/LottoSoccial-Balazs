import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddSyndicatePage } from '../add-syndicate/add-syndicate';

@Component({
  selector: 'page-new-syndicate',
  templateUrl: 'new-syndicate.html'
})
export class NewSyndicatePage {
	constructor(public navCtrl: NavController, 
		public navParams: NavParams) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewSyndicatePage');
	}


	goPage(page:number){
  		this.navCtrl.push(AddSyndicatePage, {tab: page});
  	}
  	

}
