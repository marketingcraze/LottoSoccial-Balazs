import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CreateSyndicate5Page } from '../create-syndicate5/create-syndicate5';
import { ChooseNumberPage } from '../choose-number/choose-number';
import { SyndicateService } from '../../providers/syndicate-service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
/*
  Generated class for the CreateSyndicate5 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-agreement',
  templateUrl: 'agreement.html'
})
export class AgreementPage {
  private termsData:any;
  private agreedata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public appSound:AppSoundProvider,
    private viewCtrl: ViewController, public _syndService: SyndicateService, public loadingCtrl: LoadingController) {
        this.termsData = this.navParams.get('tandc');
        this.agreedata = this.navParams.get('agree');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicate5Page');
  }
  ionViewWillEnter() {
    var id = localStorage.getItem('synd_id');
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.appSound.play('menuClick');
    this.navCtrl.pop(CreateSyndicate5Page);
  }
  
 
  

}
