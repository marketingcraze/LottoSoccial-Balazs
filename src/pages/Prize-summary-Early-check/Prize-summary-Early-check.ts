import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Slides, Platform } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { PrizeSummaryWinPage } from '../prize-summary-win/prize-summary-win';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
declare const $
declare var cordova: any;
@Component({
  selector: 'page-prize-summary-Early-check',
  templateUrl: 'Prize-summary-Early-check.html'
})
export class PrizeSummaryEarlyCheck {
  loader: any;
  data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public storage: Storage,
    public appSound: AppSoundProvider,
    public iab: InAppBrowser,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
  ) {

  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.getData()
  }
  getData() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    this.loader.present();
    this._syndService.prizeBreakDown()
      .subscribe((res) => {
        res = { "response": { "status": "SUCCESS OR FAIL", "message": "", "title": "Your draw hasn’t taken place yet", "description_group": { "description1": "Your Next available draw is ", "description2": "Euro Mill -  dec 30" } } }
        console.log(res)
        this.data = res.response;
        this.loader.dismiss();
      })
  }
  openStore() {
    this.appSound.play('buttonClick');
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

      }
      );
  }
}
