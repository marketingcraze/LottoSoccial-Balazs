import { Component, ViewChild, NgZone, OnInit } from '@angular/core';
import {
    Platform, MenuController, Nav, NavController, LoadingController,
    AlertController, ModalController, ItemSliding, Item
} from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { CheckWinningsPage } from '../check-winnings/check-winnings'
import { AccountPage } from '../account/account';
import { UpdatePage } from '../update/update';
import { BadgesPage } from '../badges/badges';
import { inboxModal } from '../inbox-popup/inbox-popup';
import { referFriend } from '../refer-friend-page/refer-friend-page';

import { Badge } from '@ionic-native/badge';
import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';
import { CommonService } from '../../services/common.service';
import { CacheController } from '../../services/cache_controller';
import { AppVersion } from '@ionic-native/app-version';
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

import { TabsPage } from '../tabs/tabs';
import { CusHeaderComponent } from '../../components/cus-header/cus-header';
import { your_vouchers } from '../your_vouchers/your_vouchers';
import { AffiliatePage } from '../affiliate/affiliate'
import { HelpPage } from '../Help/Help'
import { NewSyndicatePage } from '../new-syndicate/new-syndicate'
import { AffiliatePage2 } from '../affiliate2/affiliate2'
import { prizeBreakdownPage } from '../prize-breakdown/prize-breakdown';

declare var webengage: any;
export interface PageInterface {
    title: string;
    component: any;
    icon: string;
    index?: number;
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    @ViewChild('btn-unread') btnRead: any;
    @ViewChild('slidingItem') slideItm: ItemSliding;
    @ViewChild('item') Itm: Item;
    versionNumber: Promise<any>;
    accountDetails: any;

    ngOnInit(): void {

        this.platform.ready().then((readySource) => {


            var CurrentUserid = localStorage.getItem('appCurrentUserid');
            if (this.platform.is('cordova')) {
                webengage.engage();
                webengage.track('Home Page', {
                    "UserId": CurrentUserid,
                });
                webengage.screen("HomePage")
                webengage.notification.onDismiss((inAppData) => {
                });
                webengage.engage();
            }
        });

    }

    @ViewChild(Nav) nav: Nav;
    @ViewChild("messageDetails") messageDetails;

    private cache: CacheController;
    image_Data: any;
    rootPage: any = TabsPage;
    messageLoading = false;
    imageUpdate: string = ""

    private homeMessage: any;
    public messages: any[] = [];

    constructor(
        public zone: NgZone,
        public params: Params,
        public badge: Badge,
        // public cusHeader: CusHeaderComponent,
        private iab: InAppBrowser,
        private appVersion: AppVersion,
        public platform: Platform,
        private srvHome: HomeService,
        public menu: MenuController,
        // public itemSlide: ItemSliding,
        private navCtrl: NavController,
        private srvDb: DatabaseService,
        private commonSrv: CommonService,
        public appSound: AppSoundProvider,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private _modalCtrl: ModalController,

    ) {
        this.cache = new CacheController(params, platform, srvDb, srvHome, alertCtrl);
        /*
                platform.ready().then(() => {
                    StatusBar.styleDefault();
                    Splashscreen.hide();
                });
        
        */


        this.params.events.subscribe('home-data', data => {
            // debugger
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i].get_home_message) {
                    this.homeMessage = data[i].get_home_message.response;
                    if (this.homeMessage.notification) {
                        // this.messages = this.homeMessage.notification;
                    }
                    params.setUnreadCount(this.homeMessage.count);
                }
                else if (data[i].get_account_details) {
                    // debugger
                    this.accountDetails = data[i].get_account_details.response;
                    if (this.accountDetails.profile_image && this.accountDetails.profile_image != "null") {
                        var str = this.accountDetails.profile_image
                        this.imageUpdate = this.accountDetails.profile_image
                        console.log("last character is ", str.charAt(str.length - 1))
                        if (str.charAt(str.length - 1) == ".") {
                            str = str.substring(0, str.length - 1);
                            this.image_Data = str
                        }

                        if (localStorage.getItem("imageUrl")) {
                            this.image_Data = localStorage.getItem("imageUrl")
                        }
                        else {

                            this.image_Data = str
                        }
                    }
                    else {
                        if (localStorage.getItem("imageUrl")) {
                            this.image_Data = localStorage.getItem("imageUrl")
                        } else {
                            this.image_Data = "assets/icon/user.svg"
                        }
                    }




                }
            }
            console.log("HomePage::home data", this.homeMessage, this.messages);
        });

        this.checkForNewRelease()
    }
    ionViewDidEnter() {
        if (this.messageDetails) {
            this.messageDetails.togglePopup();
        }

        /*
        this.menu.swipeEnable(false, 'menu1');

        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        
        this.cache.loadModules("home", "1", ["get_home_message"])
        .then( data => {
          loader.dismiss();
          console.log("HomePage::ionViewDidEnter", data);

          
          for (var i = data.length - 1; i >= 0; i--) {
            if ( data[i].get_home_message ) {

              console.log("HomePage::ionViewDidEnter", i, data[i].get_home_message.response);
              break;
            }
          }
        }, err => {
          loader.dismiss();
          console.log("TabsPage::ionViewDidEnter", err);
        });*/
    }
    ionViewWillEnter() {
        console.log("ionViewWillEnter in home page")
        this.commonSrv.trackSegmentPage("Home", "HomePage").subscribe(
            data => {
                console.log("track segment called");
            },
            err => {
            },
            () => { }
        );
    }

    closeMenu1() {
        this.menu.close();
        if (localStorage.getItem("imageUrl")) {
            this.image_Data = localStorage.getItem("imageUrl")
        }
        this.srvHome.getHomeMessages().take(1).subscribe((data) => {
            this.zone.run(() => {
                this.homeMessage = data.response[0].get_home_message.response;
                this.params.setUnreadCount(this.homeMessage.notification.length);
            });

        }, (err) => {
            console.log("onOpenRightMenu error ", err);
        })


    }

    onLeftMenuSelection(selection) {
        console.log("HomePage::onLeftMenuSelection");
        this.appSound.play('menuClick');
        this.menu.close();
        debugger
        switch (selection) {
            case 'accounts':
                this.params.goPage(AccountPage)
                break
            case 'check_winnings':
                this.params.goPage(CheckWinningsPage)
                break
            case 'your_badges':
                this.params.goPage(BadgesPage)
                break
            case 'your_vouchers':
                this.params.goPage(your_vouchers)
                break
            case 'affiliate':
                this.params.goPage(AffiliatePage)
                break
            case 'pSyndicate':
                this.params.goPage(NewSyndicatePage)
                break
            case 'update':
                this.params.goPage(UpdatePage)
                break
            case 'affiliate2':
                this.params.goPage(AffiliatePage2)
                break
            case 'prizeBreak':
                this.params.goPage(prizeBreakdownPage)
                break
            case 'help':
                this.params.goPage(HelpPage)
                //   let opt:string = "toolbarposition=top";
                // this.iab.create('https://help.lotto-social.com/hc/en-us', 'blank', opt);
                break
        }
    }

    openPage(page: PageInterface) {
        this.menu.close();

        if (page.index) {
            this.nav.setRoot(page.component, { tabIndex: page.index });
        } else {
            this.nav.setRoot(page.component).catch(() => {
                console.log("Didn't set nav root");
            });
        }
    }
    goPage(page) {
        this.menu.close();

        switch (page) {
            case 'create_syndicate':
                this.nav.setRoot(CreateSyndicatePage);
                break;

            default:
                // code...
                break;
        }

    }

    // notification menu
    onOpenRightMenu() {
        this.appSound.play('menuClick');
        this.zone.run(() => {
            this.messageLoading = true;
        });
        this.srvHome.getHomeMessages().take(1).subscribe((data) => {
            console.log("onOpenRightMenu success ", data);
            this.zone.run(() => {
                this.appSound.play('inbox');
                var items: ItemSliding
                this.messageLoading = false;
                this.homeMessage = data.response[0].get_home_message.response;
                this.messages = this.homeMessage.notification;
                this.params.setUnreadCount(this.homeMessage.notification.length);
                if (this.homeMessage.count > 0) {
                    setTimeout(() => {
                        this.slideItm.setElementClass("active-sliding", true);
                        this.slideItm.setElementClass("active-slide", true);
                        this.slideItm.setElementClass("active-options-right", true);
                        this.Itm.setElementStyle("transform", "translate3d(-140px, 0px, 0px)");
                    }, 1000);
                    setTimeout(() => {
                        this.slideItm.close();
                    }, 4000);
                }
            });

        }, (err) => {
            console.log("onOpenRightMenu error ", err);
        })
    }


    // open(itemSlide: ItemSliding, item: Item) {
    //     debugger
    //     // reproduce the slide on the click
    //     itemSlide.setElementClass("active-sliding", true);
    //     itemSlide.setElementClass("active-slide", true);
    //     itemSlide.setElementClass("active-options-right", true);
    //     item.setElementStyle("transform", "translate3d(-140px, 0px, 0px)");
    // }


    checkForNewRelease() {
        this.commonSrv.getNewRelease().subscribe(data => {
            console.log("checkForNewRelease", data);

            if (data.response) {
                let response = data.response[0].get_new_release.response;
                if (response && response.status == 'success') {
                    CommonService.updateAvailable = true;
                    // show update
                    this.rootPage = UpdatePage
                }
            }

            Splashscreen.hide();
        },
            err => {
                // show offline
                this.params.setIsInternetAvailable(false);
            },
            () => { });
    }

    onOpenLeftMenu() {
        this.appSound.play('menuClick');
        if (localStorage.getItem("imageUrl")) {
            this.image_Data = localStorage.getItem("imageUrl")
        }
        else if (this.imageUpdate != "") {
            this.image_Data = this.imageUpdate
        }
        else {
            this.image_Data = "assets/icon/user.svg"
        }
    }

    markAsRead(cardId: any, index) {
        this.appSound.play('buttonClick');
        var btn = document.getElementById('btnRead' + index).style.backgroundColor = 'gray'
        this.srvHome.markAsRead(cardId).subscribe((data) => {
            if (data) {
                if (data.response[0].mark_home_inbox_message.response.status == 'SUCCESS') {
                    console.log("msg read")
                }
            }
        })

    }

    deleteNotification(cardId: any, index) {
        this.appSound.play('buttonClick');
        this.srvHome.deleteMsg(cardId).subscribe((data) => {
            if (data) {
                if (data.response[0].delete_home_inbox_message.response.status == 'SUCCESS') {
                    alert("Message deleted")
                    document.getElementById("delete" + index).style.display = 'none';
                }
            }
        }), (Err) => {
            this.appSound.play('Error');
            alert("Error occured")
        }
    }

    saveItem() {
        console.log("saveItem()");
    }
    alert(i: any) {
        this.appSound.play('buttonClick');
        let inboxPopup = this._modalCtrl.create(inboxModal, { CurrentMessage: this.messages[i] });
        inboxPopup.present();
    }
    mgmPage() {
        this.appSound.play('buttonClick');
        let mgmModal = this._modalCtrl.create(referFriend);
        mgmModal.present();
    }
}

