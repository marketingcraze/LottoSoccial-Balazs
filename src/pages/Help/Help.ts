import { Component,ChangeDetectorRef,ViewChild,ElementRef} from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController,Tabs,ScrollEvent } from 'ionic-angular';
import { Content } from 'ionic-angular'

import { Inject, HostListener } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { DOCUMENT } from "@angular/platform-browser";


@Component({
  selector: 'page-Help',
  templateUrl: 'Help.html'
})

export class HelpPage {
  @ViewChild(Content) content: Content;
  @ViewChild('newDiv') fileInput:ElementRef;
  downShowing = 0;
  lottoSocialGamesHalf:any;
  lottoSocialBonusHalf:any;
  constructor(public navCtrl: NavController, private viewctrl:ViewController,public cdRef: ChangeDetectorRef) {
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
 }
  scrollHandler(event){
    
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