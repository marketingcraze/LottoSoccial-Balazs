import { Component,OnInit } from '@angular/core';

import { NavController, NavParams,Platform } from 'ionic-angular';
import { CheckWinningsPage } from '../check-winnings/check-winnings'
import { MySyndicatePage } from '../my-syndicate/my-syndicate';
import { Params } from '../../services/params';

import { CommonService } from '../../services/common.service';
import { CreateSyndicateTab } from '../create-syndicate-tab/create-syndicate-tab';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

declare var webengage: any;

@Component({
	selector: 'page-syndicates',
	templateUrl: 'syndicates.html'
})
export class SyndicatesPage implements OnInit {
    public static session:any;

    ngOnInit(): void {
        var CurrentUserid = localStorage.getItem('appCurrentUserid');
        this.platform.ready().then((readySource) => {
            if (this.platform.is('cordova')) {
                webengage.engage(); 
                webengage.track('Syndicates Page', {
                    "UserId" :CurrentUserid ,

                });
            }
        });
    }

    tab1child = MySyndicatePage;
    tab2child = CheckWinningsPage;

    indexSelected: number;

    constructor(
        public params:Params,
        public navCtrl: NavController, 
        public appSound:AppSoundProvider,
        public navParams: NavParams,
        public platform:Platform,
        public commonSrv:CommonService,) {
        }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SyndicatePage');
    }

    ionViewWillEnter() {
        this.indexSelected = this.navParams.data.tabIndex || 0;
        this.commonSrv.trackSegmentPage("Syndicates","SyndicatesPage").subscribe(
            data=>{
                console.log("track segment called");
            },
            err=>{            
            },
            ()=> {  }
            );
    }

    goHomePage(){
        this.appSound.play('buttonClick');
        this.params.goHomePage();
    }

    tabChange(){
        this.appSound.play('menuClick');
    }

}
