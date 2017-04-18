// app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { CommonService } from './common.service';

@Injectable()
export class HomeService {

    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http, 
        private transfer: Transfer,
        private file: File) {
    }

    getOffers() {
        let action = CommonService.version + '/offers/';
        let parameter = {
            "request": [
            {
                "page_id": "1",
                "screen_id": "1.4", 
                "module_name": "get_home_card", 
                "customer_id":"1970400"
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("getOffers", parameter);
        var response = this.http.post(CommonService.apiUrl + action, parameter, opt).map(res => res.json());
        return response;
    }

    getHomeCard() {
        let action = CommonService.version + '/home/';
        let parameter = {
            "request": [
            {
                "page_id": "1",
                "screen_id": "1.4", 
                "module_name": "get_home_card", 
                "customer_id":"1970400"
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("getHomeCard", parameter);
        var response = this.http.post(CommonService.apiUrl + action, parameter, opt).map(res => res.json());
        return response;
    }

    
    


    uploadProfilePic( filePath:string ){
        
        let server = CommonService.apiUrl + 
            CommonService.version + '/upload/?process=profile';

        let myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', 
            'Oauth oauth_consumer_key = "NDes1FKC0Kkg",' +
            'oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg",' +
            'oauth_signature_method="HMAC-SHA1",' +
            'oauth_timestamp="1490087533",' +
            'oauth_nonce="dWL9pr",' +
            'oauth_version="1.0",' +
            'oauth_signature="mQF41gSF7KIuVqzqcI0nSX1UklE%3D"'
            );
        myHeaders.append('Content-type', 'multipart/form-data');

        var extension = filePath.substr(filePath.lastIndexOf('.') + 1);
        let options = {
            fileKey: 'file',
            // fileName: 'name.jpg',
            mimeType: "multipart/form-data",
            headers: myHeaders
        }

        let formData = new FormData();
        formData.append('image', filePath);

        console.log("options ", server, options);

        console.log("form data ", formData);
        
        var response = this.http.post(server, formData, options)
        .map(res => res.json());

        return response;
    }
 
 
    getLoggedInUser() {
        // return firebase.auth().currentUser;
    }
 
    onAuthStateChanged(callback) {
        // return firebase.auth().onAuthStateChanged(callback);
    }
}



