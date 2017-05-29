import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CreateSyndicate2Page } from '../create-syndicate2/create-syndicate2';
import { CreateSyndicate3Page } from '../create-syndicate3/create-syndicate3';
import { CreateSyndicate5Page } from '../create-syndicate5/create-syndicate5';
import { SyndicateService } from '../../providers/syndicate-service';
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
  valid = false
  euroDays = {
    tue: true,
    fri: true
  }
  lottoDays = {
    wed: true,
    sat: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public _syndService: SyndicateService, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    var data = JSON.parse(localStorage.getItem('cardDefault'));
    for(var i=0;i< data.length; i++) {
      if(data[i].selected) {
        this.dataArr.push(data[i]);
        this.validArr.push(false)
      }
    }
    console.log(data);
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  backTosyndicate1() {
    this.navCtrl.push(CreateSyndicatePage);
  }
  backTosyndicate2() {
    this.navCtrl.push(CreateSyndicate2Page);
  }
  backTosyndicate3() {
    this.navCtrl.push(CreateSyndicate3Page);
  }
  next() {
    let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
    var lotArr = []
    for(var i=0; i<this.dataArr.length; i++) {
      var days = {};
      var c = 0;
      for(var j=0; j<this.dataArr[i].days.length; j++) {
        if(this.dataArr[i].dayactive[j]) {
          c++;
          days["draw_day"+c] = this.dataArr[i].days[j].substr(0, 3);
        }
      }
      lotArr.push({
        "product_name": this.dataArr[i].name,
          "draw_day_group": days,
          "line_count": this.dataArr[i].linecount
      })
    }
    var data = {
      "session_ID": "avjtjgu0f257f0orggqufcn5g2",
      "page_ID": "4",
      "screen_id": "4.4",
      "action": "syndicate_lotteries",
      "website": "Lotto Social",
      "website_id": "27",
      "source_site": "mobi.lottosocial.com",
      "module_name": "create_private_syndicate",
      "customer_id": "1970400",
      "syndicate_name": JSON.parse(localStorage.getItem('sdetails')).title,
      "image_url": JSON.parse(localStorage.getItem('sdetails')).image,
      "type": localStorage.getItem('cardType'),
      "product_group": lotArr
    }
    this._syndService.createSynd(data).subscribe((res) =>{
      loader.dismiss();
      if(res.response.response.status == "SUCCESS") {
        localStorage.setItem('cardSelected', JSON.stringify(this.dataArr));
        localStorage.setItem('synd_id',res.response.response.private_syndicate_id);
        this.navCtrl.push(CreateSyndicate5Page);
      }
      
    })

    
  }

  increase(i) {
    this.dataArr[i].linecount += 1
  }
  decrease(i) {
    if(this.dataArr[i].linecount  != 1){
      this.dataArr[i].linecount  -= 1
    }
  }
  tick(i, p) {
    this.dataArr[i].dayactive[p] = !this.dataArr[i].dayactive[p]
    if(this.validArr[i]){
      if(this.dataArr[i].dayactive.indexOf(true) == -1){
        this.validArr[i] = false
      } else [
        this.validArr[i] = true
      ]
    } else {
      this.validArr[i] = true
    }
    
    if(this.validArr.indexOf(false) == -1) {
      this.valid = true
    }else {
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
