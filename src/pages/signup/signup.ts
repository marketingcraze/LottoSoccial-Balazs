import { Component, ViewChild } from '@angular/core';
import { App, Platform, Tabs, NavController, NavParams, AlertController,
 PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { CacheController } from '../../services/cache_controller';
import { CountryListPopPage } from '../country-list-pop/country-list-pop';
import { HomePage } from '../home/home';
import { SignupInvitedPage } from '../signup-invited/signup-invited';
// import { NewSyndicatePage } from '../new-syndicate/new-syndicate';
import { Params } from '../../services/params';

import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';

import { Transfer } from '@ionic-native/transfer';
import { File, FileEntry } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Camera } from 'ionic-native'
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html'
})
export class SignupPage {
	@ViewChild('tabs') tabsRef: Tabs;
	@ViewChild('animation') input;

	public showPass = false;
	public tabs:Tabs;
	private cache: CacheController
	private imageSrc: string;
	private baseUrl;
	image_name1:any;
	image_name11:string;
	newImage:any;
	
	public selectedCountry:any = {
        name: "United Kingdom",
        iso2: "gb",
        dialCode: "44",
        priority: 0,
        areaCodes: null
    };
	public countryPopOver:any;
	public warningPassword:boolean = false;
	public warningPhone:boolean = false;
	// public country_number:string = "";

	// public countries:any[];

	public signup = {
		image:"",
		profile_image_url:"",
		email:"",
		free_reg_msn:'',
		free_reg_pwd: '',
		mobile:'',
		country_code:"",
		uuid:""
	};


	constructor(
		public app:App,
		private http:Http, 
		private file: File,
		private network: Network,
		private storage: Storage,
		public platform:Platform,
		private transfer: Transfer, 
		public navCtrl: NavController, 
		public navParams: NavParams,
		public commonSrv:CommonService,
		public alertCtrl:AlertController,
		public toastCtrl:ToastController,
		public imagePicker: ImagePicker,
		private popoverCtrl: PopoverController,	
		private loadingCtrl: LoadingController,	
		public authSrv:AuthService,
		public params:Params,
		private uniqueDeviceID: UniqueDeviceID) {

		console.log('SignupPage', network);

		this.tabs = navCtrl.parent;
		/*
		if (CommonService.countries == null) {
			this.loadCountries();
		}else{
			this.countries = CommonService.countries
			this.selectedCountry = this.countries[0]
			console.log("selectedCountry", this.selectedCountry)
			this.country_number = this.selectedCountry.country_code;
		}*/
		
		platform.ready().then(() => {
			console.log('ready');
			this.uniqueDeviceID.get()
			.then((uuid: any) => this.signup.uuid = uuid)
			.catch((error: any) => console.log(error));
		});
		
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
                	// this.countries = data.response[0].get_country_code_flag.response.country_code_group;
                	// this.selectedCountry = this.countries[0];
                	// console.log("countries successful", this.countries);
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

            }, ()=> {} );
        
    }

    selectProfileImage(){
    	console.log("selectProfileImage");
		this.openGallery()
    	// let options = {
    	// 	maximumImagesCount: 1,
    	// 	width: 800,
    	// 	height: 800,
    	// 	quality: 80
    	// };
    	// this.imagePicker.getPictures(options).then((results) => {
    	// 	this.signup.image = results[0];
    	// 	console.log('Image URI: ' + results[0]);
    	// 	// this.uploadImage();
    	// 	this.uploadPhoto(results[0]);
    	// 	// this.uploadProfilePic( results[0] );
		// }, (err) => { });
		
		
    }
    private openGallery (): void {
		let cameraOptions = {
		  sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		  destinationType: Camera.DestinationType.FILE_URI,      
		  quality: 70,
		  targetWidth: 1000,
		  targetHeight: 1000,
		  encodingType: Camera.EncodingType.JPEG,      
		  correctOrientation: true
		}
		Camera.getPicture(cameraOptions).then((fileUri)=>{
			this.signup.image = fileUri
			localStorage.setItem("imageUrl", fileUri)
			debugger
			//this.uploadImage()
			this.uploadPhoto(this.signup.image)
			this.uniqueDeviceID.get()
			.then((uuid: any) => this.signup.uuid = uuid)
			.catch((error: any) => console.log(error));
	
			
		}),
		err => console.log(err);   
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	presentPopover(ev) {
		console.log('SignupPage::presentPopover	');
/*
		if (this.countries == null) {
			if (CommonService.countries) {
				this.countries = CommonService.countries
				this.selectedCountry = this.countries[0]
			}else{
				this.loadCountries();
				return;
			}
		}
*/		
		// commented for API being ready
	    this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
	    	// countries: this.countries,
	    	cb: (data) => { 
	    		console.log("on selected country", data);
	    		this.selectedCountry = data; 
	    		// this.country_number = data.country_code;
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
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
		});
		loader.present();
		
		this.authSrv.uploadProfilePic( this.signup.image ).subscribe(
			(data:any) => {
				loader.dismiss();
				console.log("image upload successful", data);
				this.signup.profile_image_url = data.response.image_name1;
			},
			err =>{
				loader.dismiss();
				console.log("image upload error", err);
			},
			()=> console.log("image upload complete")
		);
		
	}

	submitSignup(form:any){

		
		localStorage.setItem('isInstall', "firstTimeInstall");
		// let nav = this.app.getRootNav();
        // nav.setRoot(NewSyndicatePage);
		
		// this.signup.free_reg_msn = "" + this.country_number + this.signup.mobile;
		debugger;
		
		var img=localStorage.getItem('userimg');
		this.prepareMobile();
		this.signup.country_code = this.selectedCountry.dialCode;
		this.signup.profile_image_url = img
		console.log("submitSignup", this.signup, form);
		// console.log("submitSignup", form);

		if(this.phoneValidator(this.signup.free_reg_msn) ) {
			this.warningPhone = true;
			return;
		}
		this.warningPhone = false;

		if(this.passwordValidator(this.signup.free_reg_pwd) ) {
			this.warningPhone = true;
			return;
		}
		this.warningPhone = false;
		
		let loader = this.loadingCtrl.create({
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
		});
		loader.present();
		debugger
		this.authSrv.addUser(this.signup).subscribe(
			data=>{
			
				loader.dismiss();
				
				console.log("user registration successful", data);
				// show register success message and redirect to login
				
				try {
					debugger
                    data = data.response;
                } catch (e) {
                    data = undefined;
                }

				if(data.status == "FAIL") {
					// registration failed
					this.toastCtrl.create({
						message: 'Registration FAILED!',
						duration: 3000,
						
					}).present()
				}else{
				debugger
					this.onRegistrationSuccess(data)
				}
			},
			err=>{
				loader.dismiss();
				console.log("user registration error", err);
			},
			()=> console.log("user registration complete")
		);
		
	}

	onRegistrationSuccess(data:any){
		console.log('onRegistrationSuccess', data);
		// this.submitLogin();
		debugger
		if (data[0].register.response.message == "both_exists") {
			let alert = this.alertCtrl.create({
                title: 'Cool!',
                subTitle: "You already have an account with us. We're loggin you in..",
                buttons: [
                {
                	// text: 'Cancel',
                	handler: () => { }
                },
                {
                	text: 'OK',
                	handler: () => { this.submitLogin(); }
                }]
            });
            alert.present();
		}else if (data[0].register.response.message == 'msn_exists') {
			let alert = this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'An account with this mobile number already exists, enter correct password to login or try with other new msn',
                buttons: [
                {
                	text: 'OK',
                	handler: (data) => { 
                		// this.tabs.select(1)
                	}
                }]
            });
            alert.present();
		}else{
			CommonService.session = data;
			this.storage.set('session_ID', CommonService.sessionId);
	    	this.storage.set('session', JSON.stringify(data))
	        .then(
	            data => console.log(data),
	            error => console.log(error)
			);
	        let nav = this.app.getRootNav();
			nav.setRoot(HomePage);
		}

	}

    prepareMobile(){
        let free_reg_msn = this.signup.mobile;
        let msn_len = free_reg_msn.length;
        // var countryData = $('#free_reg_msn').intlTelInput("getSelectedCountryData");/44

        var cc = this.selectedCountry.dialCode.replace('+','');
        if ( free_reg_msn.substr(0, 1)=="0" ) {
            var p = free_reg_msn.substr(1, msn_len);
            free_reg_msn = cc + p;
        } else if(free_reg_msn.substr(0, cc.length)==cc){
            var p = free_reg_msn.substr(cc.length, msn_len);
            free_reg_msn = cc + p;
        } else{
            free_reg_msn = cc + free_reg_msn;
        }
        this.signup.free_reg_msn = free_reg_msn;
    }

	phoneValidator(value: string):boolean {
		if (value !== '') {
			if (!value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
				return  true;
			}
		}
		return false;
	}

	passwordValidator(value: string):boolean {
		if (value !== '') {
			if (!value.match('.{5,10}')) {
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
			spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
		});
		loader.present();
		
		this.authSrv.loginUser( this.selectedCountry.dialCode, this.signup.mobile, this.signup.free_reg_pwd)
		.subscribe(
			data=>{
				loader.dismiss();
				// this.showSuccess();
				console.log("user login successful", data);

				try {
                    data = data.response[0].login.response;
                } catch (e) {
                    data = undefined;
                }
                
                // go to home page
                if(data && data.status != 'FAIL') {
                	this.storage.set('session_ID', CommonService.sessionId);
                	this.storage.set('session', JSON.stringify(data))
	                .then(
	                    data => console.log(data),
	                    error => console.log(error)
	                );
                    let nav = this.app.getRootNav();
                    nav.setRoot(HomePage);
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
	

	// upload file
	private error;
	private loading:any;
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
		
		const reader = new FileReader();
		reader.onloadend = () => {
			const imgBlob = new Blob([reader.result], {type:'image/jpg'});
			
			this.postData(imgBlob, file.name);
		};
		reader.readAsArrayBuffer(file);
	}

	private postData(blob:any, fileName:string) {
		debugger
		let server = CommonService.apiUrl + 
            CommonService.version + '/upload/?process=profile';

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
            mimeType: "image/"+extension,
            headers: myHeaders
        };

		console.log("SignupPage:: upload image options:", options);
		this.http.post(server, blob, options)
		.catch( err =>this.handleError(err))
		.map(response => response.json())
		// .finally(() => console.log('inside finaly'))
		.subscribe((ok) => {
			debugger;
			this.loading.dismiss();
			console.log("uploadPhoto:");
			console.log(ok);
			localStorage.setItem('userimg',ok.response.image_name)
			//this.navCtrl.push(CreateSyndicatePage, {'image': ok.response.image_url});
		  });
	
	}

	private handleError(error: Response | any) {
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

}
