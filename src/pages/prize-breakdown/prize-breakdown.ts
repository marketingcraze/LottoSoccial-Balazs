import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { fail } from 'assert';
import { AccountPage } from '../account/account'
import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
    selector: 'prize-breakdown',
    templateUrl: 'prize-breakdown.html'
})
export class prizeBreakdownPage {
    title: string = "Prize Breakdown";
    up: boolean = true;
    constructor(private navCtrl: NavController, public appSound: AppSoundProvider, ) {
        debugger
        console.log("visited")
    }
    toggle() {
        if (this.up) {
            this.title = "Winnings Breakdown"
            this.up = false
        }
        else {
            this.title = "Prize Breakdown"
            this.up = true
        }
    }
    accountPage() {
        this.appSound.play('buttonClick');
        this.navCtrl.push(AccountPage)
    }
}