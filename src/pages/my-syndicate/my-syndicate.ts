import { Component } from '@angular/core';
import { NavController, NavParams, App, Tabs } from 'ionic-angular';
import { ManageSyndicatePage } from '../manage-syndicate/manage-syndicate';
import { ManageSyndicate2Page } from '../manage-syndicate2/manage-syndicate2';
import { YourTicketsPage } from '../your-tickets/your-tickets';
import { SyndicateService } from '../../providers/syndicate-service';


declare var $: any;

@Component({
    selector: 'page-my-syndicate',
    templateUrl: 'my-syndicate.html'
})
export class MySyndicatePage {
    private syndArr = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public app: App,
        public _syndService: SyndicateService) { }

    ionViewDidLoad() {
        this.loadSyndicate();
        $('#estate').hide();
        $('#sstate').show();
    }
    ionViewWillEnter() {
        $('#estate').hide();
        $('#sstate').show();
    }
    checkwins() {
        var t: Tabs = this.navCtrl.parent;
        t.select(1);
    }
    manage_syndicates() {
        this.app.getRootNav().push(ManageSyndicatePage);
    }
    manage_syndicates2() {
        this.app.getRootNav().push(ManageSyndicate2Page);
    }
    viewTickets() {
        this.app.getRootNav().push(YourTicketsPage);
    }
    loadSyndicate() {
        this._syndService.syndicateList().subscribe((res) => {
            console.log('syndicate list');
            if (res.response.response.status == 'SUCCESS') {
                this.syndArr = res.response.response.syndicate_group;
            }
            console.log(this.syndArr);
        })
    }

}
