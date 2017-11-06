import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';

@Component({
    selector: 'event-blog',
    templateUrl: 'eventBlog.html'
})
export class eventBlog {
    blogContent: string;
    decodedHtml: string;
    eDate: Date;
    sDate: Date;
    startDate: any;
    endDate: any;
    eventData: any;
    constructor(private navPrms: NavParams, public navctrl: NavController) {
        this.eventData = this.navPrms.get("event")
        debugger
        this.convertDate(this.eventData.start, this.eventData.end)
        this.blogContent = this.eventData.details;
        this.decodeHtmlEntity();
    }


    convertDate(startDate: any, endDate: any) {
        debugger
        this.sDate = new Date(parseInt(startDate));
        this.startDate = this.sDate.toDateString()
        this.eDate = new Date(parseInt(endDate));
        this.endDate = this.eDate.toDateString();
    }
    close() {
        this.navctrl.popAll();
    }
    decodeHtmlEntity() {
        var sampleTxt = document.createElement("textarea");
        sampleTxt.innerHTML = this.blogContent;
        this.decodedHtml = sampleTxt.value;
    }
}