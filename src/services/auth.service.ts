// app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { CommonService } from './common.service';

@Injectable()
export class AuthService {

    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http, 
        private transfer: Transfer, 
        private file: File) {}



   
    loginUser(tel: string, password: string) {
        let action = 'login/?action=Loginpop';
        let login = 'mobile=' + tel + '&password=' + password;
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeader()
        });

        console.log("login", login);
        var response = this.http.post(CommonService.apiUrl1 + action, login, opt).map(res => res.json());
        return response;
    }
 
    forgotPassword(mobile:string) {
        let action = 'login/?action=Forgetpasswordpopup';
        let data = 'Mobile_MSN:=' + mobile;
        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeader()
        });

        
        var response = this.http.post(CommonService.apiUrl1 + action, data, opt).map(res => res.json());
        return response;
    }
 
    addUser(user:any) {
        
        let action = 'signup/?action=freeregistration';
        let signup = 'free_reg_msn=' + user.free_reg_msn +
        '&free_reg_pwd=' + user.free_reg_pwd +
        '&first_name=' + user.first_name +
        '&last_name=' + user.last_name +
        '&email=' + user.email;

        let opt: RequestOptions = new RequestOptions({
            headers: CommonService.getHeader()
        });

/*
email:"shahriar@email.com"
first_name:"shahriar"
free_reg_msn:"0123456"
free_reg_pwd:"123456"
last_name:"kabir"
mobile:"123456"
*/
        var response = this.http.post(CommonService.apiUrl1 + action, signup, opt).map(res => res.json());
        return response;
    }


    uploadProfilePic( filePath:string, customerId:string ){
        const fileTransfer: TransferObject = this.transfer.create();

        let server = CommonService.apiUrl1 + 'module/?method=upload&module_id=profile_picture_update&customer_id=' 
        + customerId + '&session_id=123qwer&screen_id=101';
        
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: '' + customerId + '.jpg',
            headers: CommonService.getHeader()
        }


        fileTransfer.upload(filePath, server, options)
        .then((data) => {
            // success
            console.log("uploadProfilePic", data);
        }, (err) => {
            // error
            console.log("uploadProfilePic", err);
        });
        
    }
 
    getLoggedInUser() {
        // return firebase.auth().currentUser;
    }
 
    onAuthStateChanged(callback) {
        // return firebase.auth().onAuthStateChanged(callback);
    }
}



