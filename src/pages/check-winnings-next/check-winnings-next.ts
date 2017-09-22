import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { SyndicateService } from '../../providers/syndicate-service';
import { PrizeSummaryWinPage } from '../prize-summary-win/prize-summary-win';
/*
  Generated class for the CheckWinningsNext page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-winnings-next',
  templateUrl: 'check-winnings-next.html'
})
export class CheckWinningsNextPage {
    loader:any;
    sList:any = [];
    sList2:any = [];
    movetype:any;
    errorMsg = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    ) {
        this.loader = this.loadingCtrl.create({
          content:"Please wait..."
        });
    }

  ionViewDidLoad() {
    
    this.checkWinnings();
    console.log('ionViewDidLoad CheckWinningsNextPage');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  checkWinnings(){
    this.loader.present();
    this._syndService.checkWinnings()
    .subscribe((res) => {
      
      // res = {"response":[{"cliamable_syndicates":{"response":{"status":"SUCCESS","message":"","syndicate_group":[{"syndicate_name":"ZURI0865","syndicate_id":2615376},{"syndicate_name":"ZURI0865","syndicate_id":2615376},{"syndicate_name":"ABIE0813","syndicate_id":2615377},{"syndicate_name":"ZURI0143","syndicate_id":2615378},{"syndicate_name":"ZURI0698","syndicate_id":2615379},{"syndicate_name":"ABY033","syndicate_id":2615380},{"syndicate_name":"ZULA092","syndicate_id":2615381},{"syndicate_name":"BRAD0442","syndicate_id":2615382},{"syndicate_name":"ZURI08","syndicate_id":2615383},{"syndicate_name":"ABIA0657","syndicate_id":2615384},{"syndicate_name":"ZURI0378","syndicate_id":2615385},{"syndicate_name":"ABIA0835","syndicate_id":2615386},{"syndicate_name":"ZULA0124","syndicate_id":2615388},{"syndicate_name":"ZULA0124","syndicate_id":2615388},{"syndicate_name":"ZURI0951","syndicate_id":2615389},{"syndicate_name":"ZURI0951","syndicate_id":2615389},{"syndicate_name":"ZULA038","syndicate_id":2615390},{"syndicate_name":"ZULA038","syndicate_id":2615390}]}}}]}
      console.log(res);
      this.sList = res.response["0"].cliamable_syndicates.response.syndicate_group
      if(this.sList) {
          this._syndService.checkwinFinal()
          .subscribe((res)=> {
            this.loader.dismiss();
            this.movetype = res.response["0"].check_mywinnings.response
            console.log('final response');
            console.log(res);
          })
            this.animateSyndicate()
           
      }else {
        this.loader.dismiss();
        this.errorMsg = "There is no syndicate";
      }
    })
  }

  animateSyndicate() {
    if(this.sList2.length != this.sList.length) {
        setTimeout(() => {
          this.sList2.push(this.sList[this.sList2.length])
          this.animateSyndicate();
        }, 2000); 
    } else {
      this.navCtrl.push(PrizeSummaryWinPage);
      if(this.movetype){
        
        if(this.movetype.response_type == '10.1'){
          
        }else if(this.movetype.response_type == '10.2') {

        } else if(this.movetype.response_type == '10.4' || this.movetype.response_type == '10.7') {

        } 
      }
      
    }
  }

}
