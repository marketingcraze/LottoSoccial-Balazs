import { Component, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { App, Platform, NavController, Tabs, NavParams, LoadingController, AlertController, MenuController, ModalController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { OfferService } from '../../services/offer.service';
import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CacheController } from '../../services/cache_controller';
import { Storage } from '@ionic/storage';
import { SyndicatesPage } from '../syndicates/syndicates';
import { offerBuyResultPage } from '../offerBuyresultpage/offerBuyresultpage';
import { Observable } from 'rxjs/Rx';

declare var $: any;
/*
  Generated class for the SendBonusPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-send-bonus',
	templateUrl: 'send-bonus.html'
})
export class SendBonusPage {
	itemPriceModel: any;
	Credit_Points2: any;
	liveCreditPoint: any = 0.00;

	private cache: CacheController;
	userCards: any;
	userCardsCount: number = 0;
	customerToken: string;
	jackpotList: any
	jackpotGroup: any

	credit_filter_line: any = 0;
	credit_filter_draw: any = 0;
	credit_offer: any;
	credit_product: any;
	Credit_Points: any;
	buyoffer: any;
	buyOfferStatus: any;
	private loading: any;
	resultshow: boolean = false;
	errorshow: boolean = false;
	slider: any;
	parseInt: any = parseInt;
	position: any = 0;
	spaceBetween: any;
	visitorId: any;
	check: boolean = true;
	syndicate: any;
	rangeSlider: any;
	sliders: boolean = false;
	offerStatus: boolean;

	private lotteryProductData: any
	private offersForYou: any
	public nav: NavController;

	constructor(
		public app: App,
		public platform: Platform,
		public params: Params,
		private storage: Storage,
		private srvDb: DatabaseService,
		private srvHome: HomeService,
		private alertCtrl: AlertController,
		public ngZone: NgZone,
		public offerService: OfferService,
		public authSrv: AuthService,
		public navCtrl: NavController,
		public modalCtrlr: ModalController,
		public menu: MenuController,
		public navParams: NavParams, public cdRef: ChangeDetectorRef,
		public loadingCtrl: LoadingController) {
		this.nav = this.app.getRootNav();
		this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);
		storage.get('firstTimeLoad').then((firstTimeLoad: any) => {
			this.visitorId = firstTimeLoad;
			console.log('firstTimeLoad storage', firstTimeLoad);
		});
		//this.cdRef.detectChanges()
		this.syndicate = SyndicatesPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SendBonusPagePage');
	}

	ionViewWillEnter() {
		this.spaceBetween = Math.floor(window.innerWidth * -0.10);
		window.onresize = (e) => {
			this.ngZone.run(() => {
				this.spaceBetween = Math.floor(window.innerWidth * -0.10);
				console.log(this.spaceBetween);
			});
		};

		let loader = this._showLoader();

		// get creaditoffer call api
		this.authSrv.get_credit_offer().subscribe(data => {
			if (data) {
				this.credit_offer = data.response.response.offers;
				this.credit_product = data.response.response.product;
				for (var i in this.credit_product) // for acts as a foreach  
				{
					this.credit_product[i]['sliderrange'] = null;
					this.credit_product[i]['index'] = i;
				}

				console.log("OffersPage::get_credit_offer", data);
				console.log(this.credit_product);

				if (this.Credit_Points) {
					loader.dismiss();
				}
			}
		},
			err => {
				console.log("error", err);
			},
			() => { console.log("offer dislpay sucesss"); }
		);

		// get creditpoints call api 
		this.authSrv.get_Credit_Points().subscribe(data => {
			if (data) {
				this.Credit_Points = data.response.response.bonus_credit;

				if (this.Credit_Points) {
					this.Credit_Points2 = this.Credit_Points.slice(1);
					this.liveCreditPoint = this.Credit_Points.slice(1)
					loader.dismiss();
				}
				else {
					this.Credit_Points2 = 0;
					loader.dismiss();
				}
			}
			//console.log("get_Credit_Points",data)
		},
			err => {
				console.log("error", err);
			},
			() => console.log("creadit points get successfully")
		);

	}

	buyCreditOffer(offerId: any, openSuccessModal: any) {
		this.loading = this.loadingCtrl.create();
		this.loading.present().then(() => {
			this.offerService.buy_Credit_Offer(offerId, this.visitorId).subscribe(data => {
				this.loading.dismiss();
				this.buyoffer = data.response.response;
				this.buyOfferStatus = data.response.response.status;
				if (this.buyOfferStatus === "FAIL") {
					this.offerStatus = false;
					this.showModalForcreditoffer();
				}
				else {
					this.offerStatus = true;
					this.showModalForcreditoffer();
				}
			},
				err => {
					this.errorshow = true;
					console.log("error", err);
				},
				() => console.log("offer buy successfully")
			);
		})
	}

	// draw day click  call this function     
	drawday(index) {
		this.position = index;
		this.credit_filter_draw = index;
	}

	// line select  call this function   
	credit_line(line) {
		this.credit_filter_line = parseInt(line);
	}

	watchSlider(currentProduct: any, Index: any, proIndex: any) {

		if (Index >= 0 && proIndex == Index && currentProduct.sliderrange != null) {
			this.sliders = true;
			this.credit_product[Index]['sliderrange'] = currentProduct.sliderrange;
			//console.log(this.credit_product);
		}
		else if (Index >= 0 && proIndex == Index && currentProduct.sliderrange == null) {
			this.sliders = true;
			this.credit_product[Index]['sliderrange'] = this.slider;
			//console.log(this.credit_product);
		}
		else {
			this.sliders = false;
		}
		setTimeout( ()=> {
			debugger;
			this.Onblur()
		}, 200);
	}

	private _showLoader() {
		let loader = this.loadingCtrl.create({
			content: "Loading data..."
		});
		loader.present()
		return loader;
	}
	showModalForcreditoffer() {
		let resultModal = this.modalCtrlr.create(offerBuyResultPage, { syndicateName: this.buyoffer, status: this.offerStatus });
		resultModal.present();
		resultModal.onDidDismiss((data: any[]) => {
			if (data) {
				var tabs: Tabs = this.navCtrl.parent.parent.parent;
				tabs.select(1);
			}
		})

	}
	goToOffers() {
		var tabs: Tabs = this.navCtrl.parent;
		tabs.select(0)
	}
	Onblur() {
		debugger;
		var currentData =this.Credit_Points.slice(1);
		var creditData = parseFloat(document.getElementById("mySpan").innerText.slice(1));
		console.log(currentData, creditData)
		this.liveCreditPoint = currentData - creditData;
		this.Credit_Points2 = this.liveCreditPoint;
		console.log(this.liveCreditPoint, this.Credit_Points)
		this.cdRef.detectChanges()
	}

}
