import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Params } from '../../services/params';
import { Badge } from '@ionic-native/badge';

@Component({
	selector: 'cus-header',
	templateUrl: 'cus-header.html'
})
export class CusHeaderComponent {
	showBell: boolean = false;
	@ViewChild('animation') input;
	@Input('title') title;
	@Input('isHome') isHome;
	// @Input('notification-count') notificationCount;  

	@Output() homeClicked = new EventEmitter();


	private unreadCount: any;

	constructor(private params: Params, public badge: Badge) {
		console.log('CusHeaderComponent');

		this.inboxBellCount()
	}
	inboxBellCount() {
		debugger
		this.unreadCount = this.params.unreadCount;

		this.params.events.subscribe('unread-count', (count) => {
			debugger
			console.log('CusHeaderComponent::', count);
			this.unreadCount = count;
			if (this.unreadCount == undefined) {
				this.unreadCount = 0;
				this.badge.set(this.unreadCount);
				this.showBell = true
			} else {
				this.badge.set(this.unreadCount);
				this.showBell = true
			}

			console.log("unread count is ----------------->>>>>>>>>>>>>>>>> ", this.unreadCount)

		});
	}
	ngAfterViewInit() { }

	goHomePage() {
		this.params.goTab(0);
		/*
		if (this.homeClicked) {
			this.homeClicked.emit();
		}else{
			
		}*/
	}
	ionViewWillEnter() {
		console.log("I'm alive!");
		this.animateButton()
	}
	animateButton() {
		this.input.start({ type: 'bounce', duration: '5000' })
	}

}
