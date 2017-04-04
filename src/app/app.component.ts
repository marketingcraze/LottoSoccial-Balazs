import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { JoinSyndicatePage } from '../pages/join-syndicate/join-syndicate';
import { NewSyndicatePage } from '../pages/new-syndicate/new-syndicate';
import { AddSyndicatePage } from '../pages/add-syndicate/add-syndicate';

import { CommonService } from '../services/common.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = WelcomePage;
    // rootPage = NewSyndicatePage;
    // rootPage = AddSyndicatePage;

    constructor(
        platform: Platform, 
        commonSrv:CommonService, 
        alertCtrl:AlertController) {
    
    platform.ready().then(() => {
      // StatusBar.styleDefault();
      StatusBar.hide();

      commonSrv.getCountry1().subscribe(
      data=>{
          CommonService.countries = data;
          console.log("countries loaded");
          Splashscreen.hide();
      },
      err=>{

        let alert = alertCtrl.create({
            title: 'Error!!!',
            subTitle: 'Internet disabled or server error.',
            enableBackdropDismiss:false,
            buttons: [
            {
                text: 'OK',
                handler: (data) => {
                    platform.exitApp();
                }
            }]
        });
        // alert.present();
      },
      ()=> {
      });
      
    });
  }
}
