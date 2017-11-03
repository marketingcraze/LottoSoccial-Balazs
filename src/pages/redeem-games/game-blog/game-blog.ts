import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';

@Component({
    selector: 'game-blog',
    templateUrl: 'game-blog.html'
})
export class gameBlog {
    blogContent: any;
    public decodedHtml: any;
    constructor(private _viewCtrl: ViewController,
        private _navPrms: NavParams
    ) {
        debugger;
        this.blogContent = this._navPrms.get("redeem_products_blog")
        this.decodeHtmlEntity()
    }
    dismissView() {
        this._viewCtrl.dismiss();
    }
    decodeHtmlEntity() {
        var sampleTxt = document.createElement("textarea");
        sampleTxt.innerHTML = this.blogContent;
        this.decodedHtml = sampleTxt.value;
    }
}