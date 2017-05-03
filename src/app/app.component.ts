import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { JoinSyndicatePage } from '../pages/join-syndicate/join-syndicate';
import { NewSyndicatePage } from '../pages/new-syndicate/new-syndicate';
import { AddSyndicatePage } from '../pages/add-syndicate/add-syndicate';
import { CreateSyndicatePage } from '../pages/create-syndicate/create-syndicate';
import { CreateSyndicate2Page } from '../pages/create-syndicate2/create-syndicate2';
import { CreateSyndicate3Page } from '../pages/create-syndicate3/create-syndicate3';
import { SignupInvitedPage } from '../pages/signup-invited/signup-invited';
import { AuthPage } from '../pages/auth/auth';

import { Storage } from '@ionic/storage';
import { CommonService } from '../services/common.service';
import { DatabaseService } from '../services/db.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;
  // rootPage:any = CreateSyndicatePage;
  // rootPage:any = CreateSyndicate2Page;
  // rootPage:any = CreateSyndicate3Page;
  // rootPage:any = NewSyndicatePage;
  // rootPage:any = AddSyndicatePage;
  // rootPage:any = JoinSyndicatePage;
  // rootPage:any = HomePage;
  // rootPage:any = AuthPage;

  constructor(
    private storage: Storage,
    public platform: Platform, 
    public dbSrv:DatabaseService, 
    public commonSrv:CommonService, 
    public alertCtrl:AlertController) {

    platform.ready().then(() => {
      // StatusBar.styleDefault();
      StatusBar.hide();

      // check if logged in
      this.isLoggedIn();
      
    });
  }



  isLoggedIn(){
    console.log("is cordova", this.platform.is('cordova') );

    this.storage.ready().then( ()=> {
      this.storage.get('session').then((val) => {

        CommonService.session = JSON.parse(val);
        
        console.log('Your session is', val);
        if (val) {
          this.rootPage = HomePage;
        }else{
          this.loadCountries();
        }
      });
    });
  }

  loadCountries(){
    this.commonSrv.getCountry().subscribe(
      data=>{
        if(data) {
          CommonService.countries = data;
        }
        
        // console.log("countries loaded", CommonService.countries);
        Splashscreen.hide();
      },
      err=>{
        let alert = this.alertCtrl.create({
            title: 'Error!!!',
            subTitle: 'Internet disabled or server error.',
            enableBackdropDismiss:false,
            buttons: [
            {
              text: 'OK',
              handler: (data) => {
                  this.platform.exitApp();
              }
            }]
        });
        // alert.present();
      },
      ()=> {});
  }

}
