import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { CommonService } from './common.service';
import { AuthService } from './auth.service';

@Injectable()
export class HomeService {

    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http, 
        public platform: Platform,
        private transfer: Transfer,
        private file: File) {
    }

    getOffers() {
        let action = CommonService.version + '/offers/';
        let parameter = {
            "request": [
            {
                "page_id": "1",
                "screen_id": "1.4", 
                "module_name": "get_home_card", 
                "customer_id":"1970400"
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("getOffers", parameter);
        var response = this.http.post(CommonService.apiUrl + action, parameter, opt).map(res => res.json());
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
                "customer_id":"1970400"
            } ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        var response = this.http.post(CommonService.apiUrl + action, parameter, opt).map(response => response.json());
        return response;
    }

    
    
}



