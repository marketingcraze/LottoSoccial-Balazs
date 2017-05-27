import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
	selector: 'no-internet-message',
	templateUrl: 'no-internet-message.html'
})
export class NoInternetMessageComponent {

	text: string;
	public noInternet:boolean = false;

	constructor(private network: Network, 
		private navCtrl:NavController) {

	    console.log('NoInternetMessageComponent Component', network.type);
	    this.text = 'Hello World';

	    network.onDisconnect().subscribe(() => {
	    	this.noInternet = true;
	    });

	    network.onConnect().subscribe(()=> {
	    	this.noInternet = false;
	    });
	}

	removeMessage(){
	  	console.log('removeMessage');
	  	this.noInternet = !this.noInternet;
	 }

}
