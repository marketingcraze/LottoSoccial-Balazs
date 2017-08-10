import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CreateSyndicate4Page } from '../create-syndicate4/create-syndicate4';
import { ChooseNumberPage } from '../choose-number/choose-number';
import { SyndicateService } from '../../providers/syndicate-service';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';
/*
  Generated class for the CreateSyndicate5 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate5',
  templateUrl: 'create-syndicate5.html'
})
export class CreateSyndicate5Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public appSound:AppSoundProvider,
    private viewCtrl: ViewController, public _syndService: SyndicateService, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicate5Page');
  }
  ionViewWillEnter() {
    var id = localStorage.getItem('synd_id');
    this.getTerms(id);
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.appSound.play('menuClick');
    this.navCtrl.pop(CreateSyndicate4Page);
  }
  next() {
    this.appSound.play('menuClick');
    let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
    this.navCtrl.push(ChooseNumberPage);
    loader.dismiss();
  }
  getTerms(id: any) {
    this.appSound.play('buttonClick');
    let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
    this._syndService.getTerms(id).subscribe((res) => {
      loader.dismiss();
      console.log(res);
    })

  }

}
