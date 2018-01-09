import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { ConfirmModalPage } from '../confirm-modal/confirm-modal';
import { leaveSyndicate } from '../../services/syndicate_leave.service'
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'page-leave2',
  templateUrl: 'leave2.html'
})
export class Leave2Page {
  privateSyndicate: any;
  members; any
  syndicateId: any;
  deviceHeight: any;
  topmar: any;
  constructor(public navCtrl: NavController, public appSound: AppSoundProvider, public leaveSynd: leaveSyndicate, public loadingCtrl: LoadingController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    debugger
    this.members = this.navParams.get("members");
    this.privateSyndicate = this.navParams.get("syndId")
    this.syndicateId = this.privateSyndicate.syndicate_id
  }

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;
    this.topmar = (this.deviceHeight / 2) - 150;
    console.log('ionViewDidLoad LeavePage', this.deviceHeight, this.topmar);
  }

  dismissm() {
    this.appSound.play('buttonClick');
    let data = { 'foo': 'bar' }
    this.viewCtrl.dismiss(data);
  }
  confirm() {
    this.appSound.play('buttonClick');
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    loader.present().then(() => {
      this.leaveSynd.privateSyndicateLeave(this.syndicateId).subscribe(data => {
        if (data) {
          loader.dismiss()
          if (data.response[0].manage_syndicate.response.status == 'SUCCESS') {
            this.viewCtrl.dismiss(data);
            let confirmModal = this.modalCtrl.create(ConfirmModalPage);
            confirmModal.onDidDismiss(data => {
              console.log(data);
            });
            confirmModal.present();
          }
          else {
            loader.dismiss();
            alert("Error occured");
          }
        }
      })
    })

  }

}
