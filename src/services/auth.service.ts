import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { CommonService } from './common.service';
import { Params } from './params';
import { SharedService } from './shared.service';

@Injectable()
export class AuthService {
    apiUrl:string = 'https://nima.lottosocial.com/wp-json/mobi/v2/';

    static get parameters() {
        return [[Http], [Storage]];
    }
    
    makeId(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 26; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
  
    constructor(
        private http:Http, 
        private file: File,
        private params:Params,
        public plt: Platform,
        public storage: Storage,
        private transfer: Transfer) {

        /*

        this.isAndroid = plt.is('android');
        this.isCordova = plt.is('cordova');
        this.isIOS = plt.is('ios');

        let connHandler = (evt)=>{
            //console.log('****** CONN CHANGED *******', evt.type);
            this.connType = network.type;
            if(evt.type == 'online') this.isOnline = true;
            else this.isOnline = false;
        }

        plt.ready()
        .then((source)=>{

            this.ready = true;

            if(this.isCordova){

                this.connType = network.type;
                if(network.type != 'none') this.isOnline = true;

                this.network.onchange().subscribe(connHandler);
                this.network.onConnect().subscribe(connHandler);
                this.network.onDisconnect().subscribe(connHandler);
                
                this.plt.pause.subscribe(()=>{
                    //console.log('*******CORDOVA PAUSE*******');
                });

                this.plt.resume.subscribe(()=>{
                    console.log('******CORDOVA RESUME*******');
                    setTimeout(()=>{
                        this.connType = this.network.type;
                        console.log('******ON RESUME CONN TYPE******', this.connType);
                    }, 3000);
                });
            }
            
        })
        .catch(this.handleError);

        */
    }



    private handleError(error){
        console.log('NATIVE SERVICE ONREADY ERROR: ', error);
    }

   
    loginUser(country_code:string, tel: string, password: string) {
        console.log("AuthService::loginUser", CommonService.sessionId, CommonService.isOnline);

        if ( !CommonService.sessionId || CommonService.sessionId == "") {
            CommonService.sessionId = this.makeId();
        }
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }
        
        let action = CommonService.version + '/login/';
        let login = {
            "request": [
            {
                "session_ID": CommonService.sessionId, 
                "page_ID": "1",
                "screen_id": "1.1",
                "action": "login_mobile_app",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "login",
                "mobile": tel, //"447712887310",
                "password": password, //"abc123",
                "country_code": country_code // "44"
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("login", login);
        var response = this.http.post(CommonService.apiUrl + action, login, opt).map(res => res.json());
        return response;
    }
 
    forgotPassword(mobile:string) {
        let action = 'login/?action=Forgetpasswordpopup';
        let data = 'Mobile_MSN:=' + mobile;
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        
        var response = this.http.post(CommonService.apiUrl + action, data, opt).map(res => res.json());
        return response;
    }

    updateVisitorLog(os:string){
        console.log("AuthService::updateVisitorLog", CommonService.sessionId, 
            CommonService.isOnline);

        if ( !CommonService.sessionId || CommonService.sessionId == "") {
            CommonService.sessionId = this.makeId();
        }
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return CommonService.nullObserver;
        }
        let action = CommonService.apiUrl + CommonService.version + '/visitor/';

        
        return Observable.create( (observer)=>{
            let getDetailUrl = 'http://www.ip-api.com/json';
            this.http.get( getDetailUrl).map(res => res.json()).take(1).subscribe(
                (value:any) => {

                    console.log("my details: ", value);

                    let login = {
                        "request": [
                        {
                            "session_ID": CommonService.sessionId,
                            "page_id": "1",
                            "screen_id": "1.1",
                            "action": "update visitor log",
                            "website": "Lotto Social",
                            "website_id": "27",
                            "source_site": "mobi.lottosocial.com", 
                            "module_name": "update_visitor_log",

                            "ip_address": value.query,
                            "visit_url": "mobile_land",
                            "referer": "mobile_land",
                            "php_sid": "sd1344535KSFF",
                            "user_device": "mobile",
                            "user_os": os,
                            "user_location": value.regionName,
                            "user_browser": "",
                            "user_country": value.country,
                            "user_browser_version": "",
                            "viewport_device_type": ""
                        } ]
                    };

                    let opt: RequestOptions = new RequestOptions({
                        headers: CommonService.getHeaderJson()
                    });

                    
                    var response = this.http.post( action, login, opt).map(res => res.json());
                    response.take(1).subscribe(
                        (visitorData)=>{
                            
                            if (visitorData) {
                                let visitorId = visitorData.response[0].update_visitor_log.response.visitor_id
                                observer.next(visitorId);
                            }
                            observer.complete();
                        }, err => {
                            console.log('firstTimeLoad err', err);
                        });

                }, err => {} );
        });
        
        
    }



 /*
email:"s@w.com",
first_name:"1",
free_reg_msn:"23423423423",
free_reg_pwd:"zssdasdfasdf",
image:"",
last_name:"2",
mobile:"23423423423"
*/

    /**
     * New user registration API call (DF version)
     * 
     * @param {any}
     */
/*    addUser(user:any) {
        console.log("addUser", user);
        if (!CommonService.sessionId || CommonService.sessionId == "") {
            CommonService.sessionId = this.makeId();
        }

        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let value = {
            "session_ID": CommonService.sessionId, 
            "page_ID": "1",
            "screen_id": "1.2",
            "action": "login_mobile_app",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com", 
            "module_name": "register",

            "mobile": user.mobile,
            "password": user.free_reg_pwd,
            "country_code": user.country_code, 
            "first_name": user.first_name, 
            "last_name": user.last_name, 
            "email": user.email, 
            "profile_image_url": user.profile_image_url
        };

        let valueStr = JSON.stringify(value)
        console.log("value string:", valueStr );
        // valueStr = valueStr.replace( /"/g, "\\\"" )
        console.log("value string:", valueStr );

        let action = CommonService.apiUrlDF + 'proc_freeRegistrationStep1_Mobile_App';
        let signup = 
        {
            "params": [
            {
                "name": "json_request",
                "param_type": "IN",
                "value": valueStr,
                "type": "NVARCHAR(MAX)",
                "length": 0
            },
            {
                "name": "response",
                "param_type": "OUT",
                "value": "",
                "type": "NVARCHAR(MAX)"
            }
            ],
            "request_source":"mobile_app"
        };


        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderDF()
        });
        
        console.log("addUser", signup);
        var response = this.http.post(action, 
            signup, opt).map(res => res.json());
        return response;
    }*/


    /**
     * New user registration API call (WP version)
     * 
     * @param {any}
     */
    addUser(user:any) {
        console.log("addUser", user);
        if (!CommonService.sessionId || CommonService.sessionId == "") {
            CommonService.sessionId = this.makeId();
        }

        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let action = CommonService.version + '/register/';
        let signup = {
            "request": [
            {
                "session_ID": CommonService.sessionId, 
                "page_ID": "1",
                "screen_id": "1.2",
                "action": "login_mobile_app",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "register",

                "mobile": user.free_reg_msn,
                "password": user.free_reg_pwd,
                "country_code": user.country_code, 
                "first_name": user.first_name, 
                "last_name": user.last_name, 
                "email": user.email, 
                "profile_image_url": user.profile_image_url
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("addUser", signup);
        var response = this.http.post(CommonService.apiUrl + action, 
            signup, opt).map(res => res.json());
        return response;
    }


    uploadProfilePic( filePath:string ){
        
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }
        let server = CommonService.apiUrl + 
            CommonService.version + '/upload/?process=profile';

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
        myHeaders.append('Content-type', 'multipart/form-data');

        var extension = filePath.substr(filePath.lastIndexOf('.') + 1);
        let options = {
            fileKey: 'file',
            // fileName: 'name.jpg',
            // mimeType: "multipart/form-data",
            headers: myHeaders
        }

        let formData = new FormData();
        formData.append('image', filePath);

        console.log("options ", server, options);

        console.log("form data ", formData);
        /*
        var response = this.http.post(server, formData, options)
        .map(res => res.json());

        return response;
        */

        
        return new Observable( observer => {
            let fileTransfer = this.transfer.create();

            fileTransfer.upload(filePath, encodeURI(server), options)
            .then((data:any) => {
                // success
                console.log("success" + data);
                if(data && data.response && data.response.status == 'SUCCESS') {
                    observer.next(data.response);
                }else{
                    observer.next( Error("Image upload error.") );
                }
                
                observer.complete();
            }, (err:any) => {
                // error
                observer.next(err);
                observer.complete();
            });

        });
        
    }
 
 
    getLoggedInUser() {
        // return firebase.auth().currentUser;
    }
 
    onAuthStateChanged(callback) {
        // return firebase.auth().onAuthStateChanged(callback);
    }














    get_credit_offer(){
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }
        let action = CommonService.apiUrl + CommonService.version + "/offers/"
        let body={
            "page_id":"2","screen_id":"2..3","module_name":"get_credit_offer",
            "customer_id": CommonService.session.customer_id
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("get_credit_offer", action);
        var response = this.http.post(action, body,opt).map(res => res.json());
        return response;
    }

    get_fetch_offer(){
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }
        let action= CommonService.apiUrl + CommonService.version + "/offers/"
        let body={
            "page_id":"2","screen_id":"2..1","module_name":"get_credit_offer",
            "customer_id":CommonService.session.customer_id
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

       
        var response = this.http.post( action, body,opt).map(res => res.json());
        return response;
    }

    get_Credit_Points(){
        let action= CommonService.apiUrl + CommonService.version + "/profile/"
        let body={
            "session_ID": CommonService.sessionId,
            "action": "login_mobile_app",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "page_id": "1",
            "screen_id": "1.6",
            "module_name": "get_account_details",
            "customer_id": CommonService.session.customer_id
        };
        
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

       
        var response = this.http.post(action, body,opt).map(res => res.json());
        return response;

    }

    your_games(){
        let action=CommonService.apiUrl + CommonService.version + "/games/"
        let body={
                    "session_ID": CommonService.sessionId,
                    "page_ID": "3",
                    "screen_id": "3.1",
                    "action": "your_game",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "module_name": "get_your_game_list",
                    "customer_id": CommonService.session.customer_id
        }

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

       
        var response = this.http.post(action, body,opt).map(res => res.json());
        return response;

     } 
     redeem_game(){
         let action=CommonService.apiUrl + CommonService.version + "/games/"
        let body={
            "session_ID": CommonService.sessionId,
            "page_ID": "3",
            "screen_id": "3.2",
            "action": "buy_game",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_buy_game_list",
            "customer_id": CommonService.session.customer_id
        }


        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

       
        var response = this.http.post(action, body,opt).map(res => res.json());
        return response;
     }

}



