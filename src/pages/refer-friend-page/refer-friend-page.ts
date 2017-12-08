import { Component } from '@angular/core';
import { NavParams, LoadingController, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ReferFriend } from '../../services/referfriend.service';

@Component({
    selector: 'refer-friend',
    templateUrl: 'refer-friend-page.html'
})
export class referFriend {
    loading: any;
    referFriendData: any;
    getReferfriendData: any;
    referMsg: any;
    sharedata: any;
    shareImage: any;
    shareUrl: any;

    constructor(private share: SocialSharing, private platform: Platform, private loadingCtrl: LoadingController, private referService: ReferFriend) {

    }
    // facebookShare() {
    //     if (this.platform.is('cordova')) {
    //         this.loading = this.loadingCtrl.create({
    //             content:"Please wait.."
    //         });
    //         this.loading.present().then(() => {
    //             this.share.shareViaFacebook(this.shareUrl).then((response) => {
    //                 this.loading.dismiss();
    //             }).catch((data) => {
    //                 alert("Facebook is not installed on your device");
    //                 this.loading.dismiss();
    //             })
    //         })
    //     }
    // }
    // whatsappShare() {
    //     if (this.platform.is('cordova')) {
    //         this.loading = this.loadingCtrl.create({
    //             content:"Please wait.."
    //         });
    //         this.loading.present().then(() => {
    //             this.share.shareViaWhatsApp(this.sharedata.whatsapp, this.shareImage, this.shareUrl).then((response) => {
    //                 this.loading.dismiss();
    //             }).catch((data) => {
    //                 alert("WhatsApp is not installed on your device");
    //                 this.loading.dismiss();
    //             })
    //         })
    //     }
    // }
    // twitterShare() {
    //     if (this.platform.is('cordova')) {
    //         this.loading = this.loadingCtrl.create({
    //             content:"Please wait.."
    //         });
    //         this.loading.present().then(() => {
    //             this.share.shareViaTwitter(this.sharedata.twitter + "\n", this.shareImage, this.shareUrl).then(() => {
    //                 this.loading.dismiss();
    //             }).catch((data) => {
    //                 alert("Twitter is not installed on your device");
    //                 this.loading.dismiss();
    //             })
    //         })
    //     }
    // }
    // emailShare() {
    //     if (this.platform.is('cordova')) {
    //         this.share.shareViaEmail(this.sharedata.mail, this.sharedata.sub, [' ']).then(() => {
    //         }).catch((data) => {

    //         });
    //     }
    // }
    shareNow() {
        if (this.platform.is('cordova')) {
            this.share.share("Hello this is message" , "This is subject","","https://nima.lottosocial.com/").then(() => {

            }).catch((data) => {
                alert(data);
            })
        }
    }
    ionViewWillEnter() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
			content: `<img src="assets/vid/blue_bg2.gif" style="height:100px!important">`,
        });
        this.loading.present().then(() => {
            this.referService.referFriend()
                .subscribe(
                responseData => {
                    this.referFriendData = responseData.response[0].get_refer_friend.response;
                    this.getReferfriendData = responseData.response[0].get_refer_friend.response.refer_friend_data[0];
                    this.referMsg = responseData.response[0].get_refer_friend.response.refer_friend_data[0].mgm_message;
                    this.sharedata = JSON.parse(this.referMsg);
                    this.shareImage = responseData.response[0].get_refer_friend.response.refer_friend_data[0].mgm_image;
                    this.shareUrl = responseData.response[0].get_refer_friend.response.refer_friend_data[0].mgm_referurl;

                    this.loading.dismiss();
                },
                err => {
                    console.log("error", err);
                }
                );
        });
    }
}
