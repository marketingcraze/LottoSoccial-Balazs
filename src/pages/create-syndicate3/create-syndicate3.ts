import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CreateSyndicate2Page } from '../create-syndicate2/create-syndicate2';
import { CreateSyndicate4Page } from '../create-syndicate4/create-syndicate4';
/*
  Generated class for the CreateSyndicate3 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate3',
  templateUrl: 'create-syndicate3.html'
})
export class CreateSyndicate3Page {
  euroselected: boolean = false
  lottoselected: boolean = false
  powerselected: boolean = false 
  oneSelected: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicate3Page');
  }
  ionViewWillEnter() {
    if(localStorage.getItem('cardSelected')) {
      var data = JSON.parse(localStorage.getItem('cardSelected'));
      this.euroselected = data.euro;
      this.lottoselected = data.lotto;
      this.powerselected = data.power;
      if(this.euroselected || this.lottoselected || this.powerselected ) {
        this.oneSelected = true
      } else {
        this.oneSelected = false
      }
    }
    this.viewCtrl.showBackButton(false);
  }
   backTosyndicate1() {
    this.navCtrl.push(CreateSyndicatePage);
  }
  backTosyndicate2() {
    this.navCtrl.push(CreateSyndicate2Page);
  }
  selected(item) {
    if(item == 'euromillions'){
      this.euroselected = !this.euroselected
    }else if(item == 'lotto') {
      this.lottoselected = !this.lottoselected
    }else {
      this.powerselected = !this.powerselected
    }
    if(this.euroselected || this.lottoselected || this.powerselected ) {
      this.oneSelected = true
    } else {
      this.oneSelected = false
    }
  }

  next() {
    var data = {
      euro: this.euroselected,
      lotto: this.lottoselected,
      power: this.powerselected
    }
    localStorage.setItem('cardSelected', JSON.stringify(data));
    this.navCtrl.push(CreateSyndicate4Page);
  }

}
