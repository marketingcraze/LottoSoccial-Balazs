import { Component } from '@angular/core';
import { Platform, AlertController, Modal, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { SplashPage } from '../pages/splash/splash';
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
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { UpdatePage } from '../pages/update/update';
import { OfflinePage } from '../pages/offline/offline';

import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/db.service';
import { CommonService } from '../services/common.service';
import { Params } from '../services/params';

import { Constants } from './constants';

import { Network } from '@ionic-native/network';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = SplashPage;
    // rootPage:any = WelcomePage;
    // rootPage:any = CreateSyndicatePage;
    // rootPage:any = CreateSyndicate2Page;
    // rootPage:any = CreateSyndicate3Page;
    // rootPage:any = NewSyndicatePage;
    // rootPage:any = AddSyndicatePage;
    // rootPage:any = JoinSyndicatePage;
    // rootPage:any = HomePage;
    // rootPage:any = AuthPage;
    // rootPage:any = EditProfilePage;
    // rootPage:any = OfflinePage;
    
    // appId = 'e718b3ed-608e-4866-8f48-28cb5b229387';

    noNetworkModal:Modal;

    constructor(
        private params: Params,
        private network: Network,
        private storage: Storage,
        public platform: Platform, 
        public dbSrv: DatabaseService, 
        private _OneSignal: OneSignal,
        public commonSrv:CommonService, 
        public alertCtrl:AlertController,
        public modalCtrl: ModalController) {

        platform.ready().then(() => {
            // StatusBar.styleDefault();
            StatusBar.hide();

            this.initializeOneSignal();

            this.loadCountries();

            CommonService.isOnline = (network.type != "none");

            // show No network modal when user try to fetch data
            this.noNetworkModal = this.modalCtrl.create(OfflinePage);
            params.events.subscribe('network', (available) => {
                CommonService.isOnline = available;
                if (available) {
                    this.noNetworkModal.dismiss();
                }else{
                    this.noNetworkModal.present();
                }
            });

            // save current staus of network
            network.onConnect().subscribe(()=> {
                CommonService.isOnline = true;
            });
            network.onDisconnect().subscribe(()=> {
                CommonService.isOnline = false;
            });
            // network.onchange().subscribe((data)=> {
            //     console.log("network status changed: ", data);
            // });
            
        });
    }

    routeToHome(){
        console.log("is cordova", this.platform.is('cordova') );
    }

    loadCountries(){
        this.commonSrv.getCountry().subscribe(data=>{
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

    initializeOneSignal() {
        // if it is running on device
        if (this.platform.is('cordova')) {
            this._OneSignal.startInit(Constants.OneSignal_APP_ID, "");
            this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
            this._OneSignal.setSubscription(true);
            this._OneSignal.handleNotificationReceived().subscribe((data) => {
                // handle received here how you wish.
                console.log('handleNotificationReceived', data);
                alert("Notification opened:\n" + JSON.stringify(data));

            });
            this._OneSignal.handleNotificationOpened().subscribe(() => {
                // handle opened here how you wish.
                console.log('handleNotificationOpened');
            });
            this._OneSignal.endInit();        
        }
    }

}
