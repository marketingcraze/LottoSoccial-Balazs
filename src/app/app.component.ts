import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { JoinSyndicatePage } from '../pages/join-syndicate/join-syndicate';
import { NewSyndicatePage } from '../pages/new-syndicate/new-syndicate';
import { AddSyndicatePage } from '../pages/add-syndicate/add-syndicate';
import { SignupInvitedPage } from '../pages/signup-invited/signup-invited';
import { AuthPage } from '../pages/auth/auth';

import { Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CommonService } from '../services/common.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;
  // rootPage:any = NewSyndicatePage;
  // rootPage:any = AddSyndicatePage;
  // rootPage:any = HomePage;
  // rootPage:any = AuthPage;

  constructor(
    private storage: Storage,
    public platform: Platform, 
    private sqlite: SQLite,
    public commonSrv:CommonService, 
    public secureStorage: SecureStorage,
    public alertCtrl:AlertController) {

    platform.ready().then(() => {
      // StatusBar.styleDefault();
      StatusBar.hide();

      // check if logged in
      this.isLoggedIn();

      // open sqlite database
      this.prepareSqliteDatabase();

    });
  }

  isLoggedIn(){
    console.log("is cordova", this.platform.is('cordova') );

    if (this.platform.is('cordova')) {
      this.secureStorage.create(CommonService.SecureStorageUser)
      .then((storageObject: SecureStorageObject) => {
        storageObject.get('session')
        .then(
          data => { 
            console.log(data);
            this.rootPage = HomePage;
          },
          error => console.log(error)
        );
      });
    }else{
      this.storage.ready().then( ()=> {
        this.storage.get('session').then((val) => {
          console.log('Your session is', val);
          if (val) {
            this.rootPage = HomePage;
          }else{
            this.loadCountries();
          }
        });
      });
    }
  }


  prepareSqliteDatabase(){

    if ( !this.platform.is('cordova') ) {
      console.log("Unable to open database cordova_not_available");
      return;
    }
 
    this.sqlite.create({
      name: "lottosocial.db",
      location: "default"
    }).then(( db: SQLiteObject ) => {


      let tblPageCreate = "CREATE TABLE IF NOT EXISTS `tbl_Page` (" 
      + "`Page_ID` INTEGER PRIMARY KEY AUTOINCREMENT,"
      + "`Page_Name` varchar(300) NULL,"
      + "`Complete_Json_Data` TEXT NULL,"
      + "`Update` TINYINT NULL,"
      + "`Status` varchar(25) NULL,"
      + "`Modified_By` varchar(50) NULL,"
      + "`Modified_Date` datetime NULL,"
      + "`Date_Created` datetime NULL )";

      db.executeSql(tblPageCreate, {}).then((data) => {
          console.log("TABLE Page CREATED: ", data);
      }, (error) => {
          console.error("Unable to execute sql", error);
      });


      let tblModuleCreate = "CREATE TABLE IF NOT EXISTS `tbl_Module` ("
      + "`Module_ID` INTEGER PRIMARY KEY AUTOINCREMENT ,  "
      + "`SP_Name` Varchar(100) NULL,"
      + "`Module_Json` TEXT NULL,"
      + "`Status` varchar(25) NULL,"
      + "`Modified_By` varchar(50) NULL,"
      + "`Modified_Date` datetime NULL,"
      + "`Date_Created` datetime NULL )";

      db.executeSql(tblModuleCreate, {}).then((data) => {
          console.log("TABLE Module CREATED: ", data);
      }, (error) => {
          console.error("Unable to execute sql", error);
      });

      let tblPageModuleCreate = "CREATE TABLE IF NOT EXISTS `tbl_Page_Module` ("
      + "`Page_Module_ID` INTEGER PRIMARY KEY AUTOINCREMENT,"
      + "`Page_ID` INTEGER NULL,"
      + "`Module_ID` INTEGER NULL,"
      + "`Expired` TINYINT NULL,"
      + "`Expire_At` Varchar(50) NULL,"
      + "`Status` varchar(25) NULL,"
      + "`Modified_By` varchar(50) NULL,"
      + "`Modified_Date` datetime NULL,"
      + "`Date_Created` datetime NULL)";

      db.executeSql(tblModuleCreate, {}).then((data) => {
          console.log("TABLE PageModule CREATED: ", data);
      }, (error) => {
          console.error("Unable to execute sql", error);
      });



    }, (error) => {
        console.error("Unable to open database", error);
    });
  }



  loadCountries(){
    this.commonSrv.getCountry().subscribe(
      data=>{
        if(data) {
          CommonService.countries = data;
        }
        
        console.log("countries loaded", CommonService.countries);
        Splashscreen.hide();
      },
      err=>{
        let alert = this.alertCtrl.create({
            title: 'Error!!!',
            subTitle: 'Internet disabled or server error.',
            enableBackdropDismiss:false,
            buttons: [
            {
              text: 'OK',
              handler: (data) => {
                  this.platform.exitApp();
              }
            }]
        });
        // alert.present();
      },
      ()=> {});
  }

}
