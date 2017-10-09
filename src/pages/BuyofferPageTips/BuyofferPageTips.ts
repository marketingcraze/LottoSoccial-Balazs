import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
@Component({
    selector:'buyOffer-Tips',
    templateUrl:'BuyofferPageTips.html'
})
export class buyOfferTips{
    constructor(public viewCtr:ViewController){

    }
    close(data){
        this.viewCtr.dismiss(data);
    }
}