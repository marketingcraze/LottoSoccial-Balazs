import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';

@Component({
	selector: 'no-internet-message',
	templateUrl: 'no-internet-message.html'
})
export class NoInternetMessageComponent {

	text: string;
	noInternet:boolean = false;

	constructor(private network: Network) {
	    console.log('Hello NoInternetMessageComponent Component');
	    this.text = 'Hello World';

	    network.onDisconnect().subscribe(() => {
	    	console.log('you are offline');
	    	this.noInternet = true;
	    });

	    network.onConnect().subscribe(()=> {
	    	console.log('you are online');
	    	this.noInternet = false;
	    });
	}

	removeMessage(){
	  	console.log('removeMessage');
	  	this.noInternet = !this.noInternet;
	 }

}
