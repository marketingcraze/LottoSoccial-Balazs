// app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommonService {
    public static SecureStorageUser:string = 'lotto_user';

    public static apiUrl:string = 'https://nima.lottosocial.com/wp-json/mobi/';
    public static version:string = 'v2';

    public static countries:any;

    constructor(private http:Http) {}
  
    static get parameters() {
        return [[Http]];
    }
/*
    public static getHeader(): Headers{
        let myHeaders: Headers = new Headers();

        myHeaders.set('Content-type', 'application/x-www-form-urlencoded');

        myHeaders.append('Authorization', 'Oauth oauth_consumer_key = "NDes1FKC0Kkg",' +
        'oauth_signature_method="HMAC-SHA1",' +
        'oauth_timestamp="1479395872",' +
        'oauth_nonce="A96zvQ",' +
        'oauth_version="1.0",' +
        'oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg",' +
        'oauth_signature="uRpPuOZEEStiy8ohVfFVW8zRNYw%3D"');
        
        return myHeaders;
    }
*/
    public static getHeaderJson(): Headers{
        let myHeaders: Headers = new Headers();

        myHeaders.set('Content-type', 'application/json');
        
/*

OAuth oauth_consumer_key="NDes1FKC0Kkg",
oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg",
oauth_signature_method="HMAC-SHA1",
oauth_timestamp="1490087533",
oauth_nonce="dWL9pr",
oauth_version="1.0",
oauth_signature="mQF41gSF7KIuVqzqcI0nSX1UklE%3D"

OAuth oauth_consumer_key="NDes1FKC0Kkg", oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1490087533", oauth_nonce="dWL9pr", oauth_version="1.0", oauth_signature="mQF41gSF7KIuVqzqcI0nSX1UklE%3D"

*/
        myHeaders.append('Authorization', 
            'Oauth oauth_consumer_key = "NDes1FKC0Kkg",' +
            'oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg",' +
            'oauth_signature_method="HMAC-SHA1",' +
            'oauth_timestamp="1490087533",' +
            'oauth_nonce="dWL9pr",' +
            'oauth_version="1.0",' +
            'oauth_signature="mQF41gSF7KIuVqzqcI0nSX1UklE%3D"'
            );
        
        return myHeaders;
    }


/*
    getCountry(){
        if(CommonService.countries) {
            return Observable.create( observer => {
                observer.next(CommonService.countries);
                observer.complete();
            });
        }else{
            let action = 'module/';
            let data = 'module_id=' + 'get_countries' +
              '&screen_id=' + 102 +
              '&action=' + 'fetch_countries';

            let myHeaders: Headers = new Headers();
            myHeaders.set('Content-type', 'application/x-www-form-urlencoded');

            let opt: RequestOptions = new RequestOptions({
                headers: myHeaders
            });
            
            var response = this.http.post(CommonService.apiUrl + "v1/" + action, data, opt).map(res => res.json());
            return response;
        }
    }
*/
    getCountry(){
        if(CommonService.countries) {
            return Observable.create( observer => {
                observer.next(CommonService.countries);
                observer.complete();
            });
        }else{
            let action = CommonService.version + '/login/';
            let data = {
                "request": [
                {
                    "page_id": "1",
                    "screen_id": "1.1",
                    "module_name": "get_country_code_flag"
                } 
                ]
            };

            let myHeaders: Headers = new Headers();
            myHeaders.set('Content-type', 'application/json');

            let opt: RequestOptions = new RequestOptions({
                headers: CommonService.getHeaderJson()
            });
            
            var response = this.http.post(CommonService.apiUrl + action, data, opt)
            .map(res => res.json());

            return response;
        }
    }
}





