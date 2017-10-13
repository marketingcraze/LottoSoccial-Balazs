import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, ViewController,LoadingController } from 'ionic-angular';
import { CheckWinningsNextPage } from '../check-winnings-next/check-winnings-next';
import { SyndicateService } from '../../providers/syndicate-service';
import { Content } from 'ionic-angular'
/*
  Generated class for the CheckWinnings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-winnings',
  templateUrl: 'check-winnings.html'
})
export class CheckWinningsPage {
  @ViewChild(Content) content: Content;
  private myWinnings:any = [];
  loader:any; 
  downShowing = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public app: App, 
    public viewCtrl: ViewController,
    public _syndService: SyndicateService,
    public loadingCtrl: LoadingController,
    public cdRef: ChangeDetectorRef
    ) {
      this.loader = this.loadingCtrl.create({
      content:"Please wait..."
    });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckWinningsPage');
    this.loadWinnings();
  }
  ionViewWillEnter() {
   
   
}
  next() {
    this.app.getRootNav().push(CheckWinningsNextPage);
  }

  loadWinnings() {
    this.loader.present();
    this._syndService.loadWinnings()
    .subscribe((res)=> {
      console.log(res);
      this.loader.dismiss();
      this.myWinnings = res.response["0"].get_previous_check_list.response.previous_check_group;
      this.content.enableScrollListener();
    });
  }
  scrollHandlerSyndicate(event){
    
      var innerDiv = document.getElementById('innerWinnings').scrollHeight;
      var scrollDiv = document.getElementById('winningContent').clientHeight;
      
      var valu = scrollDiv + this.content.scrollTop
      console.log("sdsdsdsdsdsdsds", innerDiv, scrollDiv, valu)
      if (valu > innerDiv) 
      {
        console.log("botom")
        this.downShowing = 1
        this.cdRef.detectChanges();
    }
    else
    {
      this.downShowing = 0
      this.cdRef.detectChanges();
    }
    }
    delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  

}
