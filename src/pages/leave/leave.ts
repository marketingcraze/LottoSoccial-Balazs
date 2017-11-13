import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html'
})
export class LeavePage {
  deviceHeight: any;
  paused: boolean = false;
  leave: boolean = false;
  leaveSuccess: boolean = false;
  topmar: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) { }

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
    this.leave = false
    this.leaveSuccess = false
    this.paused = true
  }
  moveTOffer(data: any = 'okay') {
    debugger
    this.viewCtrl.dismiss(data)
  }
  leaveSyndicate() {
    this.paused = false;
    this.leaveSuccess = false;
    this.leave = true
  }
  leaveSynd() {
    this.paused = false;
    this.leave = false
    this.leaveSuccess = true;

  }
}
