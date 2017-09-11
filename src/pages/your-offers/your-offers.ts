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


@Component({
	selector: 'page-your-offers',
	templateUrl: 'your-offers.html'
})
export class YourOffersPage {
	@ViewChild("confirmPayment") confirmPayment;

	private cache: CacheController;

	userCards: any;
	userCardsCount:number = 0;
	customerToken:string;
	jackpotList:any
	jackpotGroup:any

	credit_filter_line:any=0;
	credit_filter_draw:any=0;
	
	buyoffer:any;
	private loading : any;
	resultshow:boolean=false;
	errorshow:boolean=false;
	slider:any;
	parseInt:any=parseInt;
	position:any=0;
	spaceBetween:any;


	private lotteryProductData:any
	private offersForYou:any


	constructor(
		public platform: Platform,
		public params: Params,
		private srvDb:DatabaseService,
		private srvHome:HomeService,
		private alertCtrl:AlertController,
		public iab: InAppBrowser,
		public navCtrl: NavController,
		public navParams: NavParams,
		public authSrv: AuthService,
		public srvOffer: OfferService,
		public commonSrv:CommonService,
		public modalController:ModalController,
		public appSound:AppSoundProvider,
		public loadingCtrl: LoadingController) {

		this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);
		this.checkCardExists();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad YourOffersPage');
	}
	ionViewDidEnter(){
console.log("11111111111111111111111111111111")
	}


	checkCardExists(){
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
		let offer = {total_cost:4.99} ;

		this.appSound.play('buttonClick');
		if (this.customerToken) {
			this.goPaymentWebview();
		}else{
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
				}else{
					this.goPaymentWebview();
				}

			}, (err) => {
				console.log("OffersPage::showPaymentOptions() error", err);
				loader.dismiss();
			})
		}
	}

	ionViewWillEnter() {

		this.cache.loadModules("offers", "2", ["fetch_lottery_products"])
		.then( data => {

			console.log("OffersPage::ionViewDidEnter", data);
			// data = data[0].fetch_lottery_products.response

			for (var i = data.length - 1; i >= 0; i--) {
				console.log("OffersPage::ionViewDidEnter", i, data[i].fetch_lottery_products);
				if ( data[i].fetch_lottery_products ) {
				

					this.lotteryProductData = data[i].fetch_lottery_products.response.lottery_product_data
					this.offersForYou = data[i].fetch_lottery_products.response.offers_for_you
					break;
				}
			}
		}, err => {
			// show offline
			this.params.setIsInternetAvailable(false);
			console.log("OffersPage::ionViewDidEnter", err);
		});
	}	


	goPaymentWebview(){
		let opt:string = "toolbarposition=top";
		let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
		str += '&customer_id='+CommonService.session.customer_id+'&customer_token='+this.customerToken+'&Offer_ID=1188'
		this.iab.create( str, 'blank', opt);
	}

	private _showLoader() {
		let loader = this.loadingCtrl.create({
			content: "Loading data..."
		});
		loader.present()
		return loader;
	}

	//Offer Buy page
	openBuyPage(index){
		var TimeLeft=document.getElementById("countDown").innerText;
		var buyPageModal=this.modalController.create(offerBuy,{offersData:this.lotteryProductData[index],Time:TimeLeft});
		var data = localStorage.setItem("timeDate", TimeLeft);
		buyPageModal.present();
	}

	offerOfTheDayModal(index:any)
	{
		let modal = this.modalController.create(offerOfTheDayModal,{
			offerOfTheDay: this.offersForYou[index]
		})
		modal.present();
	}

}
