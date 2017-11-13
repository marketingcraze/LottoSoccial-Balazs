import { Component } from '@angular/core';
import { NavController, NavParams, App, ViewController, LoadingController, ModalController, Tabs } from 'ionic-angular';
import { CheckWinningsNextPage } from '../check-winnings-next/check-winnings-next';
import { SyndicateService } from '../../providers/syndicate-service';
import { ChooseCreditcashPage } from '../ChooseCreditcash/ChooseCreditcash';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { YourGamesPage } from '../your-games/your-games';
/*
  Generated class for the CheckWinnings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-prize-summary-win',
  templateUrl: 'prize-summary-win.html'
})
export class PrizeSummaryWinPage {
  loader: any;
  prizeData: any;
  allData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public _syndSrvc: SyndicateService
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckWinningsPage');
    this.loadPrize();

  }
  // next() {
  //   this.app.getRootNav().push(CheckWinningsNextPage);
  // }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  chooseCreditcash() {
    let leave2Modal = this.modalCtrl.create(ChooseCreditcashPage, { cid: this.allData.claim_event_id, cash: this.prizeData.CashEquAmount, credit: this.prizeData.credit_win.value });
    leave2Modal.onDidDismiss(data => {
      console.log(data);
    });
    leave2Modal.present();
  }
  loadPrize() {
    this.loader.present();
    this._syndService.prizeBreakDown()
      .subscribe((res: any) => {
        this.loader.dismiss();
        // res = {"response":{"winningdetails":{"title":"Congratulations! You have got...","winning_value":{"value":"0","color":"green","sub_heading":"LOTTERY CASH WINS","show":"0"},"credit_win":{"value":"2.8","color":"orange","sub_heading":"LOTTERY BONUS CREDIT","show":"1"},"total_bonus_line":"6","reward_points":{"value":"2100","color":"blue","sub_heading":"REWARD POINTS","show":"1"},"monthly_prizr_draw":{"value":"0","color":"red","sub_heading":"MONTHLY PRIZE DRAW","show":"0"},"voucher":{"value":"0","color":"yellow","sub_heading":"VOUCHER","show":"0"},"CashEquAmount":"0.7","lotto_lucky_dip":{"value":"0","color":"orange","sub_heading":"0x 2 LOTTO BALL MATCHES","show":"0"},"lotto_matches_count":"0"},"response_type":"10.1","claim_event_id":"149670","claim_event_status":"1"}}
        this.prizeData = res.response["0"].check_mywinnings.response.winningdetails;
        this.allData = res.response["0"].check_mywinnings.response;
        console.log(res);
      })
  }
  goto(value: any = 'game') {
    this.viewCtrl.dismiss(value)

  }
}
