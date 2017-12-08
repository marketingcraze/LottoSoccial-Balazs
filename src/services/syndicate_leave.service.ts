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
    managedSyndicatePause(sId: any) {
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
                    "module_name": "manage_syndicate",
                    "customer_id": this.customerId,
                    "private_syndicate_id": sId,
                    "syndicate_type": "managed",
                    "syndicate_status": "PAUSE"
                }
            ]
        }
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }
    manageSyndicateLeave(sId: any) {
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
                    "module_name": "manage_syndicate",
                    "customer_id": this.customerId,
                    "syndicate_id": sId,
                    "syndicate_type": "managed",
                    "syndicate_status": "CANCEL"

                }

            ]
        }
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }
    privateSyndicateMembers(sId: any) {
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
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/member/"
        let parameter = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "page_ID": "5",
                    "screen_id": "5.1",
                    "action": "get syndicate meembers",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "module_name": "get_private_syndicate_members",
                    "customer_id": this.customerId,
                    "private_syndicate_id": sId,
                }

            ]
        }
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }
    privateSyndicateLeave(sId: any) {
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
                    "action": "manage_syndicate",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "page_id": "12",
                    "screen_id": "12.3",
                    "module_name": "manage_syndicate",
                    "customer_id": this.customerId,
                    "syndicate_id": sId,
                    "syndicate_type": "private",
                    "syndicate_status": "LEAVE"

                }

            ]
        }
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }
    getSyndicateSize(sId: any, type) {
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
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/syndicate_size/"
        let parameter = {
            "request": [
                {
                    "session_ID": "avjtjgu0f257f0orggqufcn5g2",
                    "action": "manage_syndicate",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "page_id": "12",
                    "screen_id": "12.5",
                    "module_name": "get_syndicate_size",
                    "customer_id": this.customerId,
                    "syndicate_id": sId,
                    "syndicate_type": type
                }
            ]
        }
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        var response = this.http.post(action, parameter, opt).map(response => response.json());
        return response;
    }
    getChkWinningsSlider() {
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
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/checkmywin_slider/"
        let parameter = {
            "request": [
                {
                    "page_id": "9",
                    "screen_id": "9..1.1",
                    "module_name": "get_checkmywin_slider",
                    "customer_id": this.customerId
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