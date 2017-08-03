import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CreateSyndicate3Page } from '../create-syndicate3/create-syndicate3';
import { SyndicateService } from '../../providers/syndicate-service';


import { AppSoundProvider } from '../../providers/app-sound/app-sound';

/*
  Generated class for the CreateSyndicate2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate2',
  templateUrl: 'create-syndicate2.html'
})
export class CreateSyndicate2Page {
  public selectedCard: string = 'ongoing'
  public margin_img1: number = 0
  public margin_img2: number = 0

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController, 
    public appSound:AppSoundProvider,
    public _syndService: SyndicateService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicate2Page');
  }
  ionViewWillEnter() {
    if(localStorage.getItem('cardType')) {
      this.selectedCard = localStorage.getItem('cardType');
    }

    this.viewCtrl.showBackButton(false);
  }
  backTosyndicate1() {
    console.log('function is woring');
    this.navCtrl.push(CreateSyndicatePage)
  }
  next() {
    this.appSound.play('menuClick');
    localStorage.setItem('cardType', this.selectedCard);
    this.navCtrl.push(CreateSyndicate3Page)
  }
  selected(selected){
    this.appSound.play('menuClick');
    if(selected == 'ongoing') {
      // this.margin_img1 = -10
      // this.margin_img2 = 10
    } else {
      // this.margin_img1 = 31
      // this.margin_img2 = -10
    }
    this.selectedCard = selected;
    console.log(this.selectedCard);
  }
  

}
