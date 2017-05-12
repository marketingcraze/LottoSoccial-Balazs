import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Leave page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html'
})
export class LeavePage {
  deviceHeight: any;
  topmar: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;
    this.topmar = (this.deviceHeight/2) - 120;
    console.log('ionViewDidLoad LeavePage',this.deviceHeight, this.topmar );
  }

  dismissm() {
    let data = {'foo':'bar'}
    this.viewCtrl.dismiss(data);
 }

}
