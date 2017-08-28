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
export class ReferFriend {

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
    referFriend(action: string = "post", page_id: string = "15", module_names: string = "get_refer_friend") {

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
            screen_id: "15.1",
            action: 'get_mgm_details',
            module_name: module_names,
            program_id: "9",
            customer_id: this.customerId
        });
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log(CommonService.getHeaderJson());
        let url = CommonService.apiUrl + "v2/referfriend/";

        var response = this.http.post(url, parameter, opt).map(res => res.json());

        return response;

    }
}