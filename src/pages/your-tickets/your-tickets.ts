import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ViewTicketsPage } from '../view-tickets/view-tickets';
/*
  Generated class for the YourTickets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-your-tickets',
  templateUrl: 'your-tickets.html'
})
export class YourTicketsPage {
  hideNumber: boolean = false;
  rr_to_ln: string = 'RAFFLE'
  dataArr = [{
    name:'EuroMillions',
    lines: [[12,54,23,41,19,13,34],[11,24,43,29,31,46,20],[41,13,10,1,5,32,19],[12,15,31,41,19,17,1],[52,16,34,16,12,10,9]],
    raffle: ['MVPC20881', 'ZVPD06683', 'HWPG19556', 'JWPG51409', 'VXPN10586']
  }]
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourTicketsPage');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.navCtrl.pop();
  }
  toggles() {
    this.hideNumber = !this.hideNumber;
    if(this.rr_to_ln == 'RAFFLE') {
      this.rr_to_ln = 'LINES'
    }else {
      this.rr_to_ln = 'RAFFLE'
    }
  }
  viewTickets(i) {
     this.navCtrl.push(ViewTicketsPage);
  }

}
