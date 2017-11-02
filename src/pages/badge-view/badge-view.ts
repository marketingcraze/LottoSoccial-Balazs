import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, LoadingController, ViewController } from 'ionic-angular';
import { ElementRef, ViewChild } from '@angular/core';
import { Contacts, Contact, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormControl } from '@angular/forms';
import { SyndicateService } from '../../providers/syndicate-service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-badge-view',
  templateUrl: 'badge-view.html'
})

export class BadgeViewPage {
  steps: any;
  BadgeData: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private contacts: Contacts,
    public platform: Platform,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    public viewCtrl: ViewController) {
    debugger;
    this.BadgeData = this.navParams.get("badge")
    this.steps = this.BadgeData.steps;

  }

  ionViewDidLoad() {

  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

}