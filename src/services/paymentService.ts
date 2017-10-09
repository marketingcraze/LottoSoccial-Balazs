import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './common.service';
import { Params } from './params';



@Injectable()
export class paymentService {
    private customerId: string = "";
    mobile_number:any;
    
    constructor(private http: Http,private params: Params) {
        console.log("PaymentService");
    }
    getPaymentDescription(){
       
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
       

        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/payment/  "
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
              },
              {
                "session_ID": CommonService.sessionId,
                "page_ID": "7",
                "screen_id": "7.2",
                "action": "profile_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_customer_details",
                "customer_id":CommonService.session.customer_id
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









