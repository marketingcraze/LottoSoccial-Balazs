import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'newArrow-Header',
  templateUrl: 'newArrowHeader.html'
})
export class newArrowHeader {

  @Input('title') title;  
  @Input('notification-count') notificationCount;  

  constructor(private navCtrl: NavController) {
    console.log('Hello CusHeader Component');
  }
  close() {
      // debugger;
    this.navCtrl.pop();
  }
  ngAfterViewInit(){
  }

}