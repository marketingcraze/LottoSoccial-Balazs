import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './common.service';
import { Params } from './params';
@Injectable()
export class winnerTips {
    private customerId: string = "";
    constructor(private http: Http, private params: Params) {

    }
    getRecentWinnerTips(pruductName: string) {
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

        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/gametips/"
        let parameter = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "customer_id": this.customerId,
                    "page_id": "3",
                    "screen_id": "3.7",
                    "module_name": "get_game_tips",
                    "product_name": pruductName

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