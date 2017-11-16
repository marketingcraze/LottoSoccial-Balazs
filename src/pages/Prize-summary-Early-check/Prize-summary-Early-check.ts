import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Slides } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { PrizeSummaryWinPage } from '../prize-summary-win/prize-summary-win';
declare const $

@Component({
  selector: 'page-prize-summary-Early-check',
  templateUrl: 'Prize-summary-Early-check.html'
})  
export class PrizeSummaryEarlyCheck {
    loader:any;
    data:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    ) {
        this.loader = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
    }

  ionViewDidLoad() {
    this.getData()
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  getData() {
    this.loader.present();
    this._syndService.prizeBreakDown()
    .subscribe((res)=> {
      // res = {"response":{"status":"SUCCESS OR FAIL","message":"","title":"Your draw hasn’t taken place yet","description_group":{"description1":"Your Next available draw is ","description2":"Euro Mill -  dec 30"}}}
      console.log(res)
      this.data = res.response;
      this.loader.dismiss();
    })
    
  }
}
