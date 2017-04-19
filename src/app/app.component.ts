import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { JoinSyndicatePage } from '../pages/join-syndicate/join-syndicate';
import { NewSyndicatePage } from '../pages/new-syndicate/new-syndicate';
import { AddSyndicatePage } from '../pages/add-syndicate/add-syndicate';
import { SignupInvitedPage } from '../pages/signup-invited/signup-invited';
import { AuthPage } from '../pages/auth/auth';

import { Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { CommonService } from '../services/common.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = WelcomePage;
    // rootPage = NewSyndicatePage;
    // rootPage = AddSyndicatePage;
    // rootPage = HomePage;
    // rootPage = AuthPage;

    constructor(
      private storage: Storage,
      public platform: Platform, 
        public commonSrv:CommonService, 
        public secureStorage: SecureStorage,
        public alertCtrl:AlertController) {

      platform.ready().then(() => {
        // StatusBar.styleDefault();
        StatusBar.hide();

        // check if logged in
        console.log("is cordova", this.platform.is('cordova') );
        if (this.platform.is('cordova')) {
          this.secureStorage.create(CommonService.SecureStorageUser)
          .then((storageObject: SecureStorageObject) => {
              storageObject.get('session')
              .then(
                data => { 
                  console.log(data);
                  this.rootPage = HomePage;
                },
                error => console.log(error)
              );
          });
        }else{
            storage.ready().then( ()=> {
              storage.get('session').then((val) => {
                console.log('Your session is', val);
                if (val) {
                  this.rootPage = HomePage;
                }
              });
            });
        }

        commonSrv.getCountry().subscribe(
        data=>{
          if(data) {
            CommonService.countries = data;
          }
          
          console.log("countries loaded", CommonService.countries);
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
