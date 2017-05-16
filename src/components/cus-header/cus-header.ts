import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Params } from '../../services/params';

@Component({
  selector: 'cus-header',
  templateUrl: 'cus-header.html'
})
export class CusHeaderComponent {

	@Input('title') title;  
	@Input('isHome') isHome;
	// @Input('notification-count') notificationCount;  

	@Output() homeClicked = new EventEmitter();


	private unreadCount;

	constructor(private params: Params) {
    	console.log('Hello CusHeader Component');

    	params.events.subscribe('unread-count', (count)=>{
            this.unreadCount = count;
        });
    }

	ngAfterViewInit(){}
	
	goHomePage(){
		this.homeClicked.emit();
	}

}
