import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Params{
	public params:any;
	public homeData:any;

    constructor(
    	public events:Events
    	){
        console.log("Params()");  
        this.params = {};
        this.homeData = {};
    }

    setHomeData( data:any ){
    	this.homeData = data;
    	this.events.publish("home-data", data);
    }
}