import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ConfirmModalPage } from '../confirm-modal/confirm-modal';

/*
  Generated class for the Leave2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-leave2',
  templateUrl: 'leave2.html'
})
export class Leave2Page {

   deviceHeight: any;
  topmar: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;
    this.topmar = (this.deviceHeight/2) - 150;
    console.log('ionViewDidLoad LeavePage',this.deviceHeight, this.topmar );
  }

  dismissm() {
    let data = {'foo':'bar'}
    this.viewCtrl.dismiss(data);
 }
 confirm() {
    let data = {'foo':'bar'}
    this.viewCtrl.dismiss(data);
    let confirmModal = this.modalCtrl.create(ConfirmModalPage);
      confirmModal.onDidDismiss(data => {
        console.log(data);
      });
      confirmModal.present();
 }

}
