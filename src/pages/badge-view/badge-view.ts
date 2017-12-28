import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, LoadingController, ViewController } from 'ionic-angular';
import { ElementRef, ViewChild } from '@angular/core';
import { Contacts, Contact, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormControl } from '@angular/forms';
import { SyndicateService } from '../../providers/syndicate-service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { badgesOs } from '../../services/badges.service';

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
    public appSound: AppSoundProvider,
    private _badgess: badgesOs,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    public viewCtrl: ViewController) {
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

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  //complete steps
  countCompletedStep(steps) {
    var count = 0;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].percentage == 100) {
        count++
      }
    }
    return count;
  }
  //collect points API
  collect(d: any) {
    this.appSound.play('buttonClick');
    var loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
    loader.present().then(() => {
      this._badgess.collectBadge(d.post_title, d.ID, d.award_id).subscribe(data => {
        if (data) {
          if (data.response[0].issue_customer_award.response.status == 'SUCCESS') {
            loader.dismiss()
            alert("Points collected successfully")
          }
          else {
            this.appSound.play('Error');
            alert("Error occured")
            loader.dismiss()
          }
        }
      })
    })
  }
  //share wit friends 
  nativeShare() {
    this.appSound.play('buttonClick');
    if (this.platform.is('cordova')) {
      this.socialSharing.share("Hello this is message", "This is subject", "", "https://nima.lottosocial.com/").then(() => {
      }).catch((data) => {
      })
    }
  }
}