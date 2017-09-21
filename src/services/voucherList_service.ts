import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './common.service';
import { Params } from './params';

@Injectable()
export class VoucherService {
    private customerId: string = "";
    
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



}



