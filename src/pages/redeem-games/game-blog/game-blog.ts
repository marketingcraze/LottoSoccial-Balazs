import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';

@Component({
    selector: 'game-blog',
    templateUrl: 'game-blog.html'
})
export class gameBlog {
    constructor(private _viewCtrl:ViewController){

    }
    dismissView(){
        this._viewCtrl.dismiss();
    }
}