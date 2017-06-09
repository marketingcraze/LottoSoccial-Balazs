import { Component } from '@angular/core';
import { App, NavController, Platform, NavParams, PopoverController, 
    LoadingController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { HomePage } from '../home/home';
import { CountryListPopPage } from '../country-list-pop/country-list-pop';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { Params } from '../../services/params';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    public countryPopOver:any;
    public countryNumber:string = "";
    public selectedCountry:any = {
        country_code: "44",
        country_flag_url: "flag_url_for_44.png",
        country_name:"GB"
    };
    
    public selectedCountryMobile:any;
    public countryNumberMobile:number = 0;
    public forgotPassPopup = false;
    public forgotPassPopupConfirm = false;
    public warningPhone = false;
    public warningPhonePopup = false;
    public showPass = false;

    public countryes:any[];
    
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

        if (CommonService.countries == null) {
            this.loadCountries();
        }


        
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
                if ( data ) {
                    this.countryes = data;
                    this.selectedCountry = this.countryes[0];
                    this.countryNumber = this.selectedCountry.country_code;
                    console.log("countries successful", this.countryes);
                }
            },
            err=>{
                loader.dismiss();
                console.log("error", err);
                this.alertCtrl.create({
                  title: 'Error!!!',
                  subTitle: 'Internet disabled or server error.',
                  enableBackdropDismiss:false,
                  buttons: [
                  {
                      text: 'OK',
                      handler: data => {
                          // this.platform.exitApp();
                      }
                  }
                  ]
                }).present();

            },
            ()=> {  }
            );
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    presentPopover(ev) {
        if (!this.countryes) {
            this.loadCountries();
            return;
        }
        
        this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
            countries: this.countryes,
            cb: (data) => { 
                // console.log(data);
                this.selectedCountry = data;
                this.countryNumber = data.country_code;
            }
        });
        this.countryPopOver.present({ev: ev});
        
    }

    presentPopoverMobile(ev) {
        if (!this.countryes) {
            this.loadCountries();
            return;
        }
        this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
            countries: this.countryes,
            cb: (data) => { 
                this.selectedCountryMobile = data;
                this.countryNumberMobile = data[2];
            }
        });
        this.countryPopOver.present({ev: ev});
        
    }

    showPassword(input: any): any {
        this.showPass = !this.showPass;
        input.type = input.type === 'password' ? 'text' : 'password';
    }


    submitLogin(){        
        
        // this.login.free_reg_msn = "" + this.countryNumber + this.login.mobile;

        this.prepareMobile();

        this.login.country_code = this.countryNumber;
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

        this.authSrv.loginUser(this.countryNumber, this.login.free_reg_msn, 
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
                            buttons: ['OK']
                        });
                        alert.present();
                    }
                }
                
                
            },
            err=>{
                loader.dismiss();
                console.log("user login error", err);
            },
            ()=> console.log("user login complete")
            );
            
    }

    submitMobile(){
        let free_reg_msn = "" + this.countryNumberMobile + this.login.mobile;
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

        var cc = this.countryNumber.replace('+','');
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






