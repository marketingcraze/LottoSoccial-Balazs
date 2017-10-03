import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { OfferService } from '../../services/offer.service';
import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CacheController } from '../../services/cache_controller';

import { offerBuy } from '../offerbuy-page/offerbuy-page';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { offerOfTheDayModal } from '../../pages/offer-of-the-day-modal/offer-of-the-day-modal'
import { SimpleTimer } from 'ng2-simple-timer';


@Component({
	selector: 'page-your-offers',
	templateUrl: 'your-offers.html'
})
export class YourOffersPage {
	@ViewChild("confirmPayment") confirmPayment;

	private cache: CacheController;

	userCards: any;
	userCardsCount: number = 0;
	customerToken: string;
	jackpotList: any
	jackpotGroup: any

	credit_filter_line: any = 0;
	credit_filter_draw: any = 0;

	buyoffer: any;
	private loading: any;
	resultshow: boolean = false;
	errorshow: boolean = false;
	slider: any;
	parseInt: any = parseInt;
	position: any = 0;
	spaceBetween: any;
	result: any = [];
	resultDate: any = [];


	private lotteryProductData: any
	private offersForYou: any


	constructor(
		private st: SimpleTimer,
		public platform: Platform,
		public params: Params,
		private srvDb: DatabaseService,
		private srvHome: HomeService,
		private alertCtrl: AlertController,
		public iab: InAppBrowser,
		public navCtrl: NavController,
		public navParams: NavParams,
		public authSrv: AuthService,
		public srvOffer: OfferService,
		public commonSrv: CommonService,
		public modalController: ModalController,
		public appSound: AppSoundProvider,
		public loadingCtrl: LoadingController) {

		this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);
		this.checkCardExists();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad YourOffersPage');
	}



	checkCardExists() {
		console.log("OffersPage::checkCardExists()");
		let loader = this._showLoader();

		this.srvOffer.getJackpotList().subscribe((data) => {
			console.log("OffersPage::getJackpotList() success", data);
			if (data.response && data.response[0]
				&& data.response[0].get_big_jackpot_list) {
				this.jackpotList = data.response[0].get_big_jackpot_list.response;
				this.customerToken = this.jackpotList.customer_token;
			}

			loader.dismiss();

		}, (err) => {
			console.log("OffersPage::getJackpotList() error", err);
			loader.dismiss();
		})
	}


	showPaymentOptions() {
		console.log("OffersPage::showPaymentOptions()");
		let offer = { total_cost: 4.99 };

		this.appSound.play('buttonClick');
		if (this.customerToken) {
			this.goPaymentWebview();
		} else {
			let loader = this._showLoader();
			// get all the cards details
			this.srvOffer.getExistingPaymilCardsDetails().subscribe((data) => {
				console.log("OffersPage::showPaymentOptions() success", data);
				let token_exists = 0;
				for (var i = 0; i < data.response.length; ++i) {
					if (data.response[i].get_customer_paymill_card_details) {
						token_exists = data.response[i].get_customer_paymill_card_details.response.token_exists
					}
				}

				if (token_exists > 0) {
					data.response.push({ offer: offer });
					this.userCards = data.response;
					console.log("OffersPage::showPaymentOptions() success", this.userCards);
					loader.dismiss();
					this.confirmPayment.togglePopup()
				} else {
					this.goPaymentWebview();
				}

			}, (err) => {
				console.log("OffersPage::showPaymentOptions() error", err);
				loader.dismiss();
			})
		}
	}

	ngOnInit() {

		this.cache.loadModules("offers", "2", ["fetch_lottery_products"])
			.then(data => {

				console.log("OffersPage::ionViewDidEnter", data);
				// data = data[0].fetch_lottery_products.response

				for (var i = data.length - 1; i >= 0; i--) {
					console.log("OffersPage::ionViewDidEnter", i, data[i].fetch_lottery_products);
					if (data[i].fetch_lottery_products) {
						this.lotteryProductData = data[i].fetch_lottery_products.response.lottery_product_data
						this.offersForYou = data[i].fetch_lottery_products.response.offers_for_you
						this.st.newTimer('1sec', 1);
						this.subscribeTimer0();

						break;
					}
				}
			}, err => {
				// show offline
				this.params.setIsInternetAvailable(false);
				console.log("OffersPage::ionViewDidEnter", err);
			});
	}


	goPaymentWebview() {
		let opt: string = "toolbarposition=top";
		let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
		str += '&customer_id=' + CommonService.session.customer_id + '&customer_token=' + this.customerToken + '&Offer_ID=1188'
		this.iab.create(str, 'blank', opt);
	}

	private _showLoader() {
		let loader = this.loadingCtrl.create({
			content: "Loading data..."
		});
		loader.present()
		return loader;
	}

	//Offer Buy page
	openBuyPage(index) {

		var TimeLeft = document.getElementById("countDown").innerText;
		var timer2 = this.lotteryProductData[index].draw_countdown
	
		var buyPageModal = this.modalController.create(offerBuy, { offersData: this.lotteryProductData[index], Time: timer2 });
		buyPageModal.present();
	}

	offerOfTheDayModal(index: any) {
		let modal = this.modalController.create(offerOfTheDayModal, {
			offerOfTheDay: this.offersForYou[index]
		})
		modal.present();
	}

	counter0 = 0;
	timer0Id: string;
	timer0button = 'Subscribe';



	subscribeTimer0() {
		if (this.timer0Id) {

			// Unsubscribe if timer Id is defined
			this.st.unsubscribe(this.timer0Id);
			this.timer0Id = undefined;
			this.timer0button = 'Subscribe';
			console.log('timer 0 Unsubscribed.');
		} else {

			// Subscribe if timer Id is undefined
			this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback(this.lotteryProductData));
			this.timer0button = 'Unsubscribe';
			console.log('timer 0 Subscribed.');
		}
		console.log(this.st.getSubscription());
	}


	timer0callback(data): string {
		this.resultDate = [];
		

		for (var i = 0; i < data.length; i++) {
			var value: any = data[i].draw_countdown
			this.result = "";


			let now = new Date().getTime();
			if (!value) {
				return this.result;
			}
			if (typeof (value) === "string") {
				value = new Date(value);
			}

			let delta = Math.floor((now - value.getTime()) / 1000);
			if (delta < 0) {
				
				delta = Math.abs(delta);
			}


			let day = Math.floor(delta / 86400);
			delta %= 86400
			let hour = Math.floor(delta / 3600);
			delta %= 3600
			let minute = Math.floor(delta / 60);
			delta %= 60
			let seconds = Math.floor(delta)



			this.result += (day < 9) ? '0' + day + ':' : day + ':';

			this.result += (hour < 9) ? '0' + hour + ':' : hour + ':';
			this.result += (minute < 9) ? '0' + minute + ':' : minute + ':';
			this.result += (seconds < 9) ? '0' + seconds : seconds;

			this.resultDate.push(this.result)


		}
		

		return this.resultDate
	}

}
