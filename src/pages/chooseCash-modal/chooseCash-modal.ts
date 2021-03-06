import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
declare const $: any;

@Component({
  selector: 'page-chooseCash-modal',
  templateUrl: 'chooseCash-modal.html'
})

export class CashModalPage {
  deviceHeight: any;
  topmar: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appSound: AppSoundProvider,
    public app: App) { }
  //Getting device height
  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;
    var h = $('.m-div3').height();
    this.topmar = (this.deviceHeight - h) / 2;
  }

  dismissm() {
    this.appSound.play('buttonClick');
    this.viewCtrl.dismiss();
  }

  nothanks() {
    this.appSound.play('buttonClick');
    //  this.viewCtrl.dismiss();
    //  this.navCtrl.push(TabsPage);
    //  this.app.getRootNav().push(TabsPage); 
    //  this.navCtrl.setRoot(TabsPage, {tabIndex: 1})
    //  let option = [{tabIndex: 1}]
    //  this.navCtrl.popToRoot()
    //  this.navCtrl.setRoot(TabsPage, {tabIndex: 1});
  }

  find(data: any = "RDM") {
    this.appSound.play('buttonClick');
    this.viewCtrl.dismiss(data)
  }
}
