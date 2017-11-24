import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { CommonService } from './common.service';
import { AuthService } from './auth.service';
import { Params } from './params';

@Injectable()
export class HomeService {

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

        console.log("HomeService");


    }

    getModules(action: string, page_id: string, module_names: string[]) {

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
        debugger;
        console.log("getHomeCard");
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

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
    getHomeEventsBlog() {
        console.log("getHomeCard");
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let action = CommonService.version + '/home/';
        let parameter = {
            "request": [
                {
                    "page_id": "1",
                    "screen_id": "1.6.2",
                    "module_name": "get_home_blog",
                    "customer_id": this.customerId
                },
                {
                    "page_id": "1",
                    "screen_id": "1.6.1",
                    "module_name": "get_home_events",
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

        if (!CommonService.session) {
            return null;
        }
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }
        console.log("getHomeCard");

        let url = CommonService.apiUrl + CommonService.version + '/limb/';
        let parameter = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
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


    getCreditOffers() {
        console.log("HomeService::getCreditOffers");

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

        let url = CommonService.apiUrlDF + 'proc_get_credit_offers_mobile_app';
        let parameter = {
            "params": [{
                "name": "json_request",
                "param_type": "IN",
                "value": { page_id: 2, screen_id: 2.1, module_name: "get_credit_offer", customer_id: CommonService.session.customer_id },
                "type": "NVARCHAR(500)",
                "length": 0
            },
            {
                "name": "response",
                "param_type": "OUT",
                "value": "",
                "type": "NVARCHAR(max)"
            }],
            "request_source": "mobile_app"
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderDF()
        });

        var response = this.http.post(url, parameter, opt).map(response => response.json());
        return response;
    }
    markAsRead(cardId) {
        if (!CommonService.session) {
            return null;
        }
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let url = 'https://nima.lottosocial.com/wp-json/mobi/v2/limb/';
        let parameter = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "page_ID": "1",
                    "screen_id": "1.6.3",
                    "action": "get_card_details",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "module_name": "mark_home_inbox_message",
                    "customer_id": this.customerId,
                    "card_id": cardId

                }
            ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        var response = this.http.post(url, parameter, opt).map(response => response.json());
        return response;
    }
    deleteMsg(cardId) {
        if (!CommonService.session) {
            return null;
        }
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let url = 'https://nima.lottosocial.com/wp-json/mobi/v2/limb/';
        let parameter = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "page_ID": "1",
                    "screen_id": "1.6.3",
                    "action": "get_card_details",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "module_name": "delete_home_inbox_message",
                    "customer_id": this.customerId,
                    "card_id": cardId
                }
            ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        var response = this.http.post(url, parameter, opt).map(response => response.json());
        return response;
    }


}



