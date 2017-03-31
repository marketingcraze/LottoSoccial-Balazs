import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cus-header',
  templateUrl: 'cus-header.html'
})
export class CusHeaderComponent {

  @Input('title') title;  
  @Input('notification-count') notificationCount;  

  constructor() {
    console.log('Hello CusHeader Component');
    
  }

  ngAfterViewInit(){
  }

}
