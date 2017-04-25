import { Component } from '@angular/core';
import { NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';

import { StorePage } from '../store/store';
import { SyndicatesPage } from '../syndicates/syndicates';
import { GamesPage } from '../games/games';
import { AccountPage } from '../account/account';
import { OffersPage } from '../offers/offers';


import { Params } from '../../services/params';
import { HomeService } from '../../services/service.home';
import { DatabaseService } from '../../services/db.service';

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
    private srvDb:DatabaseService,
    private srvHome:HomeService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {

    console.log("TabsPage");

    this.gameData = "game data";

    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad(){
    console.log("TabsPage::ionViewDidLoad");
  }

  ionViewDidEnter() {
    this.initData();
  }


  initData(){
    console.log("initData", this.platform.is('cordova'));

    // fetching data start 
    let page_id = "1";
    let module_name = "get_home_card";

    if (!this.platform.is('cordova')) {
      this.loadHomeCard(page_id, module_name);
      return;
    }

    let sel_query = "SELECT t2.Module_Json FROM tbl_Page_Module as t1 JOIN tbl_Module as t2 ";
    sel_query += "on (t1.Module_ID = t2.Module_ID) where t2.Module_Json !='' AND t1.Page_ID=? ";
    sel_query += "AND t2.Module_Name = ?";

    this.srvDb.raw_query(sel_query, [page_id, module_name]).then((res)=> {

        if (res.rows.length > 0) {
          let data=[];
          // for (var i = 0 ; i < res.rows.length; i++) {
            let resp_data = {module_id:res.rows.item(0).Module_Json};//data.push(obj);
            
            this.homeCardData = JSON.parse(resp_data.module_id);
            this.gameData = this.homeCardData.game;
            this.homeData = this.homeCardData.information_for_you;
            this.params.setHomeData( this.homeData ); 
            console.log(module_name + " local data ", this.homeCardData);
          // }
          
        } else {
            // Fetch the Data from Remote API Start
            this.loadHomeCard(page_id, module_name);
        }

      }, err =>{
          console.log( module_name + " local db error ", err);
      }
    );
  }

  loadHomeCard(pageId:string, moduleName:string){
    console.log("loadHomeCard", moduleName);

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.srvHome.getHomeCard( moduleName ).subscribe(
    data=>{
      loader.dismiss();

      if(data) {
        console.log("HomeCard successful", data);

        this.homeCardData = data.response[0].get_home_card.response;
        this.gameData = this.homeCardData.game;
        this.homeData = this.homeCardData.information_for_you;
        this.params.setHomeData( this.homeData ); 
        
        // Fetch the Data from Remote API End
        // Insert the remote response into local db
        this.cacheFetchedData(pageId, moduleName, this.homeCardData);
      }
    }, err => {

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


  cacheFetchedData( page_id:string, moduleName:string, fetchedData ){
    console.log("cacheFetchedData", fetchedData);

    let module_json:any = fetchedData;
    let result_page_id:number = -1;
    let result_module_id:number = -1;
    
    // 1.tbl_Page 
    var insert_query = "INSERT INTO tbl_Page(`Page_ID`,`Complete_Json_Data`,`Status`,`Date_Created`) VALUES(?,?,?,?); ";
    this.srvDb.raw_query( insert_query, [page_id, JSON.stringify( fetchedData ) , 'active', new Date()]).then((result)=> {
        console.log("INSERT ID -> ", result );
        result_page_id = result.insertId;

        // 2.tbl_module 
        insert_query = "INSERT INTO tbl_Module(`Module_Name`,`Module_Json`,`Status`,`Date_Created`) VALUES(?,?,?,?); ";
        this.srvDb.raw_query( insert_query, [moduleName, JSON.stringify( module_json ), 'active', new Date()]).then((result)=> {
            console.log("INSERT ID -> ", result );
            result_module_id = result.insertId;

            // 3.tbl_Page_Module 
            insert_query = "INSERT INTO tbl_Page_Module(`Page_ID`,`Module_ID`,`Status`,`Date_Created`) VALUES(?,?,?,?); ";    
            this.srvDb.raw_query( insert_query, [result_page_id, result_module_id, 'active', new Date()]).then((result)=> {
                  console.log("INSERT ID -> ", result);
              }, (error)=> {
                  console.error(error);
              });

        }, (error)=> {
            console.error(error);
        });
    }, (error)=> {
        console.error(error);
    });
    
  }

}
