import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthPage } from '../auth/auth';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appSound:AppSoundProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');

  }

  goLogin(){
  	console.log("goLogin");
    this.appSound.play('buttonClick');
  	this.navCtrl.push(AuthPage, {tab: 1});
  }

  goSignup(){
  	console.log("goSignup");
    this.appSound.play('buttonClick');
  	this.navCtrl.push(AuthPage, {tab: 0});
  }

}
