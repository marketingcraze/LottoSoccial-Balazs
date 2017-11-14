import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './common.service';
import { Params } from './params';

@Injectable()
export class leaveSyndicate {
    private customerId: string = "";
    mobile_number: any;
    constructor(private http: Http, private params: Params) {
        console.log("VoucherService");
    }
    managedSyndicatePause(sId:any) {
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
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/privatesyndicate/"
        let parameter = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "action": "leave_private_syndicate",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "page_id": "12",
                    "screen_id": "12.3",
                    "module_name": "leave_private_syndicate",
                    "customer_id": this.customerId,
                    "private_syndicate_id": sId,
                    "syndicate_type": "managed",
                    "join_status": "PAUSE"
                }
            ]
        }
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }
    manageSyndicateLeave(sId:any) {
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
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/privatesyndicate/"
        let parameter = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "action": "leave_private_syndicate",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "page_id": "12",
                    "screen_id": "12.3",
                    "module_name": "leave_private_syndicate",
                    "customer_id": this.customerId,
                    "private_syndicate_id": sId, 
                    "syndicate_type": "managed",      
                    "join_status": "CANCEL"   
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