// app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Transfer, FileUploadOptions, TransferObject, } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { CommonService } from './common.service';

@Injectable()
export class AuthService {
    
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http, 
        private transfer: Transfer,
        private file: File) {

    }
   
    loginUser(country_code:string, tel: string, password: string) {
        let action = CommonService.version + '/login/';
        let login = {
            "request": [
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2", "page_ID": "1",
                "screen_id": "1.1",
                "action": "login_mobile_app",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", "module_name": "login",
                "mobile": tel, //"447712887310",
                "password": password, //"abc123",
                "country_code": country_code // "44"
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

        console.log("login", login);
        var response = this.http.post(CommonService.apiUrl + action, login, opt).map(res => res.json());
        return response;
    }
 
    forgotPassword(mobile:string) {
        let action = 'login/?action=Forgetpasswordpopup';
        let data = 'Mobile_MSN:=' + mobile;
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });
        
        var response = this.http.post(CommonService.apiUrl + action, data, opt).map(res => res.json());
        return response;
    }
 
    addUser(user:any) {
        console.log("addUser", user);

        let action = CommonService.version + '/register/';
        let signup = {
            "request": [
            {
                "session_ID": "avjtjgu0f257f0orggqufcn5g2", 
                "page_ID": "1",
                "screen_id": "1.2",
                "action": "login_mobile_app",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com", 
                "module_name": "register",

                "mobile": user.mobile,
                "password": user.free_reg_pwd,
                "country_code": user.country_code, 
                "first_name": user.first_name, 
                "last_name": user.last_name, 
                "email": user.email, 
                "profile_image_url": user.profile_image_url
            } ]
        };

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeaderJson()
        });

/*
email:"s@w.com"
first_name:"1"
free_reg_msn:"23423423423"
free_reg_pwd:"zssdasdfasdf"
image:""
last_name:"2"
mobile:"23423423423"
*/
        console.log("addUser", signup);

        var response = this.http.post(CommonService.apiUrl + action, 
            signup, opt).map(res => res.json());
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
            // mimeType: "multipart/form-data",
            headers: myHeaders
        }

        let formData = new FormData();
        formData.append('image', filePath);

        console.log("options ", server, options);

        console.log("form data ", formData);
        /*
        var response = this.http.post(server, formData, options)
        .map(res => res.json());

        return response;
        */

        
        return new Observable( observer => {
            let fileTransfer = this.transfer.create();

            fileTransfer.upload(filePath, encodeURI(server), options)
            .then((data:any) => {
                // success
                console.log("success" + data);
                if(data && data.response && data.response.status == 'SUCCESS') {
                    observer.next(data.response);
                }else{
                    observer.next( Error("Image upload error.") );
                }
                
                observer.complete();
            }, (err:any) => {
                // error
                observer.next(err);
                observer.complete();
            });

        });
        
    }
 
 
    getLoggedInUser() {
        // return firebase.auth().currentUser;
    }
 
    onAuthStateChanged(callback) {
        // return firebase.auth().onAuthStateChanged(callback);
    }
}



