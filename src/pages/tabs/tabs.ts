import { Component } from '@angular/core';
import { NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';

import { StorePage } from '../store/store';
import { SyndicatesPage } from '../syndicates/syndicates';
import { GamesPage } from '../games/games';
import { AccountPage } from '../account/account';
import { OffersPage } from '../offers/offers';


import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = StorePage;
  tab2Root: any = SyndicatesPage;
  tab3Root: any = GamesPage;
  tab4Root: any = AccountPage;
  tab5Root: any = OffersPage;

  mySelectedIndex: number;


  homeCardData:any;
  gameData:any;
  homeData:any;

  constructor(
    private params: Params,
    private navParams: NavParams,
    public platform: Platform, 
    private srvHome:HomeService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {

    console.log("TabsPage");

    this.gameData = "game data";

    this.mySelectedIndex = navParams.data.tabIndex || 0;

    this.initData();
  }


  initData(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.srvHome.getHomeCard().subscribe(
      data=>{
        loader.dismiss();

        if(data) {
          this.homeCardData = data.response[0].get_home_card.response;
          this.gameData = this.homeCardData.game;
          this.homeData = this.homeCardData.information_for_you;
          this.params.setHomeData( this.homeData ); 
          // console.log("HomeCard successful", this.homeCardData);
        }
      },
      err => {
        loader.dismiss();
        console.log("HomeCard error", err);

        this.alertCtrl.create({
          title: 'Error!!!',
          subTitle: 'Internet disabled or server error.',
          buttons: [
          {
            text: 'OK',
            handler: data => {
              this.platform.exitApp();
            }
          }
          ],
          enableBackdropDismiss:false
        });
      },
      ()=> {}
      );
  }

}
