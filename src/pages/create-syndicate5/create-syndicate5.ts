import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CreateSyndicate4Page } from '../create-syndicate4/create-syndicate4';
import { ChooseNumberPage } from '../choose-number/choose-number';
import { SyndicateService } from '../../providers/syndicate-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public _syndService: SyndicateService, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicate5Page');
  }
  ionViewWillEnter() {
    var id = localStorage.getItem('synd_id');
    this.getTerms(id);
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.navCtrl.pop(CreateSyndicate4Page);
  }
  next() {
    let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
    this.navCtrl.push(ChooseNumberPage);
    loader.dismiss();
  }
  getTerms(id: any) {
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
