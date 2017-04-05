import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CreateSyndicate2Page } from '../create-syndicate2/create-syndicate2';
import { CreateSyndicate3Page } from '../create-syndicate3/create-syndicate3';
import { CreateSyndicate5Page } from '../create-syndicate5/create-syndicate5';
/*
  Generated class for the CreateSyndicate4 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate4',
  templateUrl: 'create-syndicate4.html'
})
export class CreateSyndicate4Page {
  count1: number = 1
  count2: number = 1
  euroDays = {
    tue: true,
    fri: true
  }
  lottoDays = {
    wed: true,
    sat: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicate4Page');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  backTosyndicate1() {
    this.navCtrl.push(CreateSyndicatePage);
  }
  backTosyndicate2() {
    this.navCtrl.push(CreateSyndicate2Page);
  }
  backTosyndicate3() {
    this.navCtrl.push(CreateSyndicate3Page);
  }
  next() {
    this.navCtrl.push(CreateSyndicate5Page);
  }
  increase(name) {
    if(name == 'c1'){
      this.count1 += 1
    }else {
      this.count2 += 1
    }
  }
  decrease(name) {
    if(name == 'c1'){
      if(this.count1 != 1){
        this.count1 -= 1
      }
    }else {
      if(this.count2 != 1){
      this.count2 -= 1
      }
    }
  }
  tick(name) {
    if(name == 'tue' || name == 'fri') {
      if(name == 'tue'){
        this.euroDays.tue = !this.euroDays.tue 
      }else {
        this.euroDays.fri = !this.euroDays.fri
      }
    } else {
      if(name == 'wed') {
        this.lottoDays.wed = !this.lottoDays.wed
      }else {
        this.lottoDays.sat = !this.lottoDays.sat
      }
    }
  }

}
