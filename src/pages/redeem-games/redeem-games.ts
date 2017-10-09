import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController,Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';
import { getGamesModal } from '../../pages/get-games-modal/get-games-modal';
import { referFriend } from '../refer-friend-page/refer-friend-page';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the RedeemGames page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-redeem-games',
  templateUrl: 'redeem-games.html'
})
export class RedeemGamesPage {
  redeem_products:any;
  sliderImage:any;
  private loading : any;
  scrollContent:any;
  reward_point:number;
  point_status:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private share: SocialSharing,
    private platform:Platform,
    public appSound:AppSoundProvider,
    public authSrv:AuthService,private loadingCtrl: LoadingController,public modalController:ModalController ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeemGamesPage');
  }

  ionViewWillEnter() {
     this.loading = this.loadingCtrl.create();
     this.loading.present().then(() => {
         this.authSrv.redeem_game().subscribe(
            data=>{
                   this.redeem_products=data.response[1].get_buy_game_list.response.redeem_products;
                   this.sliderImage=data.response[0].get_your_game_list.response.game_slider;
                   this.reward_point=data.response.response.reward_points_balance;
                   console.log("redeem game",data.response);
                   this.loading.dismiss();   // Hide the message when the data is ready 
             },
             err=>{ 
                     console.log("error", err);
             },
             ()=> console.log("redeem games  get sucesss")
         );
   
     });
   }   
   redeem(url,index){
    this.scrollContent=document.querySelector('.scroll-content');
    this.scrollContent.style['overflow']='auto';

     this.appSound.play('buttonClick');
     console.log(url);
     console.log("first index is " + index)
     if(this.reward_point < this.redeem_products[index].product_price){
      this.point_status = "Failed"
     }
     else{
      this.point_status = "Passed"
     }
      let modal = this.modalController.create(getGamesModal, {
      VoucherCode: this.redeem_products[index].product_image,
      title: this.redeem_products[index].product_title,
      price: this.redeem_products[index].product_price,
      price_after: this.redeem_products[index].product_price_after,
      p_staus: this.point_status
    })
    
    modal.present();
    modal.onDidDismiss((data: any[]) => {
			if (data) {
			 this.scrollContent=document.querySelector('.scroll-content');
			 this.scrollContent.style['overflow']='hidden';
			}
		})

    }
    confirmSelectionPage(index){
      this.scrollContent=document.querySelector('.scroll-content');
      this.scrollContent.style['-webkit-overflow-scrolling']='auto';

      if(this.reward_point < this.redeem_products[index].product_price){
        this.point_status = "Failed"
       }
       else{
        this.point_status = "Passed"
       }
       
      console.log("index is " + index)
       let modal = this.modalController.create(getGamesModal, {
      VoucherCode: "assets/img/sample_thumb_03@3x.png",
      title: "Lucky colors",
      price:"70",
      price_after: "POINTS",
      p_staus: this.point_status

    })
    modal.present();
    modal.onDidDismiss((data: any[]) => {
			if (data) {
			 this.scrollContent=document.querySelector('.scroll-content');
			 this.scrollContent.style['-webkit-overflow-scrolling']='initial';
			}
		})

    }
    mgmPage(){
      let mgmModal=this.modalController.create(referFriend);
      mgmModal.present();
    }
    openShare(){
      if (this.platform.is('cordova')) {
      this.share.share("demo message", "Demo subject", "", "Demo data").
      then(() => {
      // Success!
      }).catch(() => {
      // Error!
      });
    }
  }
}
