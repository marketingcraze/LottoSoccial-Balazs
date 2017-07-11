import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'tab-create-syndicate',
  templateUrl: 'create-syndicate-tab.html'
})
export class CreateSyndicateTab {

	public nav:NavController;

	constructor(
		public app:App,
		public navCtrl: NavController, 
        public appSound:AppSoundProvider,
		public navParams: NavParams) {

		this.nav = this.app.getRootNav();
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreateSyndicatePage');
    }

    goBack(){
        this.appSound.play('menuClick');
    	this.nav.pop();
    }

    goCreateSyndicate(){
        this.appSound.play('menuClick');
    	this.nav.push( CreateSyndicatePage );
    }

}
