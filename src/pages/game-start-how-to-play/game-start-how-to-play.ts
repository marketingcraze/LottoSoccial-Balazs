import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavParams } from 'ionic-angular';

@Component({
    selector: 'howto-play',
    templateUrl: 'game-start-how-to-play.html'
})
export class howtoplay {
    public gameInfo: any;
    public gameInstriction: any;
    public decodedHtml:any;
    constructor(private _playgameData: NavParams) {
        this.gameInfo = _playgameData.get('gameInfo');
        this.gameInstriction = _playgameData.get('gameInfo').game_instruction;
        this.decodeHtmlEntity()
    }
    decodeHtmlEntity() {
        var sampleTxt = document.createElement("textarea");
        sampleTxt.innerHTML = this.gameInstriction;
        this.decodedHtml=sampleTxt.value;
    }
}