import { Component } from '@angular/core';
import { ModalController,NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the CreatesyndicatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-createsyndicate',
  templateUrl: 'createsyndicate.html'
})
export class CreatesyndicatePage {
  toptab:string="offer";
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatesyndicatePagePage');
  }
  

}

