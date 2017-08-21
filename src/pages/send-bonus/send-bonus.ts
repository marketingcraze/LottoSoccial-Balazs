import { Component, NgZone } from '@angular/core';
import {App, Platform, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CacheController } from '../../services/cache_controller';
import { Storage } from '@ionic/storage';
import { SyndicatesPage } from '../syndicates/syndicates';

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

	private cache: CacheController;

	userCards: any;
	userCardsCount:number = 0;
	customerToken:string;
	jackpotList:any
	jackpotGroup:any

	credit_filter_line:any=0;
	credit_filter_draw:any=0;
	credit_offer : any;
	credit_product:any;
	Credit_Points:any;
	buyoffer:any;
	buyOfferStatus:any;
	private loading : any;
	resultshow:boolean=false;
	errorshow:boolean=false;
	slider:any;
	parseInt:any=parseInt;
	position:any=0;
	spaceBetween:any;
	visitorId:any;
	check:boolean=true;
	syndicate:any;

	private lotteryProductData:any
	private offersForYou:any
	public nav:NavController;

	constructor(
		public app:App,
		public platform: Platform,
		public params: Params,
		private storage: Storage,
		private srvDb:DatabaseService,
		private srvHome:HomeService,
		private alertCtrl:AlertController,
		public ngZone:NgZone,
		public authSrv: AuthService,
		public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController) {
		this.nav = this.app.getRootNav();
		this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);
		storage.get('firstTimeLoad').then( (firstTimeLoad:any) => {
			this.visitorId=firstTimeLoad;
			console.log('firstTimeLoad storage', firstTimeLoad);
		});
		this.syndicate=SyndicatesPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SendBonusPagePage');
	}

	ionViewWillEnter() {
		this.spaceBetween = Math.floor(window.innerWidth * -0.10);
		window.onresize = (e) =>
		{
			this.ngZone.run(() => { 
				this.spaceBetween = Math.floor(window.innerWidth * -0.10);
				console.log(this.spaceBetween);
			});
		};

		let loader = this._showLoader();

		// get creaditoffer call api
		this.authSrv.get_credit_offer().subscribe(data=>{
			if (data) {
				this.credit_offer=data.response.response.offers;
				this.credit_product=data.response.response.product;
				console.log("OffersPage::get_credit_offer", data);

				if (this.Credit_Points) {
					loader.dismiss();
				}
			}
		},
		err=>{
			console.log("error", err);
		},
		()=>{ console.log("offer dislpay sucesss"); }
		);

		// get creditpoints call api 
		this.authSrv.get_Credit_Points().subscribe(data=>{
			if(data){
				this.Credit_Points=data.response.response.bonus_credit;

				if (this.credit_product) {
					loader.dismiss();
				}
			}
			//console.log("get_Credit_Points",data)
		},
		err=>{     
			console.log("error", err);
		},
		()=> console.log("creadit points get successfully")
		);

	}

	buyCreditOffer(offerId: any,indexOfCard:any) {
		this.loading = this.loadingCtrl.create();
		this.loading.present().then(() => {
			this.authSrv.buy_Credit_Offer(offerId,this.visitorId).subscribe(data => {
				this.loading.dismiss();
				this.buyoffer = data.response.response;
				this.buyOfferStatus = data.response.response.status;
				if (this.buyOfferStatus === "FAIL") {
					this.errorshow = true;
				}
				else {
					this.resultshow = true;
				}
			},
			err => {
				this.errorshow = true;
				console.log("error", err);
			},
			()=> console.log("offer buy successfully")
			);
		})
	}

	getmoreline(){
		this.resultshow=false;
	}
	tryagain(){
		this.errorshow=false;
	}

	 // draw day click  call this function     
	drawday(index){
		this.position =index;
		this.credit_filter_draw=index;
	}

	// line select  call this function   
	credit_line(line){
		this.credit_filter_line=parseInt(line);
	}

    watchSlider(){
		this.credit_filter_line=this.slider;
	}

	private _showLoader() {
		let loader = this.loadingCtrl.create({
			content: "Loading data..."
		});
		loader.present()
		return loader;
	}
	moveToSyndicate(){
		this.nav.push(SyndicatesPage);
	}

}
