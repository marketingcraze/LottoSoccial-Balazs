import { Component } from '@angular/core';
import { NavController, NavParams, App, ViewController } from 'ionic-angular';
import { CheckWinningsNextPage } from '../check-winnings-next/check-winnings-next';
import { SyndicateService } from '../../providers/syndicate-service';
/*
  Generated class for the CheckWinnings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-winnings',
  templateUrl: 'check-winnings.html'
})
export class CheckWinningsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public viewCtrl: ViewController,public _syndService: SyndicateService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckWinningsPage');
    this.loadWinnings();
  }
  next() {
    this.app.getRootNav().push(CheckWinningsNextPage);
  }

  loadWinnings() {
    this._syndService.loadWinnings()
    .subscribe((res)=> {
      console.log(res);
    });
  }
  

}
