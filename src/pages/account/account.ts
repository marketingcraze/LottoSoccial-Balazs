import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Params } from '../../services/params';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(
  	private params: Params,
    public navCtrl: NavController, 
  	public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  	goHome(){
		this.params.goHomePage();
	}


}
