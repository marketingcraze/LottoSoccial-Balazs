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
  completedStepCount: number;
  percentage: any;
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
    if (this.BadgeData.steps) {
      this.steps = this.BadgeData.steps;
      this.completedStepCount = this.countCompletedStep(this.steps)
      this.percentage = this.completedStepCount / this.BadgeData.steps.length * 100;
    }
    else
      if (this.BadgeData.earned == 0) {
        this.percentage = 0
      } else if (this.BadgeData.earned == 1) {
        this.percentage = 100
      }
  }

  ionViewDidLoad() {

  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  countCompletedStep(steps) {
    var count = 0;
    for (let i = 0; i <= steps / length; i++) {
      if (steps[i].percentage == 100) {
        count++
      }
    }
    return count;
  }

}