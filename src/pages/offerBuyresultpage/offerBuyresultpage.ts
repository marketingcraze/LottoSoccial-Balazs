import { Component, ViewChild, OnInit } from '@angular/core';
import {App, Platform, NavController, Tabs, ViewController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';


@Component({
    selector: 'success-failure',
    templateUrl: 'offerBuyresultpage.html'
})
export class offerBuyResultPage {
    syndicateName: any;
    status: boolean;
    public nav:NavController;
    public homeOffer:boolean=false;
    constructor(private navParams: NavParams, private viewCtrl: ViewController, private navCtrl: NavController,public app:App) {
        this.homeOffer=this.navParams.get("homeCard")
        this.syndicateName = this.navParams.get("syndicateName").syndicate_name;
        this.status = this.navParams.get("status");
        this.nav = this.app.getRootNav();
    }
    getmoreline() {
        this.viewCtrl.dismiss();
    }
    moveToSyndicate(data:boolean=true) {
        this.viewCtrl.dismiss(data);
    }
    tryAgain() {
        this.viewCtrl.dismiss();
    }
}

