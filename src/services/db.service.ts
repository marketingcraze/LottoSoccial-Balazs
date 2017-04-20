// app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseService {

    public database : SQLiteObject;
  
    constructor(private sqlite: SQLite,) {

        this.sqlite.create({
          name: "lottosocial.db",
          location: "default"
        }).then(( db: SQLiteObject ) => {
            this.database = db;
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

        return Observable.create(observer => {

            this.database.executeSql(query, whereArgs )
            .then((data) => {
                console.log("ROWS: " + JSON.stringify(data));

                observer.next(data);
                observer.complete();

            }, (error) => {
                
                console.log("ERROR: " + JSON.stringify(error.err));
                observer.next(error);
                observer.complete();

            });
        });
    }

    raw_query( query:string ) {

        console.log( query );

        return Observable.create(observer => {

            this.database.executeSql(query, [] )
            .then((data) => {
                console.log("RESULT: " + JSON.stringify(data));

                observer.next(data);
                observer.complete();

            }, (error) => {

                console.log("ERROR: " + JSON.stringify(error.err));
                observer.next(error);
                observer.complete();

            });
        });
    }

    
    
    
}



