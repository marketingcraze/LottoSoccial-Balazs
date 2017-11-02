import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, NavController, Platform, NavParams, PopoverController, 
    LoadingController, AlertController,  } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { HomePage } from '../home/home';
import { CountryListPopPage } from '../country-list-pop/country-list-pop';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { Params } from '../../services/params';

declare var webengage: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
    @ViewChild('animation') input;    
    @ViewChild('loginForm') LoginData:any;
    public countryPopOver:any;
    public selectedCountry:any = {
        name: "United Kingdom",
        iso2: "gb",
        dialCode: "44",
        priority: 0,
        areaCodes: null
    };
    
    public selectedCountryMobile:any= {           
        name: "United Kingdom",
        iso2: "gb",
        dialCode: "44",
        priority: 0,
        areaCodes: null
    };
    public countryNumberMobile:string = "";
    public forgotPassPopup = false;
    public forgotPassPopupConfirm = false;
    public warningPhone = false;
    public warningPhonePopup = false;
    public showPass = false;

    // public countryes:any[];
    
    private storageReady:boolean = false;
    
    public login:any = {
        free_reg_msn:'',
        free_reg_pwd: ''
    };

    constructor(
        public app:App,
        private params:Params,
        private network:Network,
        private storage: Storage,
        public platform:Platform,
        public authSrv:AuthService, 
        public navParams: NavParams,
        public navCtrl: NavController, 
        public commonSrv:CommonService,
        public alertCtrl:AlertController,
        public loadingCtrl: LoadingController,
        private popoverCtrl: PopoverController
        ) {

        /*if (CommonService.countries == null) {
            this.loadCountries();
        }else{
            this.countryes = CommonService.countries
            this.selectedCountry = this.countryes[0]
            this.countryNumber = this.selectedCountry.country_code;
        }*/
        storage.ready().then( ()=> this.storageReady = true );

    }

    loadCountries(){
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.commonSrv.getCountry().subscribe(
            data=>{
                loader.dismiss();
                console.log( "loadCountries", data);
                if ( data 
                    && data.response[0]
                    && data.response[0].get_country_code_flag
                    && data.response[0].get_country_code_flag.response
                    && data.response[0].get_country_code_flag.response.country_code_group
                    ) {

                    // this.countryes = data.response[0].get_country_code_flag.response.country_code_group
                    // this.selectedCountry = this.countryes[0];
                    // this.countryNumber = this.selectedCountry.country_code;
                    // console.log("countries successful", this.countryes);
                }
            },
            err=>{
                loader.dismiss();
                console.log("error", err);
                // show offline
                this.params.setIsInternetAvailable(false);
            
            },
            ()=> {  }
            );
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    presentPopover(ev) {
/*        if (!this.countryes) {
            if (CommonService.countries) {
                this.countryes = CommonService.countries
            }else{
                this.loadCountries();
                return;
            }
        }*/
        
        this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
            // countries: this.countryes,             
            cb: (data) => { 
                console.log("on selected country", data);
                this.selectedCountry = data;
            }

        });
        
        this.countryPopOver.present({ev: ev});   
        this.countryPopOver.onDidDismiss((data) => {
            if (data) {                
                this.selectedCountryMobile.name=data.name;
                this.selectedCountryMobile.dialCode=data.dialCode; 
                this.selectedCountryMobile.iso2=data.iso2;
            }
           })
    }

    presentPopoverMobile(ev) {
/*        if (!this.countryes) {
            this.loadCountries();
            return;
        }*/
        this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
            // countries: this.countryes,
            cb: (data) => { 
                console.log("on selected country", data);
                this.selectedCountryMobile = data;    
                this.countryNumberMobile = data.dialCode;
            }
        });
        this.countryPopOver.present({ev: ev});
        
    }
 
    backButtonPopupClose(){
        this.forgotPassPopup=false;  
        this.selectedCountryMobile.name=this.selectedCountry.name;
        this.selectedCountryMobile.dialCode=this.selectedCountry.dialCode;
        this.selectedCountryMobile.iso2=this.selectedCountry.iso2;
    }

    
    showPassword(input: any): any {
        this.showPass = !this.showPass;
        input.type = input.type === 'password' ? 'text' : 'password';
    }


    submitLogin(){   
        if(this.LoginData.form.controls.password._value=="" ){
            return alert("Enter login details correctly")
        }
        // this.login.free_reg_msn = "" + this.countryNumber + this.login.mobile;
        this.prepareMobile();

        this.login.country_code = this.selectedCountry.dialCode;
        console.log("submitLogin", this.login );
        if(this.phoneValidator(this.login.free_reg_msn) ) {
            this.warningPhone = true;
            return;
        }
        this.warningPhone = false;

        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        localStorage.setItem('appCurrentUserid', this.login.free_reg_msn);    
        this.authSrv.loginUser(this.selectedCountry.dialCode, this.login.free_reg_msn, 
            this.login.free_reg_pwd).subscribe(

            data=>{
                loader.dismiss();
                // this.showSuccess();
            
                console.log("user login successful", data);
                try {
                    data = data.response[0].login.response;
                } catch (e) {
                    data = undefined;
                }
                
                console.log("user login data", data);
                // store in secure storage
                console.log("is cordova", 
                    this.platform.is('cordova'), 
                    (data.status != "FAIL") );
                
                // go to home page
                if(data) {
                    if(data.status != "FAIL" ) {
                        CommonService.session = data;
                        var ne = this.storage.get("session_ID")
                        this.storage.set('session_ID', CommonService.sessionId);
                        this.storage.set('session', JSON.stringify(data))
                        .then(
                            data => console.log(data),
                            error => console.log(error)
                        );
                        let nav = this.app.getRootNav();
                        nav.setRoot(HomePage);
               
                    }else{
                        let alert = this.alertCtrl.create({
                            title: 'Failed!',
                            subTitle: data.message,
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: () => {
                                    }
                                  }    
                            ]
                        });
                        alert.present();
                       
                    }
                }
                
            },
            err=>{
                loader.dismiss();
                console.log("user login error", err);
                // show offline
                this.params.setIsInternetAvailable(false);
            },
            ()=> console.log("user login complete")
            );

              //Used for tracking user login using WebEngage       
                this.platform.ready().then((readySource) => {
                 if (this.platform.is('cordova')) {
			      webengage.engage(); 
                   webengage.user.login(this.login.free_reg_msn);
                 }        

               
                


               });
    }

    submitMobile(){ 
        let free_reg_msn = "" + this.selectedCountryMobile.dialCode + this.login.mobile;
        console.log("submitMobile", free_reg_msn );
        if(this.phoneValidator(free_reg_msn) ) {
            this.warningPhonePopup = true;
            return;
        }
        this.warningPhonePopup = false;

        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.authSrv.forgotPassword(this.login.free_reg_msn).subscribe(
            data=>{
                loader.dismiss();
                // this.showSuccess();
                console.log("successful", data);

                this.forgotPassPopupConfirm = true;
                
                // go to home page
                if(data && data.status != "error") {
                }else{
                }
                
            },
            err=>{
                loader.dismiss();
                console.log("error", err);
                // show offline
                this.params.setIsInternetAvailable(false);
            },
            ()=>{
                console.log("complete");
                this.forgotPassPopup = false; 
            } 
            );

    }


    prepareMobile(){
        let free_reg_msn = this.login.mobile;
        let msn_len = free_reg_msn.length;
        // var countryData = $('#free_reg_msn').intlTelInput("getSelectedCountryData");/44

        var cc = this.selectedCountry.dialCode.replace('+','');
        if (this.login.mobile.substr(0, 1)=="0") {
            var p = this.login.mobile.substr(1, msn_len);
            free_reg_msn = cc + p;
        } else if(free_reg_msn.substr(0, cc.length)==cc){
            var p = free_reg_msn.substr(cc.length, msn_len);
            free_reg_msn = cc + p;
        } else{
            free_reg_msn = cc + this.login.mobile;
        }
        this.login.free_reg_msn = free_reg_msn;
    }

    phoneValidator(value: string):boolean {
        if (value !== '') {
            if (!value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
                return  true;
            }
        }
        return false;
    }
}






