import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';

/*
  Generated class for the ChooseImage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-choose-image',
  templateUrl: 'choose-image.html'
})
export class ChooseImagePage {
  private images = []
  public createsynd: CreateSyndicatePage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.images = [
      "./assets/img/pvt_cover_00"+1+"@2x.png",
      "./assets/img/pvt_cover_00"+2+"@2x.png",
      "./assets/img/pvt_cover_00"+3+"@2x.png",
      "./assets/img/pvt_cover_00"+4+"@2x.png",
      "./assets/img/pvt_cover_00"+5+"@2x.png",
      "./assets/img/pvt_cover_00"+6+"@2x.png",
      "./assets/img/pvt_cover_00"+7+"@2x.png",
      "./assets/img/pvt_cover_00"+8+"@2x.png",
      "./assets/img/pvt_cover_00"+9+"@2x.png",
      "./assets/img/pvt_cover_0"+10+"@2x.png",
      "./assets/img/pvt_cover_0"+11+"@2x.png",
      "./assets/img/pvt_cover_0"+12+"@2x.png",
            ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseImagePage');
  }
  chooseImage() {
    console.log('image selected');
  }

  selectedImage(image) {
    console.log(image);
    this.navCtrl.push(CreateSyndicatePage, {'image': image});
  }

}
