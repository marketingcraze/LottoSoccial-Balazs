import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, Nav, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { CheckWinningsNextPage } from '../check-winnings-next/check-winnings-next';
import { SyndicateService } from '../../providers/syndicate-service';
import { Content, Tabs } from 'ionic-angular'
import { OffersPage } from '../offers/offers'
import { GamesPage } from '../games/games';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'page-check-winnings',
  templateUrl: 'check-winnings.html'
})

export class CheckWinningsPage {
  nav: NavController;
  @ViewChild(Content) content: Content;
  private myWinnings: any = [];
  loader: any;
  downShowing = 0;
  down_arrow_showing = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public appSound: AppSoundProvider,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    public cdRef: ChangeDetectorRef
  ) {
    this.nav = this.app.getRootNav();
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckWinningsPage');
    this.loadWinnings();
  }
  //go to checkWinningsNext page (green one)
  next() {
    this.appSound.play('buttonClick');
    let modal = this.modalCtrl.create(CheckWinningsNextPage)
    modal.present()
    modal.onDidDismiss((data: any) => {
      if (data) {
        if (data == 'game') {
          var tabs: Tabs = this.navCtrl.parent.parent.parent;
          tabs.select(3)
          this.appSound.play('buttonClick');
        }
        else if (data == 'SBC') {
          var tabs: Tabs = this.navCtrl.parent.parent.parent;
          tabs.getActiveChildNav().setRoot(OffersPage, { "app": "outside" })
          this.appSound.play('buttonClick');
        }
        else if (data == 'RDM') {
          var tabs: Tabs = this.navCtrl.parent.parent.parent;
          tabs.getActiveChildNav().setRoot(GamesPage, { "app": "outside" })
          this.appSound.play('buttonClick');
        }
      }
    })
  }
  //Loading the all winnings
  loadWinnings() {
    this.loader.present();
    this._syndService.loadWinnings()
      .subscribe((res) => {
        console.log(res);
        var a = localStorage.getItem("chkWinningP")
        if (localStorage.getItem("chkWinningP") == undefined || localStorage.getItem("chkWinningP") == null) {
          this.down_arrow_showing = 1
        }
        else {
          this.down_arrow_showing = 0
        }
        localStorage.setItem("chkWinningP", "1")
        this.loader.dismiss();
        this.myWinnings = res.response["0"].get_previous_check_list.response.previous_check_group;

        this.content.enableScrollListener();
      }), (Err) => {
        this.loader.dismiss();
        this.appSound.play('Error');
        alert("Error occured")
      }
  }
  //Scroll handle
  scrollHandlerSyndicate(event) {
    var innerDiv = document.getElementById('innerWinnings').scrollHeight;
    var scrollDiv = document.getElementById('winningContent').clientHeight;
    var valu = scrollDiv + this.content.scrollTop
    console.log("sdsdsdsdsdsdsds", innerDiv, scrollDiv, valu)
    if (valu > innerDiv) {
      console.log("botom")
      this.downShowing = 1
      this.cdRef.detectChanges();
    }
    else {
      this.downShowing = 0
      this.down_arrow_showing = 0
      this.cdRef.detectChanges();
    }
  }
  //delay
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
