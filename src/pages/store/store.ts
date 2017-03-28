import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-store',
  templateUrl: 'store.html'
})
export class StorePage {

    spaceBetween:number = -70;
    whatsOn:boolean = false;
    

    constructor(
        public platform: Platform, 
        public navCtrl: NavController, 
      	public navParams: NavParams,
        private iab: InAppBrowser,
      	public actionSheetCtrl: ActionSheetController) {
        
        this.spaceBetween = Math.floor( platform.width() * -0.10 );
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StorePage');
    }

    loadLink(){
        let browser = this.iab.create('https://google.com');
        browser.show();
    }

  showLottoSocial(){
  	console.log("showLottoSocial()");


  	let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      cssClass:'bottom-sheet',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



}
