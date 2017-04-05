import { Component, ViewChild } from '@angular/core';
import { App, Platform, Tabs, NavController, NavParams, AlertController,
 PopoverController, LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { CountryListPopPage } from '../country-list-pop/country-list-pop';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { SignupInvitedPage } from '../signup-invited/signup-invited';
import { NewSyndicatePage } from '../new-syndicate/new-syndicate';

import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
	@ViewChild('tabs') tabsRef: Tabs;

	public showPass = false;
	public tabs:Tabs;
	public selectedCountry:any;
	public countryPopOver:any;
	public warningPassword:boolean = false;
	public warningPhone:boolean = false;
	public country_number:number = 0;

	public countries:any[];

	public signup = {
		image:"",
		email:"",
		free_reg_msn:'',
		free_reg_pwd: '',
		mobile:''
	};


	constructor(
		public app:App,
		public platform:Platform,
		public navCtrl: NavController, 
		public navParams: NavParams,
		private imagePicker: ImagePicker,
		private popoverCtrl: PopoverController,	
		public alertCtrl:AlertController,
		private loadingCtrl: LoadingController,	
		public commonSrv:CommonService,
		public authSrv:AuthService) {

		this.tabs = navCtrl.parent;
		this.loadCountries();

	}

    loadCountries(){
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.commonSrv.getCountry().subscribe(
            data=>{
                loader.dismiss();
                this.countries = data.response.payload.modules.get_countries;
                this.selectedCountry = this.countries[0];
                console.log("countrys successful", this.countries);
            },
            err=>{
                loader.dismiss();
                console.log("error", err);

                this.alertCtrl.create({
		          title: 'Error!!!',
		          subTitle: 'Internet disabled or server error.',
		          buttons: [
		          {
		            text: 'OK',
		            handler: data => {
		              this.platform.exitApp();
		            }
		          }
		          ],
          		enableBackdropDismiss:false
		        });

            },
            ()=> {}
            );
        
    }

    selectProfileImage(){
    	console.log("selectProfileImage");

    	let options = {
    		maximumImagesCount: 1,
    		width: 800,
    		height: 800,
    		quality: 80
    	};
    	this.imagePicker.getPictures(options).then((results) => {
    		this.signup.image = results[0];
    		console.log('Image URI: ' + results[0]);
    	}, (err) => { });
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	presentPopover(ev) {
	    this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
	    	cb: (data) => { 
	    		this.selectedCountry = data; 
	    		this.country_number = data[2];
	    	}
	    });
	    this.countryPopOver.present({ev: ev});
	}

	showPassword(input: any): any {
		this.showPass = !this.showPass;
		input.type = input.type === 'password' ? 'text' : 'password';
	}

	submitSignup(form:any){
		let nav = this.app.getRootNav();
        nav.setRoot(NewSyndicatePage);
		/*
		this.signup.free_reg_msn = "" + this.country_number + this.signup.mobile;
		console.log("submitSignup", this.signup , form);
		if(this.phoneValidator(this.signup.free_reg_msn) ) {
			this.warningPhone = true;
			return;
		}
		this.warningPhone = false;
		
		let loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loader.present();
		
		this.authSrv.addUser(this.signup).subscribe(
			data=>{
				loader.dismiss();
				
				console.log("user registration successful", data);
				// show register success message and redirect to login
				if(data.response.status == "error") {
					
				}else{
					this.submitLogin();
					if(this.signup.image) {
						this.authSrv.uploadProfilePic(this.signup.image, data.customer_id);
					}
				}
			},
			err=>{
				loader.dismiss();
				console.log("user registration error", err);
			},
			()=> console.log("user registration complete")
		);
		*/
	}

	phoneValidator(value: string):boolean {
		if (value !== '') {
			if (!value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
				return  true;
			}
		}
		return false;
	}


/*
customer_id:"0"
customer_token:"985938B8-7244-40F0-9CBF-83EB3F0CE72D"
message:"New account created"
session_id:"gb42ibd1sdbli2g6evbii1p855"
status:"error"
url:""
*/

	submitLogin(){
		console.log("submitLogin", this.signup );
		
		let loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loader.present();
		
		this.authSrv.loginUser(this.signup.free_reg_msn, this.signup.free_reg_pwd).subscribe(
			data=>{
				loader.dismiss();
				// this.showSuccess();
				console.log("user login successful", data);
                // go to home page
                if(data && data.status != 'error') {
                    let nav = this.app.getRootNav();
                    nav.setRoot(HomePage);
                }else{

                }
				
			},
			err=>{
				loader.dismiss();
				console.log("user registration error", err);
			},
			()=> console.log("user registration complete")
		);
	}

	goInvited(ev){
		let nav = this.app.getRootNav();
        nav.setRoot(SignupInvitedPage);
	}
	goLogin(ev){
		this.tabs.select(1);
	}

}
