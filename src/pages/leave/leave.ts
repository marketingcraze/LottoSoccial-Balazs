import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { leaveSyndicate } from '../../services/syndicate_leave.service'

@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html'
})
export class LeavePage {
  syndicateId: any;
  deviceHeight: any;
  paused: boolean = false;
  leave: boolean = false;
  leaveSuccess: boolean = false;
  topmar: any;
  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    public serviceLeave: leaveSyndicate,
    public viewCtrl: ViewController) {
    this.syndicateId = this.navParams.get("syndId")
  }

  ionViewDidLoad() {
    this.deviceHeight = window.screen.height;
    this.topmar = (this.deviceHeight / 2) - 120;
    console.log('ionViewDidLoad LeavePage', this.deviceHeight, this.topmar);
  }

  dismissm() {
    let data = { 'foo': 'bar' }
    this.viewCtrl.dismiss(data);
  }
  pauseSyndicate() {
    let loader = this.loadingCtrl.create();
    loader.present().then(() => {
      this.serviceLeave.managedSyndicatePause(this.syndicateId).subscribe(data => {
        if (data) {
          this.leave = false
          this.leaveSuccess = false
          this.paused = true
        }
      })
    })

  }
  moveTOffer(data: any = 'okay') {
    debugger
    this.viewCtrl.dismiss(data)
  }
  leaveSyndicate() {
    let loader = this.loadingCtrl.create();
    loader.present().then(() => {
      this.serviceLeave.manageSyndicateLeave(this.syndicateId).subscribe(data => {
        if (data) {
          this.paused = false;
          this.leaveSuccess = false;
          this.leave = true
        }
      })
    })

  }
  leaveSynd() {
    this.paused = false;
    this.leave = false
    this.leaveSuccess = true;

  }
}
