import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './common.service';
import { Params } from './params';
@Injectable()
export class badgesOs {
    private customerId: string = "";
    constructor(private http: Http, private params: Params) {
    }
    getBadgesData() {
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
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/getbadges"
        let parameter = {
            "request": [
                {
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
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