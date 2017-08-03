import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-invite_friends',
  templateUrl: 'invite_friends.html'
})

export class InviteFriendsPage {
  public close = 'close'
  public cclose = 'cclose'
  public blured = 'transparent'
  public searchTerm: string = '';
  public  items: any;
  public fItems: any;
  public searchControl: FormControl;
  public searching: any = false;
  public clistheight: number
  public cfoothide: boolean = true
  public listPadding: number = 0

  @ViewChild('contactListHeader') elementView: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.debounceTime(100).subscribe(search => {
 
            this.searching = false;
            this.setFilteredItems();
 
        });
    this.items = [
            {title: 'Benjamin Evalent', number:'+447448962353', selected:false},
            {title: 'I am me', number:'+447448962353', selected:false},
            {title: 'Somewhat somewhere', number:'+447448962353', selected:false},
            {title: 'john Papa', number:'+447448962353', selected:false},
            {title: 'Angular 2', number:'+447448962353', selected:false},
            {title: 'Ionic 2', number:'+447448962353', selected:false},
            {title: 'Node Evalent', number:'+447448962353', selected:false},
            {title: 'Ninja Bedi', number:'+447448962353', selected:false},
            {title: 'Dev Geek', number:'+447448962353', selected:false},
            {title: 'john Charter', number:'+447448962353', selected:false},
            {title: 'Google contacts', number:'+447448962353', selected:false},
            {title: 'Demo Contacts', number:'+447448962353', selected:false}
        ]

        this.fItems = this.items;
  }

  onSearchInput(){
        this.searching = true;
    }

  ionViewDidLoad() {
    this.clistheight = window.innerHeight - this.elementView.nativeElement.offsetHeight;
    this.setFilteredItems();
  }
   setFilteredItems() {
        this.fItems = this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        }); 
    }

   toggle() {
    this.close = '';
    setTimeout(() => {
      this.blured = 'blured';
    }, 1000);
    
  }
  closed() {
    this.blured = 'transparent';
    this.close = 'close';
  }
  openContacts() {
    this.cclose = ''
  }
  cCancle() {
    this.cclose = 'cclose'
    this.cfoothide = true;
    this.listPadding = 0;
    var arrlen = this.items.length;
      for(var j = 0; j < arrlen; j++){
        this.items[j].selected = false
      }
  }

  addContact(item, i) {
    for(var j=0; j<this.items.length; j++) {
      if(this.items[j].title == item.title) {
        if(this.items[j].selected == true) {
          this.items[j].selected = false
        }else {
          this.items[j].selected = true
        }
      }
    }
    

    var count: number = 0;
    var arrlen = this.items.length;
    for(var j = 0; j < arrlen; j++){
      if(this.items[j].selected == true) {
        count++;
      }
    }

    if(count >= 1) {
      this.cfoothide = false;
      this.listPadding = 125
    } else {
      this.cfoothide = true;
      this.listPadding = 0;
    }
    
  }

  removeContact(item, i) {
    var count: number = 0;
    for(var j=0; j<this.items.length; j++) {
      if(this.items[j].title == item.title) {
        this.items[j].selected = false
      }
      if(this.items[j].selected == true) {
        count++;
      }
    }
    if(count >= 1) {
      this.cfoothide = false;
      this.listPadding = 125
    } else {
      this.cfoothide = true;
      this.listPadding = 0;
    }
    
  }

  inviteSelected(){
    this.cCancle()
    this.closed()
    this.presentToast()
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Invite successfully texted',
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: 'GOT IT'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
