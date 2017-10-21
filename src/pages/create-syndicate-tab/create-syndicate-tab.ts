import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, Platform, Tabs } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

declare var webengage: any;

@Component({
    selector: 'tab-create-syndicate',
    templateUrl: 'create-syndicate-tab.html'
})
export class CreateSyndicateTab implements OnInit {
    tabbarElement: any;

    ngOnInit(): void {

        this.platform.ready().then((readySource) => {
            var CurrentUserid = localStorage.getItem('appCurrentUserid');

            if (this.platform.is('cordova')) {
                webengage.engage();
                webengage.track('Create Syndicate tab Page', {
                    "UserId": CurrentUserid,
                });
            }
        });

    }
    public nav: NavController;

    constructor(
        public app: App,
        public platform: Platform,
        public navCtrl: NavController,
        public appSound: AppSoundProvider,
        public navParams: NavParams) {
        this.tabbarElement = document.querySelector('.tabbar');
        this.nav = this.app.getRootNav();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateSyndicatePage');
    }

    goBack(){
		this.tabbarElement.style.display= 'flex';
		var tabs:Tabs=this.navCtrl.parent.parent.parent;
		tabs.select(2);
	}

    goCreateSyndicate() {
        this.appSound.play('menuClick');
        this.nav.push(CreateSyndicatePage);
    }
    ionViewWillEnter() {
        this.tabbarElement.style.display = 'none';
    }
    ionViewWillLeave() {
        this.tabbarElement.style.display = 'flex';
    }
    goToOffers(){
        this.tabbarElement.style.display= 'flex';
		var tabs:Tabs=this.navCtrl.parent;
		tabs.select(0);
    }

}
