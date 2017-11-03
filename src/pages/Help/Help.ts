import { Component,ChangeDetectorRef,ViewChild,ElementRef} from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController,Tabs,ScrollEvent } from 'ionic-angular';
import { Content } from 'ionic-angular'

import { Inject, HostListener } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { DOCUMENT } from "@angular/platform-browser";
import {InAppBrowser} from '@ionic-native/in-app-browser'


@Component({
  selector: 'page-Help',
  templateUrl: 'Help.html'
})

export class HelpPage {
  @ViewChild(Content) content: Content;
  @ViewChild('newDiv') fileInput:ElementRef;
  downShowing = 0;
  down_arrow_showing = 0;
  lottoSocialGamesHalf:any;
  material_icon = 0;
  lottoSocialBonusHalf:any;
  constructor(public navCtrl: NavController,
     private viewctrl:ViewController,
     public cdRef: ChangeDetectorRef,
    public iab:InAppBrowser) {
    this.lottoSocialGamesHalf="halfLotto"
    this.lottoSocialBonusHalf="halfBonus"
   
  }
  // ionViewWillEnter(){
  //   if(this.content.ionScrollStart){
  //     this.scrollHandler(this)
  //   }
  // }
  ionViewWillEnter() {
    this.content.enableScrollListener();
    var a = localStorage.getItem("HelpP")
    if(localStorage.getItem("HelpP") == undefined || localStorage.getItem("HelpP") == null)
    {
      this.down_arrow_showing = 1
    }
    else{
      this.down_arrow_showing = 0
    }
    localStorage.setItem("HelpP","1")

 }
 openAppBrw(){
   let browser = this.iab.create(" https://help.lotto-social.com/hc/en-us","_blank",'location=no,toolbarposition=top')

   }
  scrollHandler(event){
    this.material_icon = 1
      var innerDiv = document.getElementById('inner').scrollHeight;
      var scrollDiv = document.getElementById('contents').clientHeight;
      
      var valu = scrollDiv + this.content.scrollTop
      console.log("sdsdsdsdsdsdsds", innerDiv, scrollDiv, valu)
      if (valu > innerDiv) 
      {
        console.log("botom")
        this.downShowing = 1
        this.cdRef.detectChanges();
    }
    else
    {
      this.downShowing = 0
      this.down_arrow_showing = 0
      this.cdRef.detectChanges();
    }
    }
  

  openSyndicatePage(){
    var tabs: Tabs = this.navCtrl.parent;
      tabs.select(1);
  }
  openGamesPage(){
    var tabs: Tabs = this.navCtrl.parent;
      tabs.select(3);
  }
  openOfferPage(){
    var tabs: Tabs = this.navCtrl.parent;
      tabs.select(4);
  }
  changeVal(val){
    this.lottoSocialGamesHalf = val
  }
  changeValBonus(val){
    this.lottoSocialBonusHalf = val
  }
 
  

}