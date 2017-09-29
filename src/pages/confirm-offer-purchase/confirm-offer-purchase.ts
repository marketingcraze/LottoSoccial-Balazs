import { Component,OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Checkbox, ViewController, AlertController, ModalController,LoadingController } from 'ionic-angular';
import { paymentService } from '../../services/paymentService'


@Component({
  selector: 'page-confirm-offer-purchase',
  templateUrl: 'confirm-offer-purchase.html'
})
export class confirmOfferPurchasePage {
  @ViewChild('chk') chk:Checkbox;
  cards: any;
  VoucherCode: any;
  value: boolean = false;
  counter = 0;
  checkeddd:boolean;
  selectedDigit:any;
  

  constructor(public navCtrl: NavController,
    private viewctrl: ViewController,
    private modalController: ModalController,
    private navprms: NavParams,private paymentServ:paymentService, private loadingCtrl:LoadingController) {
    this.VoucherCode = this.navprms.get("VoucherCode")
    console.log("payment page")
      

    
  }
  testCards : any =[];
  
  ngOnInit()  {
    let loader = this._showLoader()
    
    this.paymentServ.getPaymentDescription().subscribe(
      data => {
      debugger
        this.cards=data.response[0].get_customer_paymill_card_details.response.cards;
        var lengths=this.cards.length;
        for(let i=0;i<lengths;i++)
        {
          let testCard : any =[];
          testCard[0] = this.cards[i];
          testCard[1] = false;
          this.testCards.push(testCard);
        }
        
        loader.dismiss()
      },
      err => {
        console.log("error", err);
        loader.dismiss();
      }
    )

  }
  private _showLoader() {
    let loader = this.loadingCtrl.create({
      content: "Loading data..."
    });
    loader.present()
    return loader;
  }
  select(i,cards){
    for(let i=0;i<cards.length;i++)
    {
     // this.selectedDigit=cards[1][i][0].pay_stored_detail_id.last4_digit;
    }
   
  }

  dismissPopUp(data) {
    this.viewctrl.dismiss(data);
  }
  done() {
    this.value = true
 }
  moveToVouchers() {
    this.navCtrl.popAll()
  }
  minusCounter(){
    if(this.counter != 0){
    this.counter--;
    }
  }
  plusCounter(){
    this.counter++;
  }
  private deselectAll(arr: any[]){
    arr.forEach(val =>{
        if(val.selected){
            val.selected = false;
        }
    })}
    private updateSelection(selectedOption){
      
      let selected = selectedOption.selected;
      
     // this.deselectAll(this.allVals);
      
      selectedOption.selected = !selected;
      }
 
}






