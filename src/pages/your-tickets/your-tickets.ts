import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ViewTicketsPage } from '../view-tickets/view-tickets';
import { SyndicateService } from '../../providers/syndicate-service';
let loader:any;
/*
  Generated class for the YourTickets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-your-tickets',
  templateUrl: 'your-tickets.html'
})
export class YourTicketsPage {
  hideNumber: boolean = false;
  rr_to_ln: string = 'RAFFLE'
  products: any;
  sid:any;
  stype:any;
  allTicketData: any = [];
  dataArr = [{
    name:'EuroMillions',
    lines: [[12,54,23,41,19,13,34],[11,24,43,29,31,46,20],[41,13,10,1,5,32,19],[12,15,31,41,19,17,1],[52,16,34,16,12,10,9]],
    raffle: ['MVPC20881', 'ZVPD06683', 'HWPG19556', 'JWPG51409', 'VXPN10586']
  }]
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,public _syndService:SyndicateService, public loadingCtrl: LoadingController) {
     this.products = this.navParams.get('products');
    this.sid = this.navParams.get('synd');
    this.stype = this.navParams.get('stype');
    loader = this.loadingCtrl.create({
      spinner: 'hide',
			content: `<img src="assets/vid/blue_bg.gif" style="height:100px!important">`,
    });
  }

  ionViewDidLoad() {
    var len = this.products.length;
    
    loader.present();
    for(var i=0;i<len;i++){
      this.getTickets(this.products[i].product_id, len);
    }
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  close() {
    this.navCtrl.pop();
  }
  toggles(i) {
    this.allTicketData[i].hideNumber = !this.allTicketData[i].hideNumber;
    this.hideNumber = !this.hideNumber;
    if(this.rr_to_ln == 'RAFFLE') {
      this.rr_to_ln = 'LINES'
    }else {
      this.rr_to_ln = 'RAFFLE'
    }
  }
  viewTickets(i) {
     this.navCtrl.push(ViewTicketsPage);
  }
  getTickets(pid, len) {
    this._syndService.getTickets(parseInt(pid) , this.sid, this.stype)
    .subscribe((res) => {
        this.allTicketData.push(res.response.response.ticket_group);
        if(this.allTicketData.length == len) {
          this.renderData();
        }
    })
  }

  renderData(){
    console.log(this.allTicketData);
    for(var i=0; i<this.allTicketData.length; i++) {
      if(this.allTicketData[i]) {
        this.allTicketData[i].hideNumber = false;
        this.allTicketData[i].raffle_numbers = this.allTicketData[i].raffle_numbers.split(',');
        for(var j=0;j<this.allTicketData[i].winning_number_group.length; j++){
          this.allTicketData[i].winning_number_group[j].m = this.allTicketData[i].winning_number_group[j].main_ticket_numbers.split(',');
          this.allTicketData[i].winning_number_group[j].b = this.allTicketData[i].winning_number_group[j].bonus_ticket_numbers.split(',');
        }
      }
    }
    loader.dismiss();
  }

}
