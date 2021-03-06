import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams, Platform, LoadingController, Tabs } from 'ionic-angular';
import { forkOffersSyndicate } from '../../services/syndicateForkOffer.service';
import { SimpleTimer } from 'ng2-simple-timer';
import { OfferService } from '../../services/offer.service';
import { CommonService } from '../../services/common.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';


@Component({
	selector: 'offersfor-you',
	templateUrl: 'offers-for-you.html'
})
export class OffersForYouPage {
	@ViewChild("confirmPayment") confirmPayment;
	userCards: any;
	sec: string | number;
	min: string;
	hrs: string;
	day: string;
	result: string;
	timer0button: string;
	timer0Id: any;
	tabbarElement: any;
	spaceBetween: number = -70;
	forkOfferPage: any;
	public nav: NavController;

	constructor(
		public app: App,
		private st: SimpleTimer,
		public navCtrl: NavController,
		public platform: Platform,
		public appSound: AppSoundProvider,
		public forkSrv: forkOffersSyndicate,
		public srvOffer: OfferService,
		public loadingctrl: LoadingController,
		public navParams: NavParams) {

		this.nav = this.app.getRootNav();
		this.tabbarElement = document.querySelector('.tabbar');
		this.spaceBetween = Math.floor(platform.width() * -0.10);

	}

	goBack() {
		this.appSound.play('buttonClick');
		this.tabbarElement.style.display = 'flex';
		var tabs: Tabs = this.navCtrl.parent.parent.parent;
		tabs.select(2);
	}
	ionViewWillEnter() {
		this.tabbarElement.style.display = 'none';
		let loading = this.loadingctrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
		});
		loading.present().then(() => {
			this.forkSrv.getForkOffers().subscribe(data => {
				loading.dismiss();
				if (data) {
					this.forkOfferPage = data.response[0].get_fork_offer_for_you.offer_group[0];
					this.subscribeTimer0();
				}
			})
		})

	}
	ionViewWillLeave() {
		this.tabbarElement.style.display = 'flex';
	}

	//countDown timer

	subscribeTimer0() {

		if (this.timer0Id) {

			// Unsubscribe if timer Id is defined
			this.st.unsubscribe(this.timer0Id);
			this.timer0Id = undefined;
			this.timer0button = 'Subscribe';
			console.log('timer 0 Unsubscribed.');
		} else {

			// Subscribe if timer Id is undefined
			this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback(this.forkOfferPage));
			this.timer0button = 'Unsubscribe';
			console.log('timer 0 Subscribed.');
		}
		console.log(this.st.getSubscription());
	}


	timer0callback(data) {

		var value: any = data.countdown
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
		this.day = (day <= 9) ? '0' + day + '' : day + '';
		this.hrs = (hour <= 9) ? '0' + hour + '' : hour + '';
		this.min = (minute <= 9) ? '0' + minute + '' : minute + '';
		this.sec = (seconds <= 9) ? '0' + seconds : seconds;



	}
	buyCreditOffer(offerId: any, prosub_id: any, buttonText: any) {
		this.appSound.play('buttonClick');
		let loader = this.loadingctrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
		});
		loader.present().then(() => {
			localStorage.removeItem("buttonText");
			localStorage.setItem("buttonText", buttonText);
			this.userCards = "";
			this.confirmPayment.togglePopup()
			loader.dismiss()
		})

	}
}
