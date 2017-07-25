import { Platform, AlertController } from 'ionic-angular';
import { HomeService } from './service.home';
import { DatabaseService } from './db.service';

export class ApiController {

    private expiresInSeconds:number = 300;

    constructor(public platform: Platform, 
        private srvDb:DatabaseService,
        private srvHome:HomeService,
        public alertCtrl:AlertController) {
        
        console.log("ApiController");
    }

    loadModules(action:string, page_id:string, module_names:string[]):Promise<any[]>{

        // have to convert module names to module ids
        if (!this.platform.is('cordova')) {
            return this.fetchModuleDataFromAPI(action, page_id, module_names );
        }

        let early = new Date();
        early.setSeconds( early.getSeconds() + this.expiresInSeconds);

        let sel_query = "SELECT t2.Json_Data FROM tbl_App_Page_Module as t1 JOIN tbl_App_Module as t2 ";
        sel_query += "on (t1.Module_ID = t2.App_Module_ID) where t2.Json_Data !='' AND t2.Modified_Date <=? ";
        sel_query += "AND t2.App_Module_ID IN (?)";

        return new Promise( (resolve, reject) => {

            this.srvDb.raw_query(sel_query, [early, module_names.join(",") ]).then((res:any)=> {

                // console.log("local data", res);
                if (res && res.rows.length > 0) {
                    let data:any[] = [];
                    for (var i = 0 ; i < res.rows.length; i++) {
                        data.push( JSON.parse( res.rows.item(i).Module_Json) );
                    }
                    resolve(data);
                    
                } else {
                    console.log("fetching remote data");
                    // Fetch the Data from Remote API Start
                     this.fetchModuleDataFromAPI(action, page_id, module_names).then( data =>{
                         resolve(data);
                     }, err => {
                         reject(err);
                     });
                }

            }, err =>{
                console.log( module_names + " local db error ", err);
            });
        });
    }


    fetchModuleDataFromAPI(action:string, pageId:string, moduleNames:string[]):Promise<any>{
        console.log("loadHomeCard", moduleNames);
        return new Promise( (resolve, reject) => {

            this.srvHome.getModules( action, pageId, moduleNames ).subscribe(
            (data:any)=>{
                // console.log("fetchModuleDataFromAPI successful", data);
                if(data) {
                    
                    resolve(data.response);
                    // Fetch the Data from Remote API End
                    // Insert the remote response into local db
                    this.cacheFetchedData(pageId, "page_name", moduleNames, data.response);
                }else{
                    reject(Error("Data not found"));
                }

            }, err => {

                console.log("error on " + action, err);

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
                reject(err);

            }, ()=> {}
            );

        });
        
    }

    cacheFetchedData( page_id:string, page_name:string, moduleName:string[], fetchedData:any[] ){
        console.log("cacheFetchedData", moduleName, fetchedData);

        let module_json:any = fetchedData;
        let result_page_id:number = -1;
        let expiresIn = new Date();
        expiresIn.setSeconds( expiresIn.getSeconds() + this.expiresInSeconds);
        
        // 1.tbl_App_Page 
        var insert_query = "INSERT OR REPLACE INTO tbl_App_Page(`Page_ID`,`Page_Name`,`Date_Created`) ";
        insert_query += "VALUES(?,?,?); ";

        this.srvDb.raw_query( insert_query, [page_id, page_name, new Date()]).then((page_result:any)=> {
            console.log("INSERT ID -> ", page_result );
            if (!page_result) {
                return;
            }
            result_page_id = page_result.insertId;

            // 2.tbl_App_Module 
            for (var i = 0; i < moduleName.length; ++i) {
                insert_query = "INSERT OR REPLACE INTO tbl_App_Module(`App_Module_ID`,`Json_Data`,`Expiry_Status`,`Expiry_Date`,`Modified_Date`) VALUES(?,?,?,?,?); ";
                this.srvDb.raw_query( insert_query, [moduleName[i], JSON.stringify( module_json[i] ), 'active', expiresIn, new Date()]).then((module_result:any)=> {
                    console.log("INSERT ID -> ", module_result );
                    
                    // 3.tbl_App_Page_Module 
                    insert_query = "INSERT OR REPLACE INTO tbl_App_Page_Module(`Page_ID`,`Module_ID`,`End_Point`,`Date_Created`) VALUES(?,?,?,?); ";    
                    this.srvDb.raw_query( insert_query, [result_page_id, module_result.insertId, 'active', new Date()]).then((result:any)=> {
                          console.log("INSERT ID -> ", result);
                      }, (error)=> {
                          console.error(error);
                      });

                }, (error)=> {
                    console.error(error);
                });

            }
            
        }, (error)=> {
            console.error(error);
        });

    }

    clearDatabaseOnLogout(){
        console.log("ApiController::clearDatabaseOnLogout ");

        // delete tbl_App_Page table data
        let delete_page = "DELETE FROM tbl_App_Page;";
        this.srvDb.raw_query( delete_page, []).then((page_result:any)=> {
            // console.log("clearDatabaseOnLogout SUCCESS ", page_result );
        }, (error)=> {
            console.error(error);
        });

        let delete_module = "DELETE FROM tbl_App_Module; ";
        this.srvDb.raw_query( delete_module, []).then((module_result:any)=> {
            // console.log("clearDatabaseOnLogout SUCCESS ", module_result );
        }, (error)=> {
            console.error(error);
        });

        // delete tbl_App_Page_Module data
        let delete_page_module = "DELETE FROM tbl_App_Page_Module; ";    
        this.srvDb.raw_query( delete_page_module, []).then((result:any)=> {
            // console.log("clearDatabaseOnLogout SUCCESS ", result);
        }, (error)=> {
            console.error(error);
        });
    }


}