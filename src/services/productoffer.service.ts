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
export class productOffer {

    private customerId: string = "";
    static get parameters() {
        return [[Http]];
    }
    constructor(
        private http: Http,
        private params: Params,
        private storage: Storage,
        public platform: Platform,
        private transfer: Transfer,
        private file: File) {

    }

    dedicatedOfferData(productName: any, action: string = "post", page_id: string = "2", module_names: string = "get_credit_offer") {
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
            page_id: page_id,
            screen_id: "2.3.1",
            module_name: module_names,
            customer_id: this.customerId,
            product_name: productName
        });

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log(CommonService.getHeaderJson());

        let url = CommonService.apiUrl + "v2/offers/";

        var response = this.http.post(url, parameter, opt).map(res => res.json());

        return response;
    }

}