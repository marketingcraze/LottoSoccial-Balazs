import { Component } from '@angular/core';
import { App, NavController, Platform, NavParams, PopoverController, 
    LoadingController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CountryListPopPage } from '../country-list-pop/country-list-pop';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    public countryPopOver:any;
    public countryNumber:string = "";
    public selectedCountry:any = {
        country_code: "99",
        country_flag_url: "flag_url_for_99.png",
        country_name:"Rollover"
    };
    
    public selectedCountryMobile:any;
    public countryNumberMobile:number = 0;
    public forgotPassPopup = false;
    public forgotPassPopupConfirm = false;
    public warningPhone = false;
    public warningPhonePopup = false;
    public showPass = false;

    public countryes:any[];
                    


    public login:any = {
        free_reg_msn:'',
        free_reg_pwd: ''
    };

    constructor(
        public app:App,
        public platform:Platform,
        public alertCtrl:AlertController,
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private popoverCtrl: PopoverController,
        public commonSrv:CommonService,
        public authSrv:AuthService	) {

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
                this.countryes = data;
                this.selectedCountry = this.countryes[0];
                console.log("countrys successful", this.countryes);
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
                });

            },
            ()=> {  }
            );
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
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
        this.countryPopOver = this.popoverCtrl.create(CountryListPopPage, {
            countries: this.countryes,
            cb: (data) => { 
                console.log(data);
                this.selectedCountry = data;
                this.countryNumber = data.country_code;
            }
        });
        this.countryPopOver.present({ev: ev});
        
    }

    presentPopoverMobile(ev) {
        /*
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'API not ready yet for this job',
            buttons: ['Dismiss']
        });
        alert.present();
        */
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
        
        this.login.free_reg_msn = "" + this.countryNumber + this.login.mobile;
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
                // go to home page
                if(data) {
                    if(data.status != "error" ) {
                        let nav = this.app.getRootNav();
                        nav.setRoot(HomePage);
                    }else{
                        let alert = this.alertCtrl.create({
                            title: 'Failed!',
                            subTitle: data.response.messages,
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


    phoneValidator(value: string):boolean {
        if (value !== '') {
            if (!value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
                return  true;
            }
        }
        return false;
    }

}






