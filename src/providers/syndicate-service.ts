import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';

import { CommonService } from '../services/common.service';

@Injectable()
export class SyndicateService {
    apiUrl: string = 'https://nima.lottosocial.com/wp-json/mobi/v2/';

    constructor(private http: Http, private sanitizer: DomSanitizer, public file: File) { }

    static get parameters() {
        return [[Http]];
    }

    public static getHeader(): Headers {
        let myHeaders: Headers = new Headers();

        myHeaders.set('Content-type', 'application/json');

        myHeaders.append('Authorization', 'Oauth oauth_consumer_key = "NDes1FKC0Kkg",' +
            'oauth_signature_method="HMAC-SHA1",' +
            'oauth_timestamp="1490087533",' +
            'oauth_nonce="dWL9pr",' +
            'oauth_version="1.0",' +
            'oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg",' +
            'oauth_signature="mQF41gSF7KIuVqzqcI0nSX1UklE%3D"');

        return myHeaders;
    }

    getcovers() {
        let action = 'privatesyndicate/';
        let data = {
            "session_ID": "avjtjgu0f257f0orggqufcn5g2",
            "page_ID": "4",
            "screen_id": "4.1",
            "action": "ilist_banner",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_syndicate_images_lib",
            "customer_id": "1970400"
        }
        let headopt = SyndicateService.getHeader();
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }

    uploadCover(filePath: any) {

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

        // var options = {
        //   fileKey: "file",
        //   fileName: 'img'+new Date().getTime(),
        //   chunkedMode: false,
        //   mimeType: "multipart/form-data",
        //   params : {
        //     'fileName':'img'+new Date().getTime()
        //   }
        // };

        var extension = filePath.substr(filePath.lastIndexOf('.') + 1);
        let options = {
            fileKey: 'file',
            //fileName: 'name.jpg',
            chunkedMode: false,
            mimeType: "multipart/form-data",
            headers: myHeaders
        }


        // console.log('inside service upload');

        // console.log(imgdata)
        console.log('inside upload service');
        console.log(extension)
        console.log(filePath)
        var apiUrl = 'https://nima.lottosocial.com/wp-json/mobi/v2/upload/?process=syndicate';
        // let headopt = SyndicateService.getHeader();
        //  let formData:FormData = new FormData();

        let formData = new FormData();
        formData.append('image', filePath);
        console.log('formdata', apiUrl, options);
        console.log(formData);
        return this.http.post(apiUrl, formData, options)
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    getLotteries() {
        let action = 'privatesyndicate'
        let data = {
            "session_ID": CommonService.sessionId,
            "page_ID": "4",
            "screen_id": "4.3",
            "action": "syndicate_lotteries",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_syndicate_lotteries",
            "customer_id": CommonService.session.customer_id
        }
        let headopt = SyndicateService.getHeader();
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    createSynd(data: any) {
        let action = "privatesyndicate";
        let headopt = SyndicateService.getHeader();
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    getTerms(id: any) {
        let action = "privatesyndicate";
        let headopt = SyndicateService.getHeader();
        var data = {
            "session_ID": CommonService.sessionId,
            "page_ID": "4",
            "screen_id": "4.5",
            "action": "syndicate_terms",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_private_syndicate_terms",
            "customer_id": CommonService.session.customer_id,
            "private_syndicate_id": id
        }
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }

    syndnumber(id: any) {
        let action = "privatesyndicate";
        let headopt = SyndicateService.getHeader();
        var data = {
            "session_ID": CommonService.sessionId,
            "page_ID": "4",
            "screen_id": "4.6",
            "action": "get_syndicate",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_private_syndicate_details",
            "customer_id": CommonService.session.customer_id,
            "private_syndicate_id": id
        }
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    getBigJack(id: any) {
        let action = "privatesyndicate";
        let headopt = SyndicateService.getHeader();
        var data = {
            "session_ID": CommonService.sessionId,
            "page_ID": "4",
            "screen_id": "4.7",
            "action": "jackpot_list",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_big_jackpot_list",
            "customer_id": CommonService.session.customer_id,
            "private_syndicate_id": id
        }
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    buySyndicate(data: any) {
        let action = "privatesyndicate";
        let headopt = SyndicateService.getHeader();
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    syndicateList() {
        let action = "privatesyndicate";
        let headopt = SyndicateService.getHeader();
        var data = {
            "session_ID": CommonService.sessionId,
            "page_ID": "6",
            "screen_id": "6.1",
            "action": "syndicate_list",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_syndicate_list",
            "customer_id": CommonService.session.customer_id
        }
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }

}



