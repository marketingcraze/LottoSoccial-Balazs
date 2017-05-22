import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseService {

    public static databaseName : string = "lottosocial.db";
    public database : SQLiteObject;
    public tableCount:number = 3;
    public databaseCreated:number = 0;
  
    constructor(private sqlite: SQLite,
        public platform: Platform) {

        console.log("DatabaseService");
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



