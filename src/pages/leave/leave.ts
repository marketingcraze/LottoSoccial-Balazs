import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { leaveSyndicate } from '../../services/syndicate_leave.service'
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html'
})
export class LeavePage {
  resumeBilling: any;
  syndicateId: any;
  deviceHeight: any;
  paused: boolean = false;
  leave: boolean = false;
  leaveSuccess: boolean = false;
  topmar: any;
  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public appSound: AppSoundProvider,
    public navParams: NavParams,
    public serviceLeave: leaveSyndicate,
    public viewCtrl: ViewController) {
    this.resumeBilling = this.navParams.get("billingDate")
    this.syndicateId = this.navParams.get("syndId")
  }

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;
    this.topmar = (this.deviceHeight / 2) - 120;
    console.log('ionViewDidLoad LeavePage', this.deviceHeight, this.topmar);
  }

  dismissm() {
    this.appSound.play('buttonClick');
    let data = { 'foo': 'bar' }
    this.viewCtrl.dismiss(data);
  }
  pauseSyndicate() {
    this.appSound.play('buttonClick');
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    loader.present().then(() => {
      this.serviceLeave.managedSyndicatePause(this.syndicateId).subscribe(data => {
        if (data) {
          loader.dismiss();
          this.leave = false
          this.leaveSuccess = false
          this.paused = true
        }
        else {
          loader.dismiss()
        }
      })
    })
  }
  moveTOffer(data: any = 'offerPage') {
    this.appSound.play('buttonClick');
    this.viewCtrl.dismiss(data)
  }
  leaveSyndicateManaged() {
    this.appSound.play('buttonClick');
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    loader.present().then(() => {
      this.serviceLeave.manageSyndicateLeave(this.syndicateId).subscribe(data => {
        if (data) {
          if (data.response[0].manage_syndicate.response.status == 'SUCCESS') {
            loader.dismiss();
            this.paused = false;
            this.leaveSuccess = false;
            this.leave = true
          }
          else {
            alert("oops!! Errrrrrr")
          }
        }
      })
    })
  }
  leaveSynd() {
    this.appSound.play('buttonClick');
    this.paused = false;
    this.leave = false
    this.leaveSuccess = true;

  }
}
