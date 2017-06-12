import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

import { CommonService } from './common.service';
import { AuthService } from './auth.service';
import { Params } from './params';

@Injectable()
export class OfferService {

    private customerId:string = "";

    static get parameters() {
        return [[Http]];
    }
  
    constructor(
        private http:Http, 
        private params:Params,
        private storage: Storage,
        public platform: Platform) {

        console.log("OfferService");        
    }



    getJackpotList() {
        console.log("getExistingPaymilCards");
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let action = CommonService.apiUrl + CommonService.version + '/privatesyndicate/';
        let parameter = {
            "request": [
            {
                "session_ID": CommonService.sessionId, 
                "page_ID": "4",
                "screen_id": "4.7",
                "action": "jackpot_list",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "get_big_jackpot_list", 
                "customer_id":"1970400", 
                "private_syndicate_id":"298"
            } ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        console.log("getExistingPaymilCards", action, parameter, opt);
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }

    processPaymillCardPayment() {
        console.log("getExistingPaymilCards");
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let action = CommonService.apiUrl + CommonService.version + '/paywithtoken/';
        let parameter = {
            "request": [
            {
                "session_ID": CommonService.sessionId, 
                "page_ID": "4",
                "screen_id": "4.11",
                "action": "process_paymill_card_payment", "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "process_paymill_card_payment", 
                "customer_id": "1970400",
                "title": "Mr",
                "first_name": "Nadeshs",
                "last_name": "Narayan",
                "dob": "",
                "phone": "447712887310",
                "mobile": "447712887310",
                "email": "olu.testerr@gmail.com",
                "amount": "5.5",
                "customer_web_lead_id": "",
                "TP1": "",
                "TP2": "",
                "p_type": "10",
                "offer_id": "1188",
                "status": "olu.testerr@gmail.com",
                "prosub_id": "2279",
                "payment_currency": "GBP",
                "payment_type": "payment",
                "award_id": "",
                "transaction_log_id": "", 
                "customer_payment_stored_detail_id": "3475", 
                "client_id": "client_7bcfd5d9454662d9b80b", 
                "client_pay_id": "pay_14e434cf6a515bc0469b7c2d"
            } ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        console.log("getExistingPaymilCards", action, parameter, opt);
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }

    getExistingPaymilCardsDetails() {
        console.log("getExistingPaymilCardsDetails");
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        // let action = CommonService.apiUrlDF + 'Proc_fetch_private_syndicates_Mobile_App';
        let action = CommonService.apiUrl + CommonService.version + '/privatesyndicate/';
        let parameter = {
            "request": [
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2", 
                "page_ID": "4",
                "screen_id": "4.10",
                "action": "get_card_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "get_customer_paymill_card_details", 
                "customer_id": "1970400",
                "p_type": "10",
                "paymill_offer_id": "1019"
            }, {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2", "page_ID": "7",
                "screen_id": "7.2",
                "action": "profile_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",  
                "module_name": "get_customer_details", 
                "customer_id":"1970400"
            } ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        console.log("getExistingPaymilCardsDetails", action, parameter, opt);
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }
    
    
}



