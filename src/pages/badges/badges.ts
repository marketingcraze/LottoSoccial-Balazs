import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, Tabs, LoadingController, ViewController,Content } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferService } from '../../services/offer.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { SyndicateService } from '../../providers/syndicate-service';
import { BadgeViewPage } from '../badge-view/badge-view';

declare var $: any;

@Component({
    selector: 'page-badges',
    templateUrl: 'badges.html'
})
export class BadgesPage {
    @ViewChild(Content) content:Content;
    private data:any = [];
    downShowing = 0;
     constructor(
        public app: App,
        public iab: InAppBrowser,
        public navParams: NavParams,
        public srvOffer: OfferService,
        public navCtrl: NavController,
        public appSound:AppSoundProvider,
        public loadingCtrl: LoadingController,
        public viewCtrl: ViewController,
        public _syndService: SyndicateService,
        public cdRef:ChangeDetectorRef ) {  }

      
    ionViewDidLoad() {
        console.log('inside badges');
        this.getbadges();
    
         
        /*this.data = [{
            name:'Newbie',
            completed: 100,
            points: 100,
            total:1,
            count: 1
        },
        {
            name:'Checked in',
            completed: 66,
            points: 500,
            total:3,
            count: 2
        },
        {
            name:'Arcade',
            completed: 20,
            points: 1000,
            total:5,
            count: 1
        },
        {
            name:'Bruci Bonus',
            completed: 100,
            points: 300,
            total:5,
            count: 5
        },
        {
            name:'Jet-set',
            completed: 40,
            points: 500,
            total:5,
            count: 2
        },
        {
            name:'Read all about it',
            completed: 0,
            points: 500,
            total:1,
            count: 0
        },
        {
            name:'Subscriber',
            completed: 100,
            points: 500,
            total:1,
            count: 1
        }]*/

        /*for(var i=0; i<this.data.length; i++) {
            var grarr = Array(this.data[i].total - this.data[i].count).fill('whatever');
            var gnarr = Array(this.data[i].count).fill('whatever');
            this.data[i].greenC = gnarr;
            this.data[i].grayC = grarr;
        }*/
    }
    ionViewWillEnter() {
       // this.viewCtrl.showBackButton(false);
    }
    close() {
        this.navCtrl.popAll;
    }
    getbadges() {
        this._syndService.getBadgeOS()
        .subscribe((res)=> {
            this.data = res.response[0].get_badgeos.response.data.achievements;
            console.log(this.data);
            this.delay(4000);
            this.content.enableScrollListener();

        })
    }

    viewBadges() {
        this.navCtrl.push(BadgeViewPage);
    }
    scrollHandlerBadges(event){
		var scrollDiv = document.getElementById('badgesContent').clientHeight;
		var innerDiv = document.getElementById('innerBadges').scrollHeight;
			
			var valu = scrollDiv + this.content.scrollTop
			console.log("data is " , valu, innerDiv, scrollDiv)
			if (valu > innerDiv) 
			{
			  this.downShowing = 1
			  this.cdRef.detectChanges();
		  }
		  else
		  {
			this.downShowing = 0
			this.cdRef.detectChanges();
		  }
		  }
		  delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

}