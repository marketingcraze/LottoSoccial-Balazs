import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, App } from 'ionic-angular';
import { LeavePage } from '../leave/leave';

/*
  Generated class for the ManageSyndicate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-manage-syndicate',
  templateUrl: 'manage-syndicate.html'
})
export class ManageSyndicatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public app: App) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageSyndicatePage');
  }
   ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
    }
    close() {
      this.navCtrl.pop();
    }
    leaveSyndicate() {
      let leaveModal = this.modalCtrl.create(LeavePage);
      leaveModal.onDidDismiss(data => {
        console.log(data);
      });
      leaveModal.present();
    }

}
