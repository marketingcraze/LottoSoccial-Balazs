import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
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
  private loading : any;
  reward_point:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authSrv:AuthService,private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeemGamesPage');
  }

  ionViewWillEnter() {
     this.loading = this.loadingCtrl.create();
     this.loading.present().then(() => {
         this.authSrv.redeem_game().subscribe(
            data=>{
                   this.redeem_products=data.response[1].get_buy_game_list.response.redeem_products;
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
   redeem(url){
     console.log(url);
    }
}
