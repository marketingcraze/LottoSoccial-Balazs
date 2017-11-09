import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController, Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { YourOffersPage } from '../your-offers/your-offers';
import { SendBonusPage } from '../send-bonus/send-bonus';
import { Params } from '../../services/params';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

/*
  Generated class for the Offers page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
declare var webengage: any;

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage implements OnInit {
  myIndex: number;
  ngOnInit(): void {
    this.platform.ready().then((readySource) => {
      var CurrentUserid = localStorage.getItem('appCurrentUserid');
      if (this.platform.is('cordova')) {
        webengage.engage();
        webengage.track('Offers Page', {
          "UserId": CurrentUserid,
        });
      }
    });
  }


  toptab: string = "offer";
  tab1Root = YourOffersPage;
  tab2Root = SendBonusPage;

  constructor(
    private params:Params,
    public appSound: AppSoundProvider,
    public platform: Platform,
    private storage: Storage,
    private navCtrl: NavController,
    private iab:InAppBrowser,
    public navparm: NavParams,
    public tab: Tabs) {

    if (this.navparm.get("app") == "outside") {
      this.myIndex = 1
    }

    else {
      this.myIndex = 0
    }
  }
  ionViewWillEnter() {

  }

  tabChange() {
    this.appSound.play('menuClick');
  }
  onSelectTab(tab: any) {
    debugger
    if (tab == 'store') {
     this.goToStore()
    }
  }

  goToStore() {

    this.storage.get('session')
      .then(
      data => {
        let session: any = JSON.parse(data);
        this.platform.ready().then(() => {
          if (typeof cordova !== 'undefined') {
            var browser = this.iab.create('https://nima.lottosocial.com/webview-auth/?redirect_to=store-new&customer_id=' + session.customer_id + '&customer_token=' + session.customer_token + '', '_blank', 'location=no,toolbarposition=top')
          }
        });
      }, error => {
        this.params.setIsInternetAvailable(false);
        console.log(error)
      }
      );
  }
}