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
      "http://lorempixel.com/400/400/technics/1/",
       "http://lorempixel.com/400/400/technics/2/",
        "http://lorempixel.com/400/400/technics/3/",
         "http://lorempixel.com/400/400/technics/4/",
          "http://lorempixel.com/400/400/technics/5/",
           "http://lorempixel.com/400/400/technics/6/",
            "http://lorempixel.com/400/400/technics/7/",
            "http://lorempixel.com/400/400/technics/8/"
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
