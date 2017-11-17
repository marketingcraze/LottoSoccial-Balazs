import { Component, ViewChild, ChangeDetectorRef,OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, Platform, Content, Tabs } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { getGamesModal } from '../../pages/get-games-modal/get-games-modal';
import { referFriend } from '../refer-friend-page/refer-friend-page';
import { SocialSharing } from '@ionic-native/social-sharing';
import { gameBlog } from './game-blog/game-blog'

/*
  Generated class for the RedeemGames page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var webengage:any;
@Component({
  selector: 'page-redeem-games',
  templateUrl: 'redeem-games.html'
})
export class RedeemGamesPage implements OnInit {
  @ViewChild(Content) content: Content;
  redeem_products: any;
  sliderImage: any;
  private loading: any;
  scrollContent: any;
  reward_point: number;
  point_status: any;
  downShowing = 0;
  down_arrow_showing = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private share: SocialSharing,
    private platform: Platform,
    public appSound: AppSoundProvider,
    public authSrv: AuthService,
    private loadingCtrl: LoadingController,
    public modalController: ModalController,
    public cdRef: ChangeDetectorRef) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeemGamesPage');
  }
  ngOnInit(): void {
    this.platform.ready().then((readySource) => {
      var CurrentUserid = localStorage.getItem('appCurrentUserid');
      if (this.platform.is('cordova')) {
        webengage.engage();
        webengage.track('Play Game Page', {
          "UserId": CurrentUserid,
        });
        webengage.screen("GetGamesPage")
        webengage.notification.onDismiss((inAppData)=> {
       });
      }
    });
  }


  scrollHandlerListGames(event) {
    var scrollDiv = document.getElementById('reddemReGamesContent').clientHeight;
    var innerDiv = document.getElementById('innerReddemGames1').scrollHeight;

    var valu = scrollDiv + this.content.scrollTop
    console.log("data is ", valu, innerDiv, scrollDiv)
    if (valu > innerDiv + 200) {
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

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
    this.loading.present().then(() => {
      this.authSrv.redeem_game().subscribe(
        data => {
          debugger;
          this.redeem_products = data.response[1].get_buy_game_list.response.redeem_products;
          this.sliderImage = data.response[0].get_your_game_list.response.game_slider;
          this.reward_point = parseInt(data.response.response.reward_points_balance);
          console.log("redeem game", data.response);
          this.loading.dismiss();   // Hide the message when the data is ready 
          var a = localStorage.getItem("redeemP")
          if (localStorage.getItem("redeemP") == undefined || localStorage.getItem("redeemP") == null) {
            this.down_arrow_showing = 1
          }
          else {
            this.down_arrow_showing = 0
          }
          localStorage.setItem("redeemP", "1")
          this.content.enableScrollListener();
        },
        err => {
          console.log("error", err);
        },
        () => console.log("redeem games  get sucesss")
      );

    });
  }
  redeem(url, index) {
    this.scrollContent = document.querySelector('.scroll-content');
    this.scrollContent.style['overflow'] = 'hidden';

    this.appSound.play('buttonClick');
    console.log(url);
    console.log("first index is " + index)
    if (this.reward_point < this.redeem_products[index].product_price) {
      this.point_status = "Failed"
    }
    else {
      this.point_status = "Passed"
    }
    let modal = this.modalController.create(getGamesModal, {
      VoucherCode: this.redeem_products[index].product_image,
      title: this.redeem_products[index].product_title,
      price: this.redeem_products[index].product_price,
      price_after: this.redeem_products[index].product_price_after,
      p_staus: this.point_status,
      p_name:this.redeem_products[index].product_name,
      p_detail:this.redeem_products[index].product_details,
      p_award_id:this.redeem_products[index].award_id,
      cBalance:this.reward_point
    })

    modal.present();
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        debugger;
        this.scrollContent = document.querySelector('.scroll-content');
        this.scrollContent.style['overflow'] = 'none';
      }
    })

  }
  confirmSelectionPage(index) {
    this.scrollContent = document.querySelector('.scroll-content');
    this.scrollContent.style['overflow'] = 'hidden';

    if (this.reward_point < this.redeem_products[index].product_price) {
      this.point_status = "Failed"
    }
    else {
      this.point_status = "Passed"
    }

    console.log("index is " + index)
    let modal = this.modalController.create(getGamesModal, {
      VoucherCode: "assets/img/sample_thumb_03@3x.png",
      title: "Lucky colors",
      price: "70",
      price_after: "POINTS",
      p_staus: this.point_status,


    })
    modal.present();
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.scrollContent = document.querySelector('.scroll-content');
        this.scrollContent.style['overflow'] = 'none';
      }
    })

  }
  mgmPage() {
    let mgmModal = this.modalController.create(referFriend);
    mgmModal.present();
  }
  openShare() {
    if (this.platform.is('cordova')) {
      this.share.share("demo message", "Demo subject", "", "Demo data").
        then(() => {

        }).catch(() => {

        });
    }
  }
  openGameBlog(index:any) {
    let modal = this.modalController.create(gameBlog,{redeem_products_blog: this.redeem_products[index].blog_content});
    modal.present();
  }

}
