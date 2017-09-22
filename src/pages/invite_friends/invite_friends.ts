import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
import { ElementRef, ViewChild } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { FormControl } from '@angular/forms';
import { SyndicateService } from '../../providers/syndicate-service';
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
  public sid: any;
  private mDeatils: any;
  private loader:any 

  @ViewChild('contactListHeader') elementView: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private contacts: Contacts, public platform: Platform, public _syndService: SyndicateService,
        public loadingCtrl: LoadingController) {
    this.sid = this.navParams.get('sid');
    console.log(this.sid);
    this.loader = this.loadingCtrl.create({
      content:"Please wait..."
    });
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.debounceTime(100).subscribe(search => {
 
            this.searching = false;
            this.setFilteredItems();
 
        });
        this.platform.ready().then(() => {
          var opts = {   
            filter : "M",                                
            multiple: true,        
            hasPhoneNumber:true,                             
            fields:  [ 'displayName', 'name' ]
          };
          contacts.find([ 'displayName', 'name' ],opts).then((contacts) => {
            for(var i=0; i<contacts.length; i++) {
              this.items.push(contacts[i]["_objectInstance"])
              this.items[i].selected = false;
            }
            this.fItems = this.items;
          }, (error) => {
            console.log(error);
          })
      })

    // this.items = [
            // {displayName: 'Benjamin Evalent', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'I am me', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Somewhat somewhere', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'john Papa', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Angular 2', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Ionic 2', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Node Evalent', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Ninja Bedi', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Dev Geek', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'john Charter', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Google contacts', phoneNumbers:[{value:'+447448962353'}], selected:false},
            // {displayName: 'Demo Contacts', phoneNumbers:[{value:'+447448962353'}], selected:false}
        // ]
  }

  onSearchInput(){
        this.searching = true;
    }

  ionViewDidLoad() {
    this.clistheight = window.innerHeight - this.elementView.nativeElement.offsetHeight;
    this.getSyndicateMeembers();
    this.setFilteredItems();
  }
   setFilteredItems() {
     if(this.items) {
      this.fItems = this.items.filter((item) => {
            return item.name.formatted.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
     }
         
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
    if(this.items){
    var arrlen = this.items.length;
      for(var j = 0; j < arrlen; j++){
        this.items[j].selected = false
      }
    }
  }

  addContact(item, i) {
    for(var j=0; j<this.items.length; j++) {
      if(this.items[j].name.formatted == item.name.formatted) {
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
      if(this.items[j].name.formatted == item.name.formatted) {
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

getSyndicateMeembers() {
  this.loader.present();
  this._syndService.getSyndicateMeembers(this.sid)
  .subscribe((res)=> {
    this.loader.dismiss();
    console.log(res);
    this.mDeatils = res.response["0"].get_private_syndicate_members.response;
    console.log(this.mDeatils);
  })

}

}
