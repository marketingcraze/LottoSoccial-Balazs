import { Component, ViewChild } from '@angular/core';
import { Tabs, NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'auth.html',
  selector: 'page-auth'
})
export class AuthPage {
	@ViewChild('tabs') tabsRef: Tabs;

  tab1Root: any = SignupPage;
  tab2Root: any = LoginPage;

  selectedTabId:number = 0;

    constructor(
      	private navCtrl:NavController,
      	private navParams:NavParams) {

      this.selectedTabId = navParams.get('tab');
    	
    }


   	ionViewDidLoad(){
        console.log("ionViewDidLoad");
        if(this.selectedTabId) {
          this.tabsRef.select(this.selectedTabId, {animate: false});
        }
  	}

}
