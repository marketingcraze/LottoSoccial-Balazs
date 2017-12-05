import { Component, ChangeDetectorRef } from '@angular/core';
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
  waveShowingAccount: boolean = false;
  result: boolean = false;
  syndicate: any;
  sId: any;
  oneOff: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cdChange: ChangeDetectorRef,
    public viewCtrl: ViewController, public modalCtrl: ModalController, public app: App) {
    this.syndicate = this.navParams.get("syndicate")
    this.sId = this.syndicate.syndicate_id;
    if (this.syndicate.syndicate_end_date == 'oneoff') {
      this.oneOff = true
    }
  }

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
    let leaveModal = this.modalCtrl.create(LeavePage, { syndId: this.sId, billingDate: this.syndicate.resume_billing_date });
    leaveModal.onDidDismiss(data => {
      if (data == 'offerPage')
        this.viewCtrl.dismiss(data)
    });
    leaveModal.present();
  }
  getSize() {

    this.waveShowingAccount = true;
    this.result = false
    this.cdChange.detectChanges()

  }

}
