import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { CommonService } from './common.service';

@Injectable()
export class AccountService {
    
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http, 
        private file: File) {

    }
   
    loadProfile() {
        if ( !CommonService.session ) {
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            });
        }
        let server = CommonService.apiUrl + CommonService.version + '/profile/';
        let data = {
            "request": [
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2",
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

        console.log("loadProfile", data);
        var response = this.http.post(server, data, opt).map(res => res.json());
        return response;
    }
 
    
    saveDetails(details:any) {
        console.log("saveDetails", details);
        if ( !CommonService.session ) {
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            });
        }
        

        let action = CommonService.apiUrl + CommonService.version + '/profile/';

        let reqData = { "request": [ Object.assign(
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2",
                "page_ID": "7",
                "screen_id": "7.3",
                "action": "update_customer_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "update_customer_details",
                "customer_id": CommonService.session.customer_id
            }, details) ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("saveDetails", reqData);

        var response = this.http.post(action, reqData, opt).map(res => res.json());
        return response;
    }
 
    saveEmail(details:any) {
        console.log("saveDetails", details);
        if ( !CommonService.session ) {
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            });
        }
        

        let action = CommonService.apiUrl + CommonService.version + '/profile/';

        let reqData = { "request": [ Object.assign(
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2",
                "page_ID": "7",
                "screen_id": "7.4",
                "action": "profile_email_update",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "update_customer_email",
                "customer_id": CommonService.session.customer_id
            }, details) ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("saveDetails", reqData);

        var response = this.http.post(action, reqData, opt).map(res => res.json());
        return response;
    }
 
    updatePassword(details:any) {
        console.log("updatePassword", details);
        if ( !CommonService.session ) {
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            });
        }
        
        let action = CommonService.apiUrl + CommonService.version + '/profile/';

        let reqData = { "request": [ Object.assign(
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2",
                "page_ID": "7",
                "screen_id": "7.5",
                "action": "profile_pwd_update",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "update_customer_password",
                "customer_id": CommonService.session.customer_id
            }, details) ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("updatePassword", reqData);

        var response = this.http.post(action, reqData, opt).map(res => res.json());
        return response;
    }

    updateNick(nick:string) {
        console.log("updateNick", nick);
        if ( !CommonService.session ) {
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            });
        }
        
        let action = CommonService.apiUrl + CommonService.version + '/profile/';

        let reqData = { "request": [
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2",
                "page_ID": "7",
                "screen_id": "7.2",
                "action": "update_nick",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "update_nick_name",
                "customer_id": CommonService.session.customer_id,
                "nick_name": nick
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("updateNick", reqData);

        var response = this.http.post(action, reqData, opt).map(res => res.json());
        return response;
    }
 
    getLoggedInUser() {
        // return firebase.auth().currentUser;
    }
 
    onAuthStateChanged(callback) {
        // return firebase.auth().onAuthStateChanged(callback);
    }
}



