import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { CheckWinningsNextPage } from '../check-winnings-next/check-winnings-next';
import { SyndicateService } from '../../providers/syndicate-service';
import { Content, Tabs } from 'ionic-angular'
/*
  Generated class for the CheckWinnings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-winnings',
  templateUrl: 'check-winnings.html'
})
export class CheckWinningsPage {
  @ViewChild(Content) content: Content;
  private myWinnings: any = [];
  loader: any;
  downShowing = 0;
  down_arrow_showing = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public modalCtrl:ModalController,
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    public cdRef: ChangeDetectorRef
  ) {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckWinningsPage');
    this.loadWinnings();
  }
  ionViewWillEnter() {
    // debugger;
    // var tabs: Tabs = this.navCtrl.parent.parent;

  }
  next() {
    debugger
    let modal=this.modalCtrl.create(CheckWinningsNextPage)
    modal.present()
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        debugger
        if(data[0]=='game'){
          var tabs:Tabs=this.navCtrl.parent.parent.parent;
          tabs.select(3)
          alert(data)
        }
        
      }
    })
    // this.app.getRootNav().push(CheckWinningsNextPage);
  }

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
      });
  }
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
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



}
