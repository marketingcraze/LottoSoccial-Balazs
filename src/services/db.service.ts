import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseService {

    public static databaseName : string = "lottosocial.db";
    public database : SQLiteObject;
    public tableCount:number = 5;
    public databaseCreated:number = 0;
  
    constructor(private sqlite: SQLite,
        public platform: Platform) {

        // console.log("DatabaseService");
        platform.ready().then(()=> this.createDatabase() );
        
    }

    createDatabase(){
        this.sqlite.create({
            name: DatabaseService.databaseName,
            location: "default"
        }).then(( db: SQLiteObject ) => {
            console.log("database created"); 
            this.database = db;
            // open sqlite database
            this.prepareSqliteDatabase();
        }, (error) => {
            console.error("Unable to open database", error);
        });
    }


    insert(tableName, columnsName, columnsValues:any[]) {

        console.log("INSERT INTO " + tableName 
            + " ( " + columnsName + ") VALUES (" + columnsValues + ")");

        return Observable.create(observer => {

            this.database.executeSql("INSERT INTO " + tableName 
                + " ( " + columnsName + ") VALUES (" + columnsValues + ")", [])
            .then((data) => {
                console.log("INSERTED: " + JSON.stringify(data));
                observer.next(data);
                observer.complete();
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error.err));
                observer.next(error);
                observer.complete();
            });

        });
    }

    update(tableName, columnsNames, columnsValues:any[],
                       whereClause, whereArgs:any[]) {

        console.log("UPDATE " + tableName + columnsNames + " " + whereClause, 
            columnsValues.concat(whereArgs) );

        return Observable.create(observer => {

            this.database.executeSql("UPDATE " + tableName + columnsNames + " " + whereClause, 
                columnsValues.concat(whereArgs) )
            .then((data) => {
                console.log("UPDATED: " + JSON.stringify(data));
                observer.next(data);
                observer.complete();
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error.err));
                observer.next(error);
                observer.complete();
            });
        });
    }

    select(tableName, columnsNames, whereClause, whereArgs:any[]) {

        var query = "SELECT " + columnsNames + " FROM " + tableName + " " + whereClause;

        console.log(query, whereArgs );
        return this.database.executeSql(query, whereArgs )
        .then((data) => {
            console.log("ROWS: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
    }

    raw_query( query:string, params:any[] ) {
        if ( !this.platform.is('cordova') ) {
            return new Promise( (resolve, reject) => {
                resolve({rows:[]});
            });
        }
        
        if (this.databaseCreated >= this.tableCount) {
            console.log( query );
            return this.database.executeSql(query, params );
        }else{
            this.createDatabase();
          
            return new Promise( (resolve, reject) => {

                const source = Observable.interval(400)
                .take(60)
                .subscribe(res => { 
                    console.log("observing ", this.databaseCreated, this.tableCount, res);
                  
                    if (this.databaseCreated >= this.tableCount) {
                        source.unsubscribe();
                        
                        console.log( "executing " + query );
                        this.database.executeSql(query, params ).then( (res) => {
                            console.log( "result ", res );

                            for (var i = 0 ; i < res.rows.length; i++) {
                                console.log("row " + i + ": ", res.rows.item(i) );
                            }
                          resolve( res );
                        }, err => {
                            reject(err);
                        });
                    }

                    if ( res > 58) {
                        reject( Error("Database taking too long to respond") );
                    }
                });

            });
        }
    }

    
    prepareSqliteDatabase(){
        console.log("prepareSqliteDatabase()");

        let tblAppPageCreate = "CREATE TABLE IF NOT EXISTS `tbl_App_Page` ("
        + "`Page_ID` INTEGER PRIMARY KEY,"
        + "`Page_Name` varchar(300) NULL,"
        // + "`Complete_Json_Data` TEXT NULL,"
        // + "`Update` TINYINT NULL,"
        // + "`Status` varchar(25) NULL,"
        // + "`Modified_By` varchar(50) NULL,"
        // + "`Modified_Date` datetime NULL,"
        + "`Date_Created` datetime NULL)";

        this.database.executeSql(tblAppPageCreate, {}).then((data) => {
          this.databaseCreated++;
          // console.log("TABLE Page CREATED: ", this.databaseCreated, tblPageCreate, data);
        }, (error) => {
            console.error("Unable to execute sql", error);
        });


        let tblAppModuleCreate = "CREATE TABLE IF NOT EXISTS `tbl_App_Module` ("
        + "`App_Module_ID` INTEGER PRIMARY KEY AUTOINCREMENT, " 
        // + "`Module_Name` Varchar(100) NULL, "
        // + "`SP_Name` Varchar(100) NULL, "
        + "`Json_Data` TEXT NULL, "
        + "`Expiry_Status` varchar(25) NULL, "
        + "`Modified_By` varchar(50) NULL, "
        + "`Expiry_Date` datetime NULL, "
        + "`Modified_Date` datetime NULL)";

        this.database.executeSql(tblAppModuleCreate, {}).then((data) => {
          this.databaseCreated++;
          // console.log("TABLE Module CREATED: ", this.databaseCreated, tblModuleCreate, data);
        }, (error) => {
          console.error("Unable to execute sql", error);
        });

        let tblAppPageModuleCreate = "CREATE TABLE IF NOT EXISTS `tbl_App_Page_Module` ( "
        + "`Page_Module_ID` INTEGER PRIMARY KEY AUTOINCREMENT,"
        + "`Page_ID` INTEGER NULL,"
        + "`Module_ID` INTEGER NULL,"
        + "`End_Point` varchar(25) NULL,"
        // + "`Status` varchar(25) NULL,"
        // + "`Modified_By` varchar(50) NULL,"
        + "`Modified_Date` datetime NULL,"
        + "`Date_Created` datetime NULL)";
        // + "`Produst_ID` INTEGER NULL,"
        // + "`Offer_ID` INTEGER NULL"
        

        this.database.executeSql(tblAppPageModuleCreate, {}).then((data) => {
          this.databaseCreated++;
          // console.log("TABLE PageModule CREATED: ", this.databaseCreated, tblPageModuleCreate, data);
        }, (error) => {
          console.error("Unable to execute sql", error);
        });
        
        let tblAppReference = "CREATE TABLE IF NOT EXISTS `tbl_App_Reference` ( "
        + "`App_ID` INTEGER PRIMARY KEY,"
        + "`App_Version` varchar(100) NULL,"
        + "`APP_Token` varchar(100) NULL,"
        + "`User_ID` INTEGER NULL,"
        + "`User_Token` varchar(50) NULL)";

        this.database.executeSql(tblAppReference, {}).then((data) => {
            this.databaseCreated++;
            // console.log("TABLE PageModule CREATED: ", this.databaseCreated, tblAppReference, data);
        }, (error) => {
          console.error("Unable to execute sql", error);
        });

        let tblCustomerContactList = "CREATE TABLE IF NOT EXISTS `tbl_Customer_Contact_List` ( "
        + "`Contact_ID` INTEGER PRIMARY KEY,"
        + "`First_Name` varchar(100) NULL,"
        + "`Surname` varchar(100) NULL,"
        + "`Mobile_Number` INTEGER NULL,"
        + "`Selected` INT2 NULL, "
        + "`Date_Created` datetime NULL)";

        this.database.executeSql(tblCustomerContactList, {}).then((data) => {
            this.databaseCreated++;
            // console.log("TABLE PageModule CREATED: ", this.databaseCreated, tblCustomerContactList, data);
        }, (error) => {
          console.error("Unable to execute sql", error);
        });





        // WP REST API tables create
        let tblPageCreate = "CREATE TABLE IF NOT EXISTS `tbl_Page` ("
        + "`Page_ID` INTEGER PRIMARY KEY AUTOINCREMENT,"
        + "`Page_Name` varchar(300) NULL,"
        + "`Complete_Json_Data` TEXT NULL,"
        + "`Update` TINYINT NULL,"
        + "`Status` varchar(25) NULL,"
        + "`Modified_By` varchar(50) NULL,"
        + "`Modified_Date` datetime NULL,"
        + "`Date_Created` datetime NULL)";

        this.database.executeSql(tblPageCreate, {}).then((data) => {
          this.databaseCreated++;
          // console.log("TABLE Page CREATED: ", this.databaseCreated, tblPageCreate, data);
        }, (error) => {
            console.error("Unable to execute sql", error);
        });


        let tblModuleCreate = "CREATE TABLE IF NOT EXISTS `tbl_Module` ("
        + "`Module_ID` INTEGER PRIMARY KEY AUTOINCREMENT, " 
        + "`Module_Name` Varchar(100) NULL, "
        + "`SP_Name` Varchar(100) NULL, "
        + "`Module_Json` TEXT NULL, "
        + "`Status` varchar(25) NULL, "
        + "`Modified_By` varchar(50) NULL, "
        + "`Modified_Date` datetime NULL, "
        + "`Date_Created` datetime NULL)";

        this.database.executeSql(tblModuleCreate, {}).then((data) => {
          this.databaseCreated++;
          // console.log("TABLE Module CREATED: ", this.databaseCreated, tblModuleCreate, data);
        }, (error) => {
          console.error("Unable to execute sql", error);
        });

        let tblPageModuleCreate = "CREATE TABLE IF NOT EXISTS `tbl_Page_Module` ( "
        + "`Page_Module_ID` INTEGER PRIMARY KEY AUTOINCREMENT,"
        + "`Page_ID` INTEGER NULL,"
        + "`Module_ID` INTEGER NULL,"
        + "`Expired` TINYINT NULL,"
        + "`Expire_At` Varchar(50) NULL,"
        + "`Status` varchar(25) NULL,"
        + "`Modified_By` varchar(50) NULL,"
        + "`Modified_Date` datetime NULL,"
        + "`Date_Created` datetime NULL) ";

        this.database.executeSql(tblPageModuleCreate, {}).then((data) => {
          this.databaseCreated++;
          // console.log("TABLE PageModule CREATED: ", this.databaseCreated, tblPageModuleCreate, data);
        }, (error) => {
          console.error("Unable to execute sql", error);
        });

    }


}



