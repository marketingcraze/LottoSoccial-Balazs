import { Component, ViewChild } from '@angular/core';
import { Tabs, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Params } from '../../services/params';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { OfflinePage } from '../offline/offline';

@Component({
    templateUrl: 'auth.html',
    selector: 'page-auth'
})
export class AuthPage {
	@ViewChild('tabs') tabsRef: Tabs;
    tab1Root: any = SignupPage;
    tab2Root: any = LoginPage;
    selectedTabId:number = 0;
    noNetworkModal:Modal;

    constructor(
        private params:Params,
        private network: Network,
      	private navParams:NavParams,
        private navCtrl:NavController,
        public modalCtrl: ModalController) {
        this.selectedTabId = navParams.get('tab');
    }

   	ionViewDidLoad(){
        console.log("AuthPage::ionViewDidLoad", this.network.type);
        if (this.params) {
            this.params.setIsInternetAvailable(this.network.type != "none");
        }    
        if(this.selectedTabId) {
            this.tabsRef.select(this.selectedTabId, {animate: false});
        }
    }
}



