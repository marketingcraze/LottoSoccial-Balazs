import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CreateSyndicate2Page } from '../create-syndicate2/create-syndicate2';
import { CreateSyndicate4Page } from '../create-syndicate4/create-syndicate4';
import { SyndicateService } from '../../providers/syndicate-service';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

/*
  Generated class for the CreateSyndicate3 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate3',
  templateUrl: 'create-syndicate3.html'
})
export class CreateSyndicate3Page {
  euroselected: boolean = false
  lottoselected: boolean = false
  powerselected: boolean = false 
  oneSelected: boolean = true
  lotteries = [];
  selectCount: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController, 
    public appSound:AppSoundProvider,
    public _syndService: SyndicateService, 
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log("lottery page")
  }
  ionViewWillEnter() {

    if(localStorage.getItem('cardDefault')) {
      this.lotteries = JSON.parse(localStorage.getItem('cardDefault'));
      for(var i=0; i<this.lotteries.length; i++) {
        if(this.lotteries[i].selected) {
          this.selectCount += 1
        }
      }
      // if(this.selectCount >= 1) {
      //   this.oneSelected = true;
      // } else {
      //   this.oneSelected = false;
      // }

    } else {
      this.getlotteris();
    }
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
  selected(index) {
    this.appSound.play('buttonClick');
    this.lotteries[index].selected = !this.lotteries[index].selected;
    if(this.lotteries[index].selected) {
      this.selectCount += 1
    }else {
      this.selectCount -= 1
    }
    // if(this.selectCount >= 1) {
    //   this.oneSelected = true;
    // } else {
    //   this.oneSelected = false;
    // }
    
  }

  next() {
    if(this.selectCount >= 1) {
      this.oneSelected = true;
    } else {
      this.oneSelected = false;
      return;
    }
    localStorage.setItem('cardDefault', JSON.stringify(this.lotteries));
    this.navCtrl.push(CreateSyndicate4Page);
  }

  getlotteris() {
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        loader.present();
    this._syndService.getLotteries().subscribe((res) => {
        // console.log(res);
        loader.dismiss();
        var arr = res.response["0"].get_syndicate_lotteries.response.product_group;
        var len = arr.length;
        for(var i=0; i<len; i++) {
          var days = [];
          var dayactive = [];
          for(var key in arr[i].draw_day) {
            days.push(arr[i].draw_day[key]);
            dayactive.push(false);
          }
        this.lotteries.push({
          name: arr[i].product_name,
          selected: false,
          days: days,
          image: arr[i].product_image,
          dayactive: dayactive,
          linecount: 1,
          lines: []
        });
      }
        console.log(this.lotteries);
    })
  }

}
