import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { CommonService } from './common.service';
import { AuthService } from './auth.service';
import { Params } from './params';



@Injectable()
export class AffiliateServices {
    customerId: any;
 static get parameters() {
        return [[Http]];
    }
    constructor(
       private http: Http,
        private params: Params,
        private storage: Storage,
        public platform: Platform,
        private transfer: Transfer,
        private file: File
    ){
       
    }

     loadAffiliateData() {
        if (!CommonService.session) {
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            })
        }

        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            });
        }

        this.customerId = CommonService.session.customer_id;
        console.log("getModules", CommonService.session);

        let parameter = { request: [] };

        parameter.request.push({
                session_ID: CommonService.sessionId,
                page_id: "22",
                screen_id: "22.1",
                action: "affiliate_page",
                website: "Lotto Social",
                website_id: "27",
                source_site: "mobi.lottosocial.com",
                module_name: "get_affiliate_page_details",
                customer_id: CommonService.session.customer_id,
                product_id :"32",  
                offer_id:"1079" 
        });
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        console.log(CommonService.getHeaderJson());
        let url = CommonService.apiUrl + "v2/affiliate/";

        var response = this.http.post(url, parameter, opt).map(res => res.json());

        return response; 

    }
}