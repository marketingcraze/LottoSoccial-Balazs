import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Slides, Tabs, ModalController } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { PrizeSummaryWinPage } from '../prize-summary-win/prize-summary-win';
import { PrizeSummaryNoSyndicate } from '../Prize-summary-No-syndicate/Prize-summary-No-syndicate';
import { PrizeSummaryEarlyCheck } from '../Prize-summary-Early-check/Prize-summary-Early-check';
declare const $
/*
  Generated class for the CheckWinningsNext page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-winnings-next',
  templateUrl: 'check-winnings-next.html'
})
export class CheckWinningsNextPage {
  duration: number;
  hideAtFinish: boolean = true;
  @ViewChild(Slides) slides: Slides;
  loader: any;
  loading: Boolean = false;
  sList: any = [];
  sList2: any = [];
  movetype: any;
  errorMsg = '';

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController
  ) {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
  }

  ionViewDidLoad() {

    this.checkWinnings();
    console.log('ionViewDidLoad CheckWinningsNextPage');
  }
  ionViewWillEnter() {
    debugger;
    var tabs: Tabs = this.navCtrl.parent
    this.viewCtrl.showBackButton(false);
  }
  checkWinnings() {

    this.loading = true
    //this.loader.present();
    this._syndService.checkWinnings()
      .subscribe((res) => {
        res = { "response": [{ "cliamable_syndicates": { "response": { "status": "SUCCESS", "message": "", "syndicate_group": [{ "syndicate_name": "ABIA0891", "syndicate_id": 2615959, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }, { "syndicate_name": "ABY011", "syndicate_id": 2615960, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }, { "syndicate_name": "ABY0784", "syndicate_id": 2615977, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }, { "syndicate_name": "ZULA0191", "syndicate_id": 2615962, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }, { "syndicate_name": "ZULA0653", "syndicate_id": 2615961, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }, { "syndicate_name": "ZURI0812", "syndicate_id": 2615965, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }, { "syndicate_name": "ZURI0846", "syndicate_id": 2615952, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }, { "syndicate_name": "ZURI0899", "syndicate_id": 2615963, "Product_Name": ["hello Gunjan", "hello Gunjan2", "hello Gunjan3"] }] } } }] }
        //res = { "response": [{ "cliamable_syndicates": { "response": { "status": "SUCCESS", "message": "", "syndicate_group": [{ "syndicate_name": "ZURI0865", "syndicate_id": 2615376 }, { "syndicate_name": "ZURI0865", "syndicate_id": 2615376 }, { "syndicate_name": "ABIE0813", "syndicate_id": 2615377 }, { "syndicate_name": "ZURI0143", "syndicate_id": 2615378 }, { "syndicate_name": "ZURI0698", "syndicate_id": 2615379 }, { "syndicate_name": "ABY033", "syndicate_id": 2615380 }, { "syndicate_name": "ZULA092", "syndicate_id": 2615381 }, { "syndicate_name": "BRAD0442", "syndicate_id": 2615382 }, { "syndicate_name": "ZURI08", "syndicate_id": 2615383 }, { "syndicate_name": "ABIA0657", "syndicate_id": 2615384 }, { "syndicate_name": "ZURI0378", "syndicate_id": 2615385 }, { "syndicate_name": "ABIA0835", "syndicate_id": 2615386 }, { "syndicate_name": "ZULA0124", "syndicate_id": 2615388 }, { "syndicate_name": "ZULA0124", "syndicate_id": 2615388 }, { "syndicate_name": "ZURI0951", "syndicate_id": 2615389 }, { "syndicate_name": "ZURI0951", "syndicate_id": 2615389 }, { "syndicate_name": "ZULA038", "syndicate_id": 2615390 }, { "syndicate_name": "ZULA038", "syndicate_id": 2615390 }] } } }] }
        console.log(res);
        this.sList = res.response["0"].cliamable_syndicates.response.syndicate_group
        this._syndService.checkwinFinal()
          .subscribe((res2) => {
            //  this.loader.dismiss();
            //res2 = { "response": [{ "check_mywinnings": { "response": { "status": "SUCCESS", "message": "", "syndicate_offer": { "title": "You currently not playing in any of our syndicate.", "description_group": { "description1": "You have got to be in it to win it", "description2": "Fancy getting" }, "offer_line_group": { "offer_line1": "30 EuroMillions Lines", "offer_line2": "&pound;9,900,000m" }, "destination_url_group": { "destination_url1": "#", "destination_url2": "#" }, "offer_id": "992", "next_draw": { "name": "lotto", "offer_title": "Lotto 20 lines", "offer_jackpot": "£9,900,000", "offer_id": "1701", "prosub_id": "2247", "offer_img": "http://ecommercelive.s3.amazonaws.com/wp-content/uploads/app_assets/offers_library/lotto_header.png", "button_text": "Play for £4.99", "countdown": "Sat 29 Apr 17 19:00:00" } }, "response_type": "10.2", "claim_event_id": "149822", "claim_event_status": 4 } } }] }
            this.movetype = res2.response["0"].check_mywinnings.response
            // this.movetype.response_type = '10.7'
            this.loading = false;
            console.log('final response');
            console.log(res2);
            var durations = 3000;
            this.animateSyndicate(durations)
          })
        if (!this.sList) {
          this.errorMsg = "There is no syndicate";
        }
      })
  }

  animateSyndicate(durations: any) {
    if (this.sList) {
      if (this.sList2.length != this.sList.length) {
        setTimeout(() => {
          this.sList2.push(this.sList[this.sList2.length])
          this.duration = (this.sList[this.sList2.length-1].Product_Name.length) * 6000
          durations = this.duration
          $("#tickerMain").animate({ scrollTop: $("#ticker").height() }, 500);
          this.nextSlide();
          this.animateSyndicate(durations);
        }, durations);
      } else {
        this.hideAtFinish = false;
        this.movetoPage()
      }
    } else {
      //this.navCtrl.push(PrizeSummaryNoSyndicate);
      this.movetoPage()
    }
  }

  nextSlide() {
    this.slides.slideNext()
  }

  movetoPage() {
    if (this.movetype) {
      setTimeout(() => {
        // var moveTypes=this.movetype.bind(this)
        if (this.movetype.response_type == '10.1') {
          // this.navCtrl.push(PrizeSummaryWinPage);
          this.openModal(PrizeSummaryWinPage)
        } else if (this.movetype.response_type == '10.2' || this.movetype.response_type == '10.3') {
          // this.navCtrl.push(PrizeSummaryNoSyndicate);
          this.openModal(PrizeSummaryNoSyndicate)
        } else if (this.movetype.response_type == '10.4' || this.movetype.response_type == '10.7') {
          // this.navCtrl.push(PrizeSummaryEarlyCheck);
          this.openModal(PrizeSummaryEarlyCheck)
        }
      }, 3000);
    } else {
      this.navCtrl.push(PrizeSummaryNoSyndicate);
    }

  }
  openModal(pages: any) {
    let modal = this.modalCtrl.create(pages)
    modal.present()
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.viewCtrl.dismiss(data)
      }
    })
  }
}
