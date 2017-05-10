import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cus-header',
  templateUrl: 'cus-header.html'
})
export class CusHeaderComponent {

	@Input('title') title;  
	@Input('isHome') isHome;
	@Input('notification-count') notificationCount;  

	@Output() homeClicked = new EventEmitter();

	constructor() {
    	console.log('Hello CusHeader Component');
    }

	ngAfterViewInit(){}
	
	goHomePage(){
		this.homeClicked.emit();
	}

}
