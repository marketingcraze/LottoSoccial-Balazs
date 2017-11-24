import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './common.service';
import { Params } from './params';

@Injectable()
export class VoucherService {
    private customerId: string = "";
    mobile_number:any;
    
    constructor(private http: Http,private params: Params) {
        console.log("VoucherService");
    }
    getVoucherList() {
        console.log("inside voucher list");
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
        console.log("custome id is ", this.customerId)



        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/voucher/ "
        let parameter = {
            "request": [
          {
                "session_ID": CommonService.sessionId,
                "page_ID": "7",
                "screen_id": "7.2",
                "action": "profile_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_customer_details",
                "customer_id":this.customerId
              },
          
              {
                 "session_ID": CommonService.sessionId,
                "page_ID": "20",
                "screen_id": "20.2",
                "action": "get_voucher",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_issued_voucher_code",
                "customer_id":this.customerId
          
              }
            ]
          }

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
       var response = this.http.post(action, parameter, opt).map(response => response.json());
   
       return response;
    }

    getPopUpVoucherData(mNumber,code) {
        console.log("inside voucher list");
        debugger
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
        console.log("custome id is ", this.customerId)

        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/voucher_validation"
        let parameter = {
            "request": [
              {
                 "session_ID": CommonService.sessionId,
                "page_ID": "20",
                "screen_id": "20.2",
                "action": "get_voucher",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "validate_voucher",
                "customer_id":this.customerId,
                "voucher":code, //code write here
                "email_address ":"",
                "mobile_number":mNumber
          }
            ]
          }
          

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
       var response = this.http.post(action, parameter, opt).map(response => response.json());
       return response;
    }
    getPopUpVoucherSucess(mNumber,code,gift_status) {
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

        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/voucher_claim "
        let parameter = {
            "request": [
              {
                "session_ID": CommonService.sessionId,
                "page_ID": "20",
                "screen_id": "20.2",
                "action": "save_gift_voucher",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "save_gift_voucher",
                "customer_id":this.customerId,
                "voucher":code,
                "mobile_number":mNumber,
                "gift_status": gift_status,
                "visitor_id":23232,
                "offer_id": 1054,
                "prosub_id":"",
                 "tp1":"tp1",
                "tp2":"tp2",
                "other":"Other"
              }
            ]
          }
          
          

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
       var response = this.http.post(action, parameter, opt).map(response => response.json());
       return response;
    }





}



