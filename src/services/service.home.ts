// app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { CommonService } from './common.service';

@Injectable()
export class HomeService {

    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http, 
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

    getHomeCard() {
        let action = CommonService.version + '/home/';
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

        console.log("getHomeCard", parameter);
        var response = this.http.post(CommonService.apiUrl + action, parameter, opt).map(res => res.json());
        return response;
    }

    
    
}



