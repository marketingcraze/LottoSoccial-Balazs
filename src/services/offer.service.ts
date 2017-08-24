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
        console.log("getExistingPaymilCards", CommonService.session );
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
                "customer_id": CommonService.session.customer_id, 
                "private_syndicate_id": "298"
            } ]
        };
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        console.log("getExistingPaymilCards", action, parameter, opt);
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }

    processPaymillCardPayment(offer:any, customer:any, payment:any) {
        console.log("getExistingPaymilCards", offer, customer, payment);

        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        let action = 
        CommonService.apiUrl + 
        CommonService.version + '/paywithtoken/';

        let parameter = {
            "request": [
            {
                "session_ID": CommonService.sessionId, 
                "page_ID": "4",
                "screen_id": "4.11",
                "action": "process_paymill_card_payment",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "process_paymill_card_payment", 
                "customer_id": CommonService.session.customer_id,
                "title": customer.title,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "dob": customer.dob,
                "phone": customer.mobile_number,
                "mobile": customer.mobile_number,
                "email": customer.email_address,
                "amount": offer.total_cost,
                "customer_web_lead_id": "",
                "TP1": "",
                "TP2": "",
                "p_type": "10",
                "offer_id": offer.offer_id,
                "status": "olu.testerr@gmail.com",
                "prosub_id": offer.prosub_id,
                "payment_currency": "GBP",
                "payment_type": "payment",
                "award_id": "",
                "transaction_log_id": "", 
                "customer_payment_stored_detail_id": payment.pay_stored_detail_id, 
                "client_id": payment.client_id, 
                "client_pay_id": payment.client_pay_id
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
        console.log("getExistingPaymilCardsDetails", CommonService.session);
        if (!CommonService.isOnline) {
            this.params.setIsInternetAvailable(false);
            return;
        }

        // let action = CommonService.apiUrlDF + 'Proc_fetch_private_syndicates_Mobile_App';
        let action = CommonService.apiUrl + CommonService.version + '/privatesyndicate/';
        let parameter = {
            "request": [
            {
                "session_ID": CommonService.sessionId, 
                "page_ID": "4",
                "screen_id": "4.10",
                "action": "get_card_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "get_customer_paymill_card_details", 
                "customer_id": CommonService.session.customer_id,
                "p_type": "10",
                "paymill_offer_id": "1019"
            }, {
                "session_ID": CommonService.sessionId, 
                "page_ID": "7",
                "screen_id": "7.2",
                "action": "profile_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",  
                "module_name": "get_customer_details", 
                "customer_id": CommonService.session.customer_id
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



