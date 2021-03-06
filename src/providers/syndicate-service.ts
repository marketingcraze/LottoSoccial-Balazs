import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "4",
                "screen_id": "4.1",
                "action": "ilist_banner",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_syndicate_images_lib",
                "customer_id": CommonService.session.customer_id
            }]
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
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "4",
                "screen_id": "4.3",
                "action": "syndicate_lotteries",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_syndicate_lotteries",
                "customer_id": CommonService.session.customer_id
            }]
        }
        let headopt = SyndicateService.getHeader();
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    createSynd(d: any) {
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "4",
                "screen_id": "4.4",
                "action": "syndicate_lotteries",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "create_private_syndicate",
                "customer_id": "1970400",
                "syndicate_name": JSON.parse(localStorage.getItem('sdetails')).title,
                "image_url": JSON.parse(localStorage.getItem('sdetails')).image,
                "type": localStorage.getItem('cardType'),
                "product_group": d.product_group
            }]
        }
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

    saveTickets(sid: any, arr: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/privatesyndicate/";
        let headopt = SyndicateService.getHeader();
        let data = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "page_ID": "4",
                    "screen_id": "4.9",
                    "action": "syndicate_buy",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "module_name": "save_private_syndicate_tickets",
                    "customer_id": CommonService.session.customer_id,
                    "private_syndicate_id": sid,
                    "product_group": arr,
                    "trigger_action": "ACTIVATE/DEACTIVATE"
                }
            ]
        }

        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })


    }

    getBigJack(id: any) {
        let action = "privatesyndicate";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "4",
                "screen_id": "4.7",
                "action": "get_private_syndicate_offers",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "fetch_lottery_products",
                "customer_id": CommonService.session.customer_id
            },
            {
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
            }]
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
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "6",
                "screen_id": "6.1",
                "action": "syndicate_list",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_syndicate_list",
                "customer_id": CommonService.session.customer_id,
                // "customer_token":CommonService.session.customer_token
            }]
        }
        console.log('inside console');
        console.log(CommonService.session)
        return this.http.post(this.apiUrl + action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }

    getTickets(pid, sid, stype) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/ticket/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "session_ID": CommonService.sessionId,
            "page_ID": "6",
            "screen_id": "6.2",
            "action": "syndicate_ticket",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "get_tickets",
            "customer_id": CommonService.session.customer_id,
            "syndicate_id": sid,
            "product_id": pid,
            "syndicate_type": stype
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }
    getBadgeOS() {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/badgeos";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "action": "get_badgeos",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "page_id": "9",
                    "screen_id": "9.4",
                    "module_name": "get_badgeos",
                    "customer_id": CommonService.session.customer_id
                }
            ]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    loadWinnings() {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/checkmywin/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request":
                [{
                    "session_ID": CommonService.sessionId,
                    "page_ID": "6",
                    "screen_id": "6.1",
                    "action": "get_prev_check_list",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "module_name": "get_previous_check_list",
                    "customer_id": CommonService.session.customer_id
                }]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    checkWinnings() {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/checkmywin/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "9",
                "screen_id": "9.1",
                "action": "profile_details",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "cliamable_syndicates",
                "customer_id": CommonService.session.customer_id
            }]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    checkwinFinal() {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/checkmywin/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "9",
                "screen_id": "9.2",
                "action": "get_win",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "check_mywinnings",
                "customer_id": CommonService.session.customer_id
            }]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    prizeBreakDown() {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/checkmywin/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "9",
                "screen_id": "9.2",
                "action": "get_win",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "check_mywinnings",
                "customer_id": CommonService.session.customer_id
            }]
        }

        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    convertCash(claimevent_id: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/checkmywin/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "9",
                "screen_id": "9.3",
                "action": "convert_cash",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "convert_credit_to_cash",
                "claimevent_id": claimevent_id,
                "customer_id": CommonService.session.customer_id
            }]
        }

        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    getSyndicateMeembers(sid: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/member/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "5",
                "screen_id": "5.1",
                "action": "get syndicate meembers",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_private_syndicate_members",
                "customer_id": CommonService.session.customer_id,
                "private_syndicate_id": sid
            }]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }

    insertContact(cArr: any, sid: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/member/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "session_ID": CommonService.sessionId,
            "page_ID": "5",
            "screen_id": "5.2",
            "action": "contact_inserted",
            "website": "Lotto Social",
            "website_id": "27",
            "source_site": "mobi.lottosocial.com",
            "module_name": "insert_contacts",
            "customer_id": CommonService.session.customer_id,
            "private_syndicate_id": sid,
            "contact_group": cArr
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    socialsharing() {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/socialsharing";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [
                {
                    "session_ID": CommonService.sessionId,
                    "action": "get_mgm_details",
                    "website": "Lotto Social",
                    "website_id": "27",
                    "source_site": "mobi.lottosocial.com",
                    "page_id": "5",
                    "screen_id": "5.2.1",
                    "module_name": "get_social_sharing",
                    "program_id": "9",
                    "customer_id": CommonService.session.customer_id
                }
            ]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }
    geInvitedSyndicateDetails(pid: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/privatesyndicate/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "12",
                "screen_id": "12.1",
                "action": "invited_on_login",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "get_invited_private_syndicate",
                "customer_id": CommonService.session.customer_id,
                "private_syndicate_id": pid
            }]
        }

        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    joinSyndicate(pid: any, mid: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/privatesyndicate/";
        let headopt = SyndicateService.getHeader();
        var data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "12",
                "screen_id": "12.2",
                "action": "click_to_join",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "join_private_syndicate",
                "customer_id": CommonService.session.customer_id,
                "private_syndicate_id": pid,
                "invite_member_id": mid,
                "join_status": "JOINED"
            }]
        }

        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }

    DeclineInvite(pid: any, mid: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/privatesyndicate/";
        let headopt = SyndicateService.getHeader();
        let data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "action": "click_to_decline",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "page_id": "12",
                "screen_id": "12.3",
                "module_name": "join_private_syndicate",
                "customer_id": CommonService.session.customer_id,
                "private_syndicate_id": pid,
                "invite_member_id": mid,
                "join_status": "declined"
            }]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })

    }

    profanity(name: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/profanity_validate/";
        let data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "page_ID": "4",
                "screen_id": "4.1.1",
                "action": "profanity_check",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "module_name": "profanity_check",
                "str": name
            }]
        }

        let headopt = SyndicateService.getHeader();
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

    create_order_id(p_arr: any) {
        let action = "https://nima.lottosocial.com/wp-json/mobi/v2/privatesyndicate_order/ ";
        let headopt = SyndicateService.getHeader();
        let data = {
            "request": [{
                "session_ID": CommonService.sessionId,
                "action": "create_order_id",
                "website": "Lotto Social",
                "website_id": "27",
                "source_site": "mobi.lottosocial.com",
                "page_id": "4",
                "screen_id": "4.9.1",
                "module_name": "create_order_id_for_PS_Payment",
                "customer_id": CommonService.session.customer_id,
                "ps_cart": p_arr
            }]
        }
        return this.http.post(action, data, { headers: headopt })
            .map(res => res.json())
            .map((res) => {
                return res;
            })
    }

}



