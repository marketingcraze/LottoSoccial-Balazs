import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthPage } from '../auth/auth';


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goLogin(){
  	console.log("goLogin");
  	this.navCtrl.push(AuthPage, {tab: 1});
  }

  goSignup(){
  	console.log("goSignup");
  	this.navCtrl.push(AuthPage, {tab: 0});
  }

}
