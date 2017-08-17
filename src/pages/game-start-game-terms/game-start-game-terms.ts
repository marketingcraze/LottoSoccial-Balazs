import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavParams } from 'ionic-angular';

@Component({
    selector: 'game-terms',
    templateUrl: 'game-start-game-terms.html'
})
export class gameTerms {
    public GameDetails: any;
    public gameTerms: any;
    public intro: any;
    constructor(private _playgameData: NavParams) {
        this.GameDetails = _playgameData.get('gameTermsdata').game_terms.game_desc;
        this.intro = _playgameData.get('gameTermsdata').game_terms.introduction;
    }
}