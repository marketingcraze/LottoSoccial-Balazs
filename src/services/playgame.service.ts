import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { CommonService } from './common.service';
import { AuthService } from './auth.service';
import { Params } from './params';

@Injectable()
export class PlayGame {

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

    }


    getGameInfo(GameID:any,action: string = "post", page_id: string = "3", module_names: string = "get_game_info") {
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

        parameter.request.push({
            action: 'play_game',
            game_id:GameID,
            page_id: page_id,
            screen_id: "3.2",
            module_name: module_names,
            customer_id: this.customerId
        },
        {
            "session_ID": CommonService.sessionId,
            "page_ID": "3",
            "screen_id": "3.6",
            "action": "get_recent_winners",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_game_recent_winners",
            "customer_id":this.customerId,
            "game_id":GameID
        });
       


        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log(CommonService.getHeaderJson());

        let url = CommonService.apiUrl + "v2/playgame/";
        
        var response = this.http.post(url, parameter, opt).map(res => res.json());

        return response;
    }

//fetching game booster info

    getGameBooster(customerAward_logId:string,action: string = "post", page_id: string = "3", module_names: string = "activate_game_booster"){

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

        parameter.request.push({
            page_id: page_id,
            screen_id: "3.1",
            action: 'play_game',
            module_name: module_names,
            customer_id: this.customerId,
            customer_award_log_id:customerAward_logId,
        });
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log(CommonService.getHeaderJson());
        let url = CommonService.apiUrl + "v2/activatebooster/";
        
        var response = this.http.post(url, parameter, opt).map(res => res.json());

        return response;

    }

    //Game Thank you page info
    gameThankyouPage(customerAward_logId: string, action: string = "post", page_id: string = "3", module_names: string = "get_game_info_thankyou_page") {
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

        parameter.request.push({
            page_id: page_id,
            action: 'your_game',
            module_name: module_names,
            customer_id: this.customerId,
            customer_award_log_id: customerAward_logId
        });
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log(CommonService.getHeaderJson());
        let url = CommonService.apiUrl + "v2/playgamethankyou/";

        var response = this.http.post(url, parameter, opt).map(res => res.json());

        return response; 

    }

}
