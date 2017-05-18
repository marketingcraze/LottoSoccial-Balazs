import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Params{
	public params:any;
	public homeData:any;
    public unreadCount;

    constructor(public events:Events){
        console.log( "Params()" );

        this.params = {};
        this.homeData = {};
    }

    setHomeData( data:any ){
        this.homeData = data;
        this.events.publish("home-data", data);
    }

    setUnreadCount( data ){
        this.unreadCount = data;
        this.events.publish("unread-count", data);
    }

    goHomePage(){
        this.events.publish("go-home");
    }

    goTab(tabIndex){
    	this.events.publish("go-tab", tabIndex);
    }
}