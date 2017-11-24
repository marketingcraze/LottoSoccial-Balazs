import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CreateSyndicate2Page } from '../create-syndicate2/create-syndicate2';
import { CreateSyndicate3Page } from '../create-syndicate3/create-syndicate3';
import { CreateSyndicate5Page } from '../create-syndicate5/create-syndicate5';
import { SyndicateService } from '../../providers/syndicate-service';
import { SyndicateCreatedModalPage } from '../syndicate-created-modal/syndicate-created-modal';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';


/*
  Generated class for the CreateSyndicate4 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate4',
  templateUrl: 'create-syndicate4.html'
})
export class CreateSyndicate4Page {
  count1: number = 1
  count2: number = 1
  dataArr = []
  validArr = []
  valid = true
  euroDays = {
    tue: true,
    fri: true
  }
  lottoDays = {
    wed: true,
    sat: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appSound: AppSoundProvider,public modalCtrl: ModalController,
    private viewCtrl: ViewController, public _syndService: SyndicateService, public loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    var data = JSON.parse(localStorage.getItem('cardDefault'));
    for (var i = 0; i < data.length; i++) {
      if (data[i].selected) {
        data[i].dayactive[0] = true
        this.dataArr.push(data[i]);
        this.validArr.push(true)
      }
    }
    console.log(data);
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  backTosyndicate1() {
    this.appSound.play('menuClick');
    this.navCtrl.push(CreateSyndicatePage);
  }
  backTosyndicate2() {
    this.appSound.play('menuClick');
    this.navCtrl.push(CreateSyndicate2Page);
  }
  backTosyndicate3() {
    this.appSound.play('menuClick');
    this.navCtrl.push(CreateSyndicate3Page);
  }
  next() {
    
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
    loader.present();
    var lotArr = []
    for (var i = 0; i < this.dataArr.length; i++) {
      var days = {};
      var c = 0;
      for (var j = 0; j < this.dataArr[i].days.length; j++) {
        if (this.dataArr[i].dayactive[j]) {
          c++;
          days["draw_day" + c] = this.dataArr[i].days[j].substr(0, 3);
        }
      }
      lotArr.push({
        "product_name": this.dataArr[i].name,
        "draw_day_group": days,
        "line_count": this.dataArr[i].linecount
      })
    }
    var data = {
      "syndicate_name": JSON.parse(localStorage.getItem('sdetails')).title,
      "image_url": JSON.parse(localStorage.getItem('sdetails')).image,
      "type": localStorage.getItem('cardType'),
      "product_group": lotArr
    }
    this._syndService.createSynd(data).subscribe((res) => {
      console.log(res)
      loader.dismiss();
      if (res.response["0"].create_private_syndicate.response.status == "SUCCESS") {
        localStorage.setItem('cardSelected', JSON.stringify(this.dataArr));
        localStorage.setItem('synd_id', res.response["0"].create_private_syndicate.response.private_syndicate_id);
        let leave2Modal = this.modalCtrl.create(SyndicateCreatedModalPage, { s_name:JSON.parse(localStorage.getItem('sdetails')).title  });
        leave2Modal.onDidDismiss(data => {
            console.log(data);
        });
        leave2Modal.present();
      }

    })


  }

  increase(i) {
    this.dataArr[i].linecount += 1
  }
  decrease(i) {
    if (this.dataArr[i].linecount != 1) {
      this.dataArr[i].linecount -= 1
    }
  }
  tick(i, p) {
    this.dataArr[i].dayactive[p] = !this.dataArr[i].dayactive[p]
    if (this.validArr[i]) {
      if (this.dataArr[i].dayactive.indexOf(true) == -1) {
        this.validArr[i] = false
      } else[
        this.validArr[i] = true
      ]
    } else {
      this.validArr[i] = true
    }

    if (this.validArr.indexOf(false) == -1) {
      this.valid = true
    } else {
      this.valid = false
    }
    // if(name == 'tue' || name == 'fri') {
    //   if(name == 'tue'){
    //     this.euroDays.tue = !this.euroDays.tue 
    //   }else {
    //     this.euroDays.fri = !this.euroDays.fri
    //   }
    // } else {
    //   if(name == 'wed') {
    //     this.lottoDays.wed = !this.lottoDays.wed
    //   }else {
    //     this.lottoDays.sat = !this.lottoDays.sat
    //   }
    // }
  }

}
