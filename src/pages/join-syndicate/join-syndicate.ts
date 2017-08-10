import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';


@Component({
  selector: 'page-join-syndicate',
  templateUrl: 'join-syndicate.html'
})
export class JoinSyndicatePage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinSyndicatePage');
  }

  goCreateSyndicate(){
  	console.log('JoinSyndicatePage::goCreateSyndicate');
  	this.navCtrl.push(CreateSyndicatePage);
  }

}
