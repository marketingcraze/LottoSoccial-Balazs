import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home'

@Component({
  selector: 'synd-cus-header2',
  templateUrl: 'synd-cus-header2.html'
})
export class CusHeader2Component {

  @Input('title') title;  
  @Input('subtitle') subtitle;  

  constructor(private navCtrl: NavController) {
    console.log('Hello CusHeader Component');
    
  }
  skip() {
    this.navCtrl.setRoot(HomePage)
  }
  ngAfterViewInit(){
  }

}
