import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';

import { AddSyndicatePage } from '../add-syndicate/add-syndicate';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

declare var webengage:any;

@Component({
  selector: 'page-new-syndicate',
  templateUrl: 'new-syndicate.html'
})
export class NewSyndicatePage implements OnInit {
 ngOnInit(): void {
  
     this.platform.ready().then((readySource) => {
        var CurrentUserid = localStorage.getItem('appCurrentUserid');
        if (this.platform.is('cordova')) {
			webengage.engage(); 
            webengage.track('New Syndicate Page', {
            "UserId" :CurrentUserid ,
            });
          }
     });
   }


	constructor(public navCtrl: NavController,
     public platform:Platform, 
     public appSound: AppSoundProvider,
		public navParams: NavParams) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewSyndicatePage');
	}


	goPage(page:number){
    this.appSound.play('buttonClick');
  		this.navCtrl.push(AddSyndicatePage, {tab: page});
  	}
  	

}
