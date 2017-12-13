import { Component, ViewChild, OnInit } from '@angular/core';
import {App, Platform, NavController, Tabs, ViewController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';


@Component({
    selector: 'success-failure',
    templateUrl: 'offerBuyresultpage.html'
})
export class offerBuyResultPage {
    syndicateName: any;
    status: boolean;
    public nav:NavController;
    public homeOffer:boolean=false;
    constructor(private navParams: NavParams,public appSound: AppSoundProvider, private viewCtrl: ViewController, private navCtrl: NavController,public app:App) {
        this.homeOffer=this.navParams.get("homeCard")
        this.syndicateName = this.navParams.get("syndicateName").syndicate_name;
        this.status = this.navParams.get("status");
        this.nav = this.app.getRootNav();
    }
    getmoreline(data:any="getMoreLines") {
        this.appSound.play('buttonClick');
        this.viewCtrl.dismiss(data);
    }
    moveToSyndicate(data:boolean=true) {
        this.appSound.play('buttonClick');
        this.viewCtrl.dismiss(data);
    }
    tryAgain() {
        this.appSound.play('buttonClick');
        this.viewCtrl.dismiss();
    }
}

