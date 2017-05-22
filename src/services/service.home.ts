import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { CommonService } from './common.service';
import { AuthService } from './auth.service';

@Injectable()
export class HomeService {

    private customerId:string = "";

    static get parameters() {
        return [[Http]];
    }
  
    constructor(
        private http:Http, 
        private storage: Storage,
        public platform: Platform,
        private transfer: Transfer,
        private file: File) {

        
    }

    getModules(action:string, page_id:string, module_names:string[]) {

        if ( !CommonService.session ) {
            return null;
        }
        this.customerId = CommonService.session.customer_id;
        console.log("getModules", CommonService.session );

        let parameter = { request: [] };

        for (var i = 0; i < module_names.length; ++i) {
            parameter.request.push({
                page_id: page_id,
                screen_id: "1.4", 
                module_name: module_names[i], 
                customer_id: this.customerId
            });
        }

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        let url = CommonService.apiUrl + CommonService.version + '/' + action + '/';

        console.log("getOffers", url, parameter);
        var response = this.http.post(url, parameter, opt).map(res => res.json());
        return response;
    }

    getHomeCard(module_name) {
        console.log("getHomeCard");

        let action = CommonService.version + '/home/';
        let parameter = {
            "request": [
            {
                "page_id": "1",
                "screen_id": "1.4", 
                "module_name": module_name, 
                "customer_id": this.customerId
            } 
            ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        var response = this.http.post(CommonService.apiUrl + action, parameter, opt).map(response => response.json());
        return response;
    }


    getHomeMessages() {

        if ( !CommonService.session ) {
            return null;
        }
        
        console.log("getHomeCard");

        let url = CommonService.apiUrl + CommonService.version + '/limb/';
        let parameter = {
            "request": [
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2",
                "action": "login_mobile_app",
                "page_id": "1",
                "screen_id": "1.8", 
                "module_name": "get_home_message", 
                "customer_id": CommonService.session.customer_id
            } 
            ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        var response = this.http.post(url, parameter, opt).map(response => response.json());
        return response;
    }


    get_credit_offer(){
        let action = CommonService.apiUrl + CommonService.version + "/offers/"
        let body={"page_id":"2","screen_id":"2..3","module_name":"get_credit_offer","customer_id":"1970400" };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

       
        var response = this.http.post(action, body,opt).map(res => res.json());
        return response;
    }
    get_fetch_offer(){
        let action= CommonService.apiUrl + CommonService.version + "/offers/"
        let body={"page_id":"2","screen_id":"2..1","module_name":"get_credit_offer","customer_id":"1970400" };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

       
        var response = this.http.post( action, body,opt).map(res => res.json());
        return response;
    }

    
    
}



