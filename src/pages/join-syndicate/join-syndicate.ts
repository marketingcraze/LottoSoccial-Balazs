import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';


@Component({
  selector: 'page-join-syndicate',
  templateUrl: 'join-syndicate.html'
})
export class JoinSyndicatePage {

  constructor(public navCtrl: NavController, 
    public appSound: AppSoundProvider,
  	public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinSyndicatePage');
  }

  goCreateSyndicate(){
    this.appSound.play('buttonClick');
  	console.log('JoinSyndicatePage::goCreateSyndicate');
  	this.navCtrl.push(CreateSyndicatePage);
  }

}
