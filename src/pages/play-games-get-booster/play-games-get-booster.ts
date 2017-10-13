import { Component ,OnInit } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController,AlertController,Platform } from 'ionic-angular';
import { PlayGame } from '../../services/playgame.service';

declare var webengage:any;

@Component({
  selector: 'get-booster',
  templateUrl: 'play-games-get-booster.html'
})
export class GetBooster implements OnInit {
  ngOnInit(): void {
     this.platform.ready().then((readySource) => {
        var CurrentUserid = localStorage.getItem('appCurrentUserid');
         if (this.platform.is('cordova')) {
			      webengage.engage(); 
            webengage.track('Play Game get booster Page', {
            "UserId" :CurrentUserid ,
            });
          }
     });

   }
 loading: any;
 public customerAward_logId:string;
 boosterdetail:any;
  constructor(public viewCtrl: ViewController,
    public platform:Platform,
    private loadingCtrl: LoadingController,
    public playgameServiceForBooster: PlayGame,
    public alertCtrl:AlertController,
    public params: NavParams) {
    this.customerAward_logId = this.params.get('customer_award_log_id').customer_award_logid;
  
  }
  getBooster() {
  
    this.loading = this.loadingCtrl.create();
    console.log('ionViewDidLoad PlayGamePage');
    this.loading.present().then(() => {
      this.playgameServiceForBooster.getGameBooster(this.customerAward_logId)
        .subscribe(
        (responseData:any) => {
          this.boosterdetail = responseData.response[0].activate_game_booster.response;
          if(this.boosterdetail.status=="FAIL")
            {
              let alert = this.alertCtrl.create({
              title: 'Warning',
              subTitle: this.boosterdetail.message,
              buttons: ['Dismiss']
              });
              alert.present();
            }
           this.loading.dismiss();
        },
        err => {
            console.log("error", err);
        }
      );
    });
  }

  dismissView(data:any=1) {
    this.viewCtrl.dismiss(data);
  }

}