import { Component, ViewChild } from '@angular/core';
import { RequestOptions, Headers} from '@angular/http';
import { App, Platform, Tabs, NavController, NavParams, AlertController,
 PopoverController, LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { CountryListPopPage } from '../country-list-pop/country-list-pop';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { SignupInvitedPage } from '../signup-invited/signup-invited';
import { NewSyndicatePage } from '../new-syndicate/new-syndicate';

import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import {Observable} from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
	@ViewChild('tabs') tabsRef: Tabs;

	public showPass = false;
	public tabs:Tabs;
	public selectedCountry:any = {
        country_code: "99",
        country_flag_url: "flag_url_for_99.png",
        country_name:"Rollover"
    };
	public countryPopOver:any;
	public warningPassword:boolean = false;
	public warningPhone:boolean = false;
	public country_number:string = "";

	private storage:SecureStorageObject;
	public countries:any[];

	public signup = {
		image:"",
		profile_image_url:"",
		email:"",
		free_reg_msn:'',
		free_reg_pwd: '',
		mobile:'',
		country_code:""
	};


	constructor(
		private transfer: Transfer, 
		private file: File,
		public app:App,
		public platform:Platform,
		public navCtrl: NavController, 
		public navParams: NavParams,
		private imagePicker: ImagePicker,
		private popoverCtrl: PopoverController,	
		public alertCtrl:AlertController,
		private secureStorage: SecureStorage,
		private loadingCtrl: LoadingController,	
		public commonSrv:CommonService,
		public authSrv:AuthService) {

		this.tabs = navCtrl.parent;
		this.loadCountries();

		platform.ready().then(() => {
			console.log('ready');
        });


        this.secureStorage.create(CommonService.SecureStorageUser)
        .then((storage: SecureStorageObject) => {
            this.storage = storage;
        });

/*     storage.get('myitem')
       .then(
         data => console.log(data),
         error => console.log(error)
     );
     storage.remove('myitem')
     .then(
         data => console.log(data),
         error => console.log(error)
     );*/


	}

    loadCountries(){
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.commonSrv.getCountry().subscribe(
            data=>{
                loader.dismiss();
                
                if(data) {
                	this.countries = data.response[0].get_country_code_flag.response.country_code_group;
                	this.selectedCountry = this.countries[0];
                	console.log("countries successful", this.countries);
                }
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
    		this.uploadImage();
    		// this.uploadProfilePic( results[0] );
    	}, (err) => { });
    }
    

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	presentPopover(ev) {
		/*
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'API not ready yet for this job',
            buttons: ['Dismiss']
        });
        alert.present();
		*/
		
		// commented for API being ready
	    this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
	    	cb: (data) => { 
	    		this.selectedCountry = data; 
	    		this.country_number = data.country_code;
	    	}
	    });
	    this.countryPopOver.present({ev: ev});
	    
	}

	showPassword(input: any): any {
		this.showPass = !this.showPass;
		input.type = input.type === 'password' ? 'text' : 'password';
	}

	uploadImage(){
		
		let loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loader.present();
		
		this.authSrv.uploadProfilePic( this.signup.image ).subscribe(
			(data:any) =>{
				loader.dismiss();
				console.log("image upload successful", data);
				this.signup.profile_image_url = data.response.image_name;
			},
			err =>{
				loader.dismiss();
				console.log("image upload error", err);
			},
			()=> console.log("image upload complete")
		);
		
	}

	submitSignup(form:any){
		// let nav = this.app.getRootNav();
        // nav.setRoot(NewSyndicatePage);
		
		this.signup.free_reg_msn = "" + this.country_number + this.signup.mobile;
		this.signup.country_code = this.country_number;
		console.log("submitSignup", this.signup, form);

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
				}
			},
			err=>{
				loader.dismiss();
				console.log("user registration error", err);
			},
			()=> console.log("user registration complete")
		);
		
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
		
		this.authSrv.loginUser( this.country_number, this.signup.free_reg_msn, this.signup.free_reg_pwd).subscribe(
			data=>{
				loader.dismiss();
				// this.showSuccess();
				console.log("user login successful", data);

				try {
                    data = data.response[0].login.response;
                } catch (e) {
                    data = undefined;
                }

                // store in secure storage
                this.storage.set('session', JSON.stringify(data))
                .then(
                    data => console.log(data),
                    error => console.log(error)
                );

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
