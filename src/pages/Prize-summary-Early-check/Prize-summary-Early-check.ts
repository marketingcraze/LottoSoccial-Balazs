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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    ) {
        this.loader = this.loadingCtrl.create({
          content:"Please wait..."
        });
    }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad prize summary early check');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

}
