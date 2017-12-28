import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, Tabs, LoadingController, ViewController, Content } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferService } from '../../services/offer.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { SyndicateService } from '../../providers/syndicate-service';
import { BadgeViewPage } from '../badge-view/badge-view';
import { badgesOs } from '../../services/badges.service';
declare var $: any;
import * as _ from 'lodash';
@Component({
    selector: 'page-badges',
    templateUrl: 'badges.html'
})
export class BadgesPage {
    @ViewChild(Content) content: Content;
    private data: any = [];
    downShowing = 0;
    down_arrow_showing = 0;
    loader: any;
    completedStepCount: number;
    percentage: number;
    highestBadge: any;
    steps: any;
    BadgeData: any
    badgesForYou: any;

    constructor(
        public app: App,
        public iab: InAppBrowser,
        public navParams: NavParams,
        public srvOffer: OfferService,
        public navCtrl: NavController,
        public appSound: AppSoundProvider,
        public loadingCtrl: LoadingController,
        public viewCtrl: ViewController,
        private _badgess: badgesOs,
        public _syndService: SyndicateService,
        public cdRef: ChangeDetectorRef) { }

    ionViewDidLoad() {
        console.log('inside badges');
        this.getbadges();
    }

    close() {
        this.appSound.play('buttonClick');
        this.navCtrl.popAll;
    }
    //get all badges
    getbadges() {
        this.loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        this.loader.present().then(() => {
            this._badgess.getBadgesData()
                .subscribe((res) => {
                    this.loader.dismiss();
                    debugger
                    this.data = res.response[0].badges;
                    this.addPrecentage(this.data);
                    this.highestBadge = this.findHighestPrecentage(this.data)
                    console.log(this.data);
                    var a = localStorage.getItem("badgeP")
                    if (localStorage.getItem("badgeP") == undefined || localStorage.getItem("badgeP") == null) {
                        this.down_arrow_showing = 1
                    }
                    else {
                        this.down_arrow_showing = 0
                    }
                    localStorage.setItem("badgeP", "1")
                    this.content.enableScrollListener();

                }), (err) => {
                    debugger
                    this.loader.dismiss();
                    this.appSound.play('Error');
                    alert("Error occured")
                }
        })

    }
    //badges view page redirection
    viewBadges() {
        this.appSound.play('buttonClick');
        this.navCtrl.push(BadgeViewPage);
    }
    //Scrolling handle
    scrollHandlerBadges(event) {
        var scrollDiv = document.getElementById('badgesContent').clientHeight;
        var innerDiv = document.getElementById('innerBadges').scrollHeight;
        var valu = scrollDiv + this.content.scrollTop
        console.log("data is ", valu, innerDiv, scrollDiv)
        if (valu > innerDiv) {
            this.downShowing = 1
            this.cdRef.detectChanges();
        }
        else {
            this.downShowing = 0
            this.down_arrow_showing = 0
            this.cdRef.detectChanges();
        }
    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //Adding % to the API response
    addPrecentage(datas: any): any {
        if (datas) {
            for (let i = 0; i < datas.length; i++) {
                var count = 0;
                this.percentage=0;
                if (datas[i].steps) {
                    for (let j = 0; j < datas[i].steps.length; j++) {
                        if (datas[i].steps[j].percentage == 100) {
                            count++
                        }
                        this.percentage = count / datas[i].steps.length * 100;
                    }
                }
                else {
                    if (datas[i].earned == 0) {
                        this.percentage = 0
                    } else if (datas[i].earned == 1) {
                        this.percentage = 100
                    }

                }
                this.data[i]['precentage'] = this.percentage
            }
        }
    }
    //get heighest %
    findHighestPrecentage(arg: any): any {
        var maxPrecentage: any
        var highest = 0;
        $.each(arg, function (key, article) {
            if (article.precentage > highest) {
                maxPrecentage = article;
            }
        });
        return maxPrecentage
    }
    //go to tickets page
    viewTickets(d: any) {
        this.appSound.play('buttonClick');
        this.navCtrl.push(BadgeViewPage, { badge: d });
    }

}