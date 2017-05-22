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
    	console.log('CusHeaderComponent');

    	this.unreadCount = params.unreadCount;

    	params.events.subscribe('unread-count', (count)=>{
    		console.log('CusHeaderComponent::', count);
            this.unreadCount = count;
        });
    }

	ngAfterViewInit(){}
	
	goHomePage(){
		this.params.goTab(0);
		/*
		if (this.homeClicked) {
			this.homeClicked.emit();
		}else{
			
		}*/
	}

}
