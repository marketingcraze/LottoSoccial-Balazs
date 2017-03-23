import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';

import { CommonService } from '../services/common.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = WelcomePage;

    constructor(
        platform: Platform, 
        commonSrv:CommonService, 
        alertCtrl:AlertController) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
