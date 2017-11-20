import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, Tabs, LoadingController, ViewController,Content } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferService } from '../../services/offer.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { SyndicateService } from '../../providers/syndicate-service';
import { BadgeViewPage } from '../badge-view/badge-view';
import { badgesOs } from '../../services/badges.service';
declare var $: any;

@Component({
    selector: 'page-badges',
    templateUrl: 'badges.html'
})
export class BadgesPage {
    @ViewChild(Content) content:Content;
    private data:any = [];
    downShowing = 0;
    down_arrow_showing = 0;
    loader:any;
    completedStepCount: number;
    percentage: any;
    steps: any;
    BadgeData: any
    badgesForYou: any;
     constructor(
        public app: App,
        public iab: InAppBrowser,
        public navParams: NavParams,
        public srvOffer: OfferService,
        public navCtrl: NavController,
        public appSound:AppSoundProvider,
        public loadingCtrl: LoadingController,
        public viewCtrl: ViewController,
        private _badgess: badgesOs,
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
        
        this.loader = this.loadingCtrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        this.loader.present();
        this._syndService.getBadgeOS()
        .subscribe((res)=> {
            debugger
            this.data = res.response[0].get_badgeos.response.data.achievements;
            console.log(this.data);
            var a = localStorage.getItem("badgeP")
			if(localStorage.getItem("badgeP") == undefined || localStorage.getItem("badgeP") == null)
			{
				this.down_arrow_showing = 1
			}
			else{
				this.down_arrow_showing = 0
			}
			localStorage.setItem("badgeP","1")
            this.content.enableScrollListener();
         //   this.getMoreBdgesData()

        })
        
       
    }
    getMoreBdgesData(){
        this._badgess.getBadgesData().subscribe(badgeData => {
                debugger
            if (badgeData) {
                var response = badgeData.response[0].badges
                for (let i = 0; i <= response.length; i++) {
                    this.steps = response[i].steps;
                    this.completedStepCount = this .countCompletedStep(this.steps)
                    this.percentage = this.completedStepCount / this.BadgeData.steps.length * 100;
                }
               }
              else
                if (this.BadgeData.earned == 0) {
                  this.percentage = 0
                } else if (this.BadgeData.earned == 1) {
                  this.percentage = 100
                }
                this.loader.dismiss()
            }
        )
    }
    countCompletedStep(steps) {
        var count = 0;
        for (let i = 0; i <= steps / length; i++) {
          if (steps[i].percentage == 100) {
            count++
          }
        }
        return count;
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
            this.down_arrow_showing = 0
			this.cdRef.detectChanges();
		  }
		  }
		  delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

}