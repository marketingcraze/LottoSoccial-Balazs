import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, App } from 'ionic-angular';
import { LeavePage } from '../leave/leave';
import { leaveSyndicate } from '../../services/syndicate_leave.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

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
  sizeOfSyndicate: any
  sId: any;
  dynamicText: any = "CHECK"
  oneOff: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cdChange: ChangeDetectorRef,
    public leave_syndicate: leaveSyndicate,
    public appSound: AppSoundProvider,
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
    this.appSound.play('buttonClick');
    this.navCtrl.pop();
  }
  leaveSyndicate() {
    this.appSound.play('buttonClick');
    let leaveModal = this.modalCtrl.create(LeavePage, { syndId: this.sId, billingDate: this.syndicate.resume_billing_date });
    leaveModal.onDidDismiss(data => {
      if (data == 'offerPage')
        this.viewCtrl.dismiss(data)
    });
    leaveModal.present();
  }
  getSize() {
    this.appSound.play('buttonClick');
    this.waveShowingAccount = true;
    this.result = false
    this.leave_syndicate.getSyndicateSize(this.sId, this.syndicate.syndicate_type).subscribe(data => {
      if (data) {
        if (data.response[0].get_syndicate_size.response.status == "SUCCESS") {
          this.waveShowingAccount = false;
          this.sizeOfSyndicate = data.response[0].get_syndicate_size.response.syndicate_size;
          this.result = true
        }
        else {
          this.waveShowingAccount = false;
          this.result = true
          this.dynamicText="TRY AGAIN"
        }
      }
    })
  }

}
