import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import {
	App, NavController, NavParams, Platform, LoadingController, AlertController,
	ModalController, Content
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CacheController } from '../../services/cache_controller';
import { AccountService } from '../../services/account.service';
import { CommonService } from '../../services/common.service';

import { badgesOs } from '../../services/badges.service';


import { AuthPage } from '../auth/auth';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { BadgesPage } from '../badges/badges';
import { SendBonusPage } from '../send-bonus/send-bonus'
import { OffersPage } from '../offers/offers'
import { GamesPage } from '../games/games'
import { BadgeViewPage } from '../badge-view/badge-view';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { Camera } from 'ionic-native'
import { File, FileEntry } from '@ionic-native/file';

import { Http, Headers, Response,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';
declare var webengage: any;

@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class AccountPage {
	bonusCredit: number;
	rewardPoints: number;
	badgesForYou: any;
	@ViewChild(Content) content: Content;
	private cache: CacheController;

	private profileProgress: number = 50;
	private refreshCache: boolean = false;
	private unreadCount: number = 0;
	downShowing = 0;
	image_Data
	down_arrow_showing=0
	private homeMessage: any = {};
	private accountDetails: any = {
		//bonus_credit: 0.00,
		message: "",
		msn: "",
		nick_name: null,
		profile_image: "",
		reward_points: 0,
		winning_balance: 0.00,
		percentage: 0
	};

	constructor(
		public app: App,
		private params: Params,
		private storage: Storage,
		public navParams: NavParams,
		private iab: InAppBrowser,
		public authSrv:AuthService,
		public platform: Platform,
		private srvDb: DatabaseService,
		private _badgesOs: badgesOs,
		private srvHome: HomeService,
		private navCtrl: NavController,
		public appSound: AppSoundProvider,
		private srvAccount: AccountService,
		public modalCtrl: ModalController,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		public cdRef: ChangeDetectorRef,
		private file: File,
		private http: Http) {

		console.log('AccountPage');

		this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);

		this.loadAccountData()
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AccountPage');


	}

	scrollHandlerAccount(event) {
		var scrollDiv = document.getElementById('accountContent').clientHeight;
		var innerDiv = document.getElementById('innerAccount').scrollHeight;

		var valu = scrollDiv + this.content.scrollTop
		console.log("data is ", valu, innerDiv, scrollDiv)
		if (valu > innerDiv) {
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
	loadAccountData() {
		// show loading screen
		let loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loader.present();

		// load data
		debugger;
		this.cache.loadModules("home", "1", ["get_account_details"], this.refreshCache)
			.then(data => {

				// this._badgesOs.getBadgesData().subscribe(badgeData => {
				// 	if (badgeData) {
				// 		debugger;
				// 		this.badgesForYou = badgeData.response[0].badges
				// 	}
				// })

				loader.dismiss();

				this.refreshCache = false;

				console.log("AccountPage::ionViewDidLoad", data);
				for (var i = 0; i < data.length; i++) {
					if (data[i].get_account_details) {
						debugger
						this.accountDetails = data[i].get_account_details.response;
						if (this.accountDetails.bonus_credit) {
							debugger;
							this.bonusCredit = parseInt(this.accountDetails.bonus_credit.slice(1));
						}
						else {
							this.bonusCredit = 0;
						}
						if (this.accountDetails.reward_points) {
							this.rewardPoints = parseInt(this.accountDetails.reward_points)
						}
						else {
							this.rewardPoints = 0;
						}



						if (this.accountDetails.profile_image && this.accountDetails.profile_image != "null") {
							var str = this.accountDetails.profile_image
							console.log("last character is ", str.charAt(str.length - 1))
							if (str.charAt(str.length - 1) == ".") {
								debugger
								str = str.substring(0, str.length - 1);
								this.image_Data = str
							}
							else {
								this.image_Data = this.accountDetails.profile_image
							}
						}
						else {


							if (localStorage.getItem("imageUrl")) {
								this.image_Data = localStorage.getItem("imageUrl")
							}
							else {
								this.image_Data = "assets/icon/user.svg"
							}

						}
					} else if (data[i].get_home_message) {
						this.homeMessage = data[i].get_home_message.response;
						this.unreadCount = this.homeMessage.unread;
					}
					this.content.enableScrollListener();
				}


				console.log("AccountPage::ionViewDidLoad accountDetails", this.accountDetails);

				//debugger
				var a = localStorage.getItem("arrow_accountP")
				if (localStorage.getItem("arrow_accountP") == undefined || localStorage.getItem("arrow_accountP") == null) {
					this.down_arrow_showing = 1
				}
				else {
					this.down_arrow_showing = 0
				}
				localStorage.setItem("arrow_accountP", "1")

			}, err => {
				loader.dismiss();
				// show offline
				this.params.setIsInternetAvailable(false);
				console.log("AccountPage::ionViewDidLoad", err);
			});
	}
	updateNickName() {
		this.appSound.play('buttonClick');
		let alert = this.alertCtrl.create({
			title: 'Login',
			inputs: [
				{
					name: 'nickname',
					placeholder: 'Nickname'
				}],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Update',
					handler: data => {
						this.updateNickname(data.nickname);
						this.accountDetails.nick_name = data.nickname;
					}
				}
			]
		});
		alert.present();
	}

	logout() {
		console.log("AccountPage::logout");
		this.appSound.play('buttonClick');

		this.cache.clearDatabaseOnLogout();
		localStorage.removeItem("imageUrl")
		this.storage.remove('session_ID');
		localStorage.removeItem("arrow_accountP")
		localStorage.removeItem("affiliateP")
		localStorage.removeItem("affiliate2P")
		localStorage.removeItem("badgeP")
		localStorage.removeItem("chkWinningP")
		localStorage.removeItem("HelpP")
		localStorage.removeItem("redeemP")
		localStorage.removeItem("yourOffersP")
		localStorage.removeItem("yourGamesP")
		

		this.platform.ready().then((readySource) => {

			if (this.platform.is('cordova')) {
				webengage.engage();
				webengage.user.logout();
			}

		});


		this.storage.remove('session')
			.then(
			data => {
				console.log(data);
				let nav = this.app.getRootNav();
				nav.setRoot(AuthPage, { tab: 1 });
			},
			error => console.log(error)
			);
	}

	showUpdateDetailsModal() {
		console.log("AccountPage::showUpdateDetailsModal");
		this.navCtrl.push(EditProfilePage);
		// load account data
		// let profileModal = this.modalCtrl.create(EditProfilePage, {});
		// profileModal.present();
	}

	openUrl(url: string) {
		let opt: string = "toolbarposition=top";
		this.iab.create(url, "_blank", opt);
	}

	goHomePage() {
		this.params.goHomePage();
	}

	openWebView(str: string) {
		let opt: string = "toolbarposition=top";
		this.iab.create(CommonService.sitename + str, 'blank', opt);
	}

	updateNickname(nick) {
		console.log('AccountPage::updateNickname() ', nick);

		let loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loader.present();

		// load data
		this.srvAccount.updateNick(nick).take(1)
			.subscribe((success: any) => {
				loader.dismiss();

				console.log("AccountPage::updateNickname", success);
				if (success) {
					let res = success.response[0].update_nick_name.response;

					this.refreshCache = true;
					this.loadAccountData();

					console.log("AccountPage::updateNickname", res);

					let alert = this.alertCtrl.create({
						title: res.status,
						subTitle: res.message,
						buttons: ['Dismiss']
					});
					alert.present();
				}

			}, err => {
				loader.dismiss();
				// show offline
				this.params.setIsInternetAvailable(false);
				console.log("AccountPage::updateNickname", err);
			});
	}
	moveToBadgeOs() {
		this.navCtrl.push(BadgesPage)
	}
	openCreditModule() {

		this.navCtrl.push(OffersPage, { "app": "outside" });
	}
	openGetGamesModule() {
		this.navCtrl.push(GamesPage, { "app": "outside" });
	}
	private openGallery(){
		let cameraOptions = {
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: Camera.DestinationType.FILE_URI,
			quality: 80,
			targetWidth: 350,
			targetHeight: 120,
			encodingType: Camera.EncodingType.JPEG,
			correctOrientation: true
		}
		Camera.getPicture(cameraOptions).then((fileUri) => {
			this.image_Data = fileUri
			localStorage.setItem("imageUrl", fileUri)
			debugger
			//this.uploadImage()
			//this.uploadPhoto(fileUri)

		}),
			err => console.log(err);
	}

	uploadImage(){
		debugger
		let loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loader.present();
		
		this.authSrv.uploadProfilePic(this.image_Data ).subscribe(
			(data:any) => {
				loader.dismiss();
				debugger
				console.log("image upload successful", data);
				
			},
			err =>{
				loader.dismiss();
				console.log("image upload error", err);
			},
			()=> console.log("image upload complete")
		);
		
	}

	selectProfileImage() {
		this.openGallery()
	}
	private error;
	private loading: any;
	private uploadPhoto(imageFileUri: any): void {
		this.error = null;
		this.loading = this.loadingCtrl.create({
			content: 'Uploading...'
		});

		this.loading.present();

		this.file.resolveLocalFilesystemUrl(imageFileUri)
			.then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
			.catch(err => console.log(err));
	}

	private readFile(file: any) {

		var reader;
		reader = new FileReader();
		reader.onloadend = (e) => {
			debugger
			const imgBlob = new Blob([reader.result], {type: 'image/jpg'});
			debugger
			this.postData(imgBlob, file.name);
		};
		reader.readAsArrayBuffer(file);
	}

	 postData(blob: any, fileName: string) {
		debugger
		//let server = CommonService.apiUrl +			CommonService.version + '/upload/?process=profile';

		let server = 'https://nima.lottosocial.com/wp-json/mobi/v2/upload/?process=profile'
		var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
		let myHeaders: Headers = new Headers();
		myHeaders.set('Authorization', 
		'Oauth oauth_consumer_key = "NDes1FKC0Kkg",' +
		'oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg",' +
		'oauth_signature_method="HMAC-SHA1",' +
		'oauth_timestamp="1490087533",' +
		'oauth_nonce="dWL9pr",' +
		'oauth_version="1.0",' +
		'oauth_signature="mQF41gSF7KIuVqzqcI0nSX1UklE%3D"'
		);


		let options = {
			fileKey: fileName,
			fileName: fileName,
			mimeType: "image/" + extension,
			headers: myHeaders
		};

		console.log("SignupPage:: upload image options:", options);
		this.http.post(server, blob, options)
			.catch(err => this.handleError(err))
			.map(response => response.json())
			// .finally(() => console.log('inside finaly'))
			.subscribe((ok) => {
				debugger;
				this.loading.dismiss();
				console.log("uploadPhoto:");
				console.log(ok);
				this.uploadAPI_Image(ok.response.image_name);
			});

	}
	private customerId: string = "";
	
	uploadAPI_Image(image_url:any){
		debugger
		this.srvAccount.saveImageUrl(image_url).subscribe(data =>{
			if(data)
			{
				alert(data.response)
			}
			
		})
	}
	private handleError(error: Response | any) {
		this.loading.dismiss();
		let errMsg: string; 
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		this.error = errMsg;
		return Observable.throw(errMsg);
	}

	ionViewWillEnter() {
		
		this._badgesOs.getBadgesData().subscribe(badgeData => {
			if (badgeData) {
				
				this.badgesForYou = badgeData.response[0].badges
			}
		})

	}
	goToBadgesView(badge:any){
	
		this.navCtrl.push(BadgeViewPage,{badge:badge});
	}


}
