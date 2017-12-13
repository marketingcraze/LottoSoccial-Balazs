import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

/*
  Generated class for the RecentDraw page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recent-draw',
  templateUrl: 'recent-draw.html'
})
export class RecentDrawPage {

  constructor(public navCtrl: NavController, public appSound: AppSoundProvider, public navParams: NavParams, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentDrawPage');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.appSound.play('buttonClick');
    this.navCtrl.pop();
  }

}
