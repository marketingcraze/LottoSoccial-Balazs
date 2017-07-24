import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

/*
  Generated class for the PlayGame page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'play-game',
  templateUrl: 'play-games.html'
})
export class PlayGamePage {
  public nav: NavController;
  constructor(public app: App, public navCtrl: NavController, public appSound: AppSoundProvider, public navParams: NavParams) {
    this.nav = this.app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayGamePage');
  }
  ionViewWillEnter() {

  }
  close() {
    this.navCtrl.pop();
  }
}