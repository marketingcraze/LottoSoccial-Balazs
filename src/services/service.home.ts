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

    getModules(action:string, page_id:string, module_names:string[]) {
        
        let parameter = {
            request: []
        };
        for (var i = 0; i < module_names.length; ++i) {
            parameter.request.push({
                "page_id": page_id,
                "screen_id": "1.4", 
                "module_name": module_names[i], 
                "customer_id":"1970400"
            });
        }

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        let url = CommonService.apiUrl + CommonService.version + '/' + action + '/';

        console.log("getOffers", url, parameter);
        var response = this.http.post(url, 
            parameter, opt).map(res => res.json());
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
            } 
            ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        var response = this.http.post(CommonService.apiUrl + action, parameter, opt).map(response => response.json());
        return response;
    }

    
    
}



