import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CreateSyndicate5Page } from '../create-syndicate5/create-syndicate5';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
declare const $: any;
@Component({
  selector: 'page-syndicate-created-modal',
  templateUrl: 'syndicate-created-modal.html'
})
export class SyndicateCreatedModalPage {
  deviceHeight: any;
  topmar: any;
  sname: any;
  constructor(public navCtrl: NavController, public appSound: AppSoundProvider, public navParams: NavParams, public viewCtrl: ViewController, public app: App) {
    this.sname = this.navParams.get('s_name')
  }

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;

    var h = $('.m-div3').height();
    this.topmar = (this.deviceHeight - h) / 2;
  }

  dismissm() {
    let data = { 'foo': 'bar' }
    this.viewCtrl.dismiss(data);
  }
  agree() {
    this.appSound.play('buttonClick');
    this.viewCtrl.dismiss();
    this.navCtrl.push(CreateSyndicate5Page);
    //this.navCtrl.push(TabsPage);
    //this.app.getRootNav().push(TabsPage); 
    //  this.navCtrl.setRoot(TabsPage, {tabIndex: 1})
    //let option = [{tabIndex: 1}]
    //this.navCtrl.popToRoot()
    //this.navCtrl.setRoot(TabsPage, {tabIndex: 1});
  }
  find() {

  }

}
