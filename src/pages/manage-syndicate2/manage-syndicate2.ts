import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, App, Platform, LoadingController } from 'ionic-angular';
import { Leave2Page } from '../leave2/leave2';
import { TandcPage } from '../tandc/tandc';
import { RecentDrawPage } from '../recent-draw/recent-draw';
import { YourTicketsPage } from '../your-tickets/your-tickets';
import { InviteFriendsPage } from '../invite_friends/invite_friends';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { leaveSyndicate } from '../../services/syndicate_leave.service'
import { debounce } from 'ionic-native/node_modules/rxjs/operator/debounce';



declare var cordova: any;
@Component({
  selector: 'page-manage-syndicate2',
  templateUrl: 'manage-syndicate2.html'
})
export class ManageSyndicate2Page {
  dynamicText: string="CHECK";
  sizeOfSyndicate: any;
  result: boolean;
  waveShowingAccount: boolean;
  oneOff: boolean;
  syndicate: any;
  sId: any;

  constructor(private iab: InAppBrowser,
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public leveSynd: leaveSyndicate,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, public app: App) {
    debugger
    this.syndicate = this.navParams.get("syndicate")
    this.sId = this.syndicate.syndicate_id;
    if (this.syndicate.syndicate_end_date == 'oneoff') {
      this.oneOff = true
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageSyndicatePage');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.navCtrl.pop();
  }
  leaveSyndicate() {
    debugger
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
    loader.present().then(() => {
      this.leveSynd.privateSyndicateMembers(this.sId.syndicate_id).subscribe(data => {
        if (data) {
          loader.dismiss()
          let leave2Modal = this.modalCtrl.create(Leave2Page, { syndId: this.sId, members: data.response[0].get_private_syndicate_members.response });
          leave2Modal.onDidDismiss(data => {
            console.log(data);
          });
          leave2Modal.present();
        }
      })
    })

  }
  agreement() {
    this.navCtrl.push(TandcPage);
  }
  viewRecent() {
    this.navCtrl.push(RecentDrawPage);
  }
  viewTicket() {
    this.navCtrl.push(YourTicketsPage);
  }
  Invite() {
    this.navCtrl.push(InviteFriendsPage);
  }
  openUrl(url: string) {
    this.platform.ready().then(() => {
      if (typeof cordova !== 'undefined') {
        const browser = this.iab.create(url, "_blank", 'location=no,toolbarposition=top');
      }
    })
  }
  getSize() {
    this.waveShowingAccount = true;
    this.result = false
    this.leveSynd.getSyndicateSize(this.sId, this.syndicate.syndicate_type).subscribe(data => {
      if (data) {
        if (data.response[0].get_syndicate_size.response.status == "SUCCESS") {
          this.waveShowingAccount = false;
          this.sizeOfSyndicate = data.response[0].get_syndicate_size.response.syndicate_size;
          this.result = true
        }
        else {
          this.waveShowingAccount = false;
          this.result = true
          this.dynamicText="TRY AGAIN"
        }
      }
    })
  }

}
