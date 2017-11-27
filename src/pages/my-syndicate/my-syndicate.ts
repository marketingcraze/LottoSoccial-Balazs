import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, Tabs, LoadingController, ViewController, ModalController } from 'ionic-angular';
import { ManageSyndicatePage } from '../manage-syndicate/manage-syndicate';
import { ManageSyndicate2Page } from '../manage-syndicate2/manage-syndicate2';
import { YourTicketsPage } from '../your-tickets/your-tickets';
import { SyndicateService } from '../../providers/syndicate-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferService } from '../../services/offer.service';
import { CommonService } from '../../services/common.service';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { InviteFriendsPage } from '../invite_friends/invite_friends';
import { Content, Platform } from 'ionic-angular'
import { OffersPage } from '../offers/offers'
declare var $: any;
declare var cordova: any;

@Component({
    selector: 'page-my-syndicate',
    templateUrl: 'my-syndicate.html'
})
export class MySyndicatePage {
    @ViewChild(Content) content: Content;
    @ViewChild("confirmPayment") confirmPayment;

    private syndArr = [];
    private toggled = [];


    userCards: any;
    userCardsCount: number = 0;
    customerToken: string;
    jackpotList: any
    jackpotGroup: any
    chatcount: any;
    customer_id: any;
    viewEmpty: boolean = false;
    downShowing = 0;
    down_arrow_showing = 0;


    constructor(
        public app: App,
        public iab: InAppBrowser,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public platform: Platform,
        public srvOffer: OfferService,
        public navCtrl: NavController,
        public appSound: AppSoundProvider,
        public _syndService: SyndicateService,
        public loadingCtrl: LoadingController,
        public cdRef: ChangeDetectorRef) {


        this.checkCardExists()
    }

    ionViewDidLoad() {
        this.customer_id = CommonService.session.customer_id;
        this.loadSyndicate();


    }
    ionViewWillEnter() {
        this.delay(4000);
        this.content.enableScrollListener();
    }
    openOfferPage() {
        this.appSound.play('buttonClick');
        var tabs: Tabs = this.navCtrl.parent.parent.parent;
        tabs.select(4);
    }
    scrollHandlerSyndicate(event) {

        var innerDiv = document.getElementById('innerMySyndicate').scrollHeight;
        var scrollDiv = document.getElementById('asynd').clientHeight;

        var valu = scrollDiv + this.content.scrollTop
        console.log("sdsdsdsdsdsdsds", innerDiv, scrollDiv, valu)
        if (valu > innerDiv) {
            console.log("botom")
            this.downShowing = 1
            this.cdRef.detectChanges();
        }
        else {
            this.downShowing = 0
            this.down_arrow_showing = 0
            this.cdRef.detectChanges();
        }
    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    ionViewDidEnter() {

    }
    checkwins() {
        this.appSound.play('buttonClick');
        var t: Tabs = this.navCtrl.parent;
        t.select(1);
    }
    manage_syndicates(sd: any) {
        debugger
        this.appSound.play('buttonClick');
        let Modal = this.modalCtrl.create(ManageSyndicatePage, { syndicate: sd });
        Modal.onDidDismiss(data => {
            if (data == 'offerPage') {
                var tabs: Tabs = this.navCtrl.parent.parent.parent;
                tabs.select(4)
            }

        })
        Modal.present();
    }
    manage_syndicates2(sd: any) {
        debugger
        this.appSound.play('buttonClick');
        let Modal = this.modalCtrl.create(ManageSyndicate2Page, { syndicate_id: sd });
        Modal.present();
        // this.appSound.play('buttonClick');
        // this.app.getRootNav().push(ManageSyndicate2Page);
    }
    viewTickets(i) {

        this.appSound.play('buttonClick');
        var grp = this.syndArr[i].product_group;
        var sid = this.syndArr[i].syndicate_id;
        var stype = this.syndArr[i].syndicate_type;
        this.app.getRootNav().push(YourTicketsPage, { 'products': grp, 'synd': sid, 'stype': stype });
    }
    viewPrivateTickets(productGroup: any, syndicate_id: any, syndicate_type: any) {
        this.appSound.play('buttonClick');
        this.app.getRootNav().push(YourTicketsPage, { 'products': productGroup, 'synd': syndicate_id, 'stype': syndicate_type });
    }

    loadSyndicate() {
        let loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        loader.present();
        this._syndService.syndicateList().subscribe((res) => {
            console.log('syndicate list');
            loader.dismiss();
            if (res.response[0].get_syndicate_list.response.syndicate_group) {
                this.syndArr = res.response[0].get_syndicate_list.response.syndicate_group;
                var a = localStorage.getItem("syndicateP")
                if (localStorage.getItem("syndicateP") == undefined || localStorage.getItem("syndicateP") == null) {
                    this.down_arrow_showing = 1
                }
                else {
                    this.down_arrow_showing = 0
                }
                localStorage.setItem("syndicateP", "1")
                console.log("syndSrr is ", this.syndArr)
                setTimeout(()=>
                {
                    this.down_arrow_showing = 0
                    this.cdRef.detectChanges()
                    console.log("value changed for dwn arow in syndicate")
                }, 3000);
                this.chatcount = res.response[0].get_syndicate_list.response.peepso_notification_count.data["ps-js-notifications"].count;
                if (this.chatcount > 0) {
                    $(".ctNow").removeClass('pulse');
                }
                if (this.syndArr) {
                    if (this.syndArr.length == 0) {
                        this.viewEmpty = true;
                    }
                    for (var i = 0; i < this.syndArr.length; i++) {
                        this.toggled.push(false);
                    }
                    this.toggled[0] = true;
                }

                console.log(this.syndArr);
            }
            else {
                this.viewEmpty = true;
            }

        })


    }

    toggleAcc(i) {
        this.appSound.play('buttonClick');
        this.toggled[i] = !this.toggled[i];
    }

    checkCardExists() {
        console.log("OffersPage::checkCardExists()");
        let loader = this._showLoader();

        this.srvOffer.getJackpotList().subscribe((data) => {
            console.log("OffersPage::getJackpotList() success", data);
            if (data.response && data.response[0].get_big_jackpot_list) {
                this.jackpotList = data.response[0].get_big_jackpot_list.response;
                this.customerToken = this.jackpotList.customer_token;
            }

            loader.dismiss();

        }, (err) => {
            console.log("OffersPage::getJackpotList() error", err);
            loader.dismiss();
        });
    }


    showPaymentOptions(syndicate) {
        console.log("OffersPage::showPaymentOptions()", syndicate);

        this.appSound.play('buttonClick');

        if (this.customerToken) {
            let opt: string = "toolbarposition=top";
            let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to=free_reg'
            str += '&customer_id=1970400&customer_token=' + this.customerToken + '&Offer_ID=1188'
            this.iab.create(str, 'blank', opt);
        } else {
            let loader = this._showLoader();
            // get all the cards details
            this.srvOffer.getExistingPaymilCardsDetails().subscribe((data) => {
                console.log("OffersPage::showPaymentOptions() success", data);
                data.response.push({ syndicate: syndicate });
                this.userCards = data.response;
                loader.dismiss();
                this.confirmPayment.togglePopup();
            }, (err) => {
                console.log("OffersPage::showPaymentOptions() error", err);
                loader.dismiss();
            })
        }
    }

    chatNow(i) {
        debugger;
        //  if(this.syndArr[i].peepso_group_id !=0) {
        // let opt: string = "toolbarposition=top";
        // let str = 'https://nima.lottosocial.com/webview-auth/?redirect_to='+this.syndArr[i].peepso_group_url;
        // str += '/&customer_id='+ this.customer_id+'&customer_token=' + this.customerToken ;
        // this.iab.create(str, 'blank', opt);
        //  }

        this.platform.ready().then(() => {
            if (typeof cordova !== 'undefined') {
                const browser = this.iab.create('https://nima.lottosocial.com/webview-auth/?redirect_to=' + this.syndArr[i].peepso_group_url + '&customer_id=' + this.customer_id + '&customer_token=' + this.customerToken + '', '_blank', 'location=no,toolbarposition=top');
                // browser.on("loadstop").
                //     subscribe(
                //     (data) => {
                //         debugger
                //        // alert(data)
                //         browser.insertCSS({ code: "body{background-color:#4286f4!important;}" })
                //     },
                //     err => {
                //         console.log("InAppBrowser Loadstop Event Error: " + err);
                //     });
            }
        });


    }

    addMembers() {
        this.appSound.play('buttonClick');
    }

    private _showLoader() {
        let loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
        });
        loader.present()
        return loader;
    }
    Invite(sid: any) {
        console.log(sid);
        this.app.getRootNav().push(InviteFriendsPage, { sid: sid });
    }


}
