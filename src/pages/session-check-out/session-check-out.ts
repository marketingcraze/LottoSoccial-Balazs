import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonService } from '../../services/common.service';
import { SplashPage } from '../splash/splash';
import { WelcomePage } from '../welcome/welcome';


@Component({
  selector: 'page-session-check-out',
  templateUrl: 'session-check-out.html',
})
export class SessionCheckOutPage {

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private storage: Storage) {
    this.storage.ready().then( ()=> {
      
                  this.storage.get('session_ID').then((val) => {
                      CommonService.sessionId = val;
                  });
      
                  this.storage.get('session').then((val) => {
                      
                      CommonService.session = JSON.parse(val);
                      
                      console.log('Your session is', val);
                      if(val){
                               this.navCtrl.setRoot(SplashPage);
                      }
                      else{
                          this.navCtrl.setRoot(WelcomePage);
                      }
                      
                  });
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionCheckOutPage');

  }

}
