import { Component } from '@angular/core';
import { App, NavController, NavParams, Platform, LoadingController, AlertController, 
	ModalController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CacheController } from '../../services/cache_controller';
import { AccountService } from '../../services/account.service';
import { CommonService } from '../../services/common.service';

import { AuthPage } from '../auth/auth';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

	private cache: CacheController;

	private refreshCache:boolean = false;
	private unreadCount:number = 0;
	private homeMessage:any = {
	};
	private accountDetails:any = {
		bonus_credit:0.00,
		message:"",
		msn:"",
		nick_name:null,
		profile_image:"",
		reward_points:0,
		winning_balance:0.00
	};

	constructor(
	  	public app: App, 
	  	private params: Params,
	    private storage: Storage,
        public navParams: NavParams,
		private iab: InAppBrowser,
	    public platform: Platform, 
	    private srvDb:DatabaseService,
	    private srvHome:HomeService,
	    private navCtrl:NavController,
	    private srvAccount:AccountService,
	    public modalCtrl: ModalController,
	    private loadingCtrl:LoadingController,
	    private alertCtrl:AlertController) {

		console.log('AccountPage');

  		this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);

        this.loadAccountData()
	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad AccountPage');

	}

	loadAccountData(){
		// show loading screen
    	let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

    	// load data
    	this.cache.loadModules("home", "1", ["get_account_details"], this.refreshCache)
        .then( data => {
            loader.dismiss();

            this.refreshCache = false;

            console.log("AccountPage::ionViewDidLoad", data);
            for (var i = 0; i < data.length; i++) {
            	if ( data[i].get_account_details ) {
            		this.accountDetails = data[i].get_account_details.response;
            	}else if ( data[i].get_home_message ) {
            		this.homeMessage = data[i].get_home_message.response;
		            this.unreadCount = this.homeMessage.unread;
		        }
            }
            console.log("AccountPage::ionViewDidLoad accountDetails", this.accountDetails);

        }, err => {
            loader.dismiss();
            // show offline
            this.params.setIsInternetAvailable(false);
            console.log("AccountPage::ionViewDidLoad", err);
        });

	}

	updateNickName(){
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
					this.updateNickname( data.nickname );
					this.accountDetails.nick_name = data.nickname;
				}
			}
			]
		});
		alert.present();
	}

	logout(){
		console.log( "AccountPage::logout" );
		
		this.cache.clearDatabaseOnLogout();

		this.storage.remove('session_ID');
		this.storage.remove('session')
        .then(
            data => { 
            	console.log(data); 
            	let nav = this.app.getRootNav();
            	nav.setRoot(AuthPage, {tab: 1});
            },
            error => console.log(error)
        );
	}

	showUpdateDetailsModal(){
		console.log("AccountPage::showUpdateDetailsModal" );
		this.navCtrl.push(EditProfilePage);
		// load account data
        // let profileModal = this.modalCtrl.create(EditProfilePage, {});
        // profileModal.present();
	}

	openUrl(url:string){
		let opt:string = "toolbarposition=top";
		this.iab.create(url, "_blank", opt);
	}

  	goHomePage(){
		this.params.goHomePage();
	}

	openWebView(str:string){
		let opt:string = "toolbarposition=top";
		this.iab.create(CommonService.sitename + str, 'blank', opt);
	}

	updateNickname(nick){
		console.log('AccountPage::updateNickname() ', nick);

		let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

    	// load data
    	this.srvAccount.updateNick(nick).take(1)
        .subscribe( (success:any) => {
            loader.dismiss();

            console.log("AccountPage::updateNickname", success );
            if (success) {
            	let res = success.response[0].update_nick_name.response;

            	this.refreshCache = true;
            	this.loadAccountData();

	            console.log("AccountPage::updateNickname", res );

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


}
