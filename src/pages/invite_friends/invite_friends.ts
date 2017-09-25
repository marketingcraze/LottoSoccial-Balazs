import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
import { ElementRef, ViewChild } from '@angular/core';
import { Contacts, Contact, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';
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
    public loadingCtrl: LoadingController, private socialSharing: SocialSharing) {
    this.items = []
    this.fItems = []
    this.sid = this.navParams.get('sid');
    console.log(this.sid);
    this.loader = this.loadingCtrl.create({
      content:"Please wait..."
    });
    let loader2 = this.loadingCtrl.create({
      content:"Please wait..."
    });
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.debounceTime(100).subscribe(search => {
 
            this.searching = false;
            this.setFilteredItems();
 
        });
    loader2.present()
    this.platform.ready().then(() => {
      contacts.find(['displayName', 'phoneNumbers'], {multiple: true}).then((gcontacts:Array<Contact>) => {
          var len = gcontacts.length;
          for(var i=0; i<len; i++) {
             var name = '';
              if(gcontacts[i].displayName != null){
                name = gcontacts[i].displayName;
              }else {
                name = gcontacts[i].name.formatted;
              }
              if(gcontacts[i].phoneNumbers) {
                this.items.push({
                    displayName: name,
                    phoneNumbers: [{value: gcontacts[i].phoneNumbers[0].value}],
                    selected: false
                })
              }
          }
           this.fItems = this.items;
           loader2.dismiss();
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
            return item.displayName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
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
      if(this.items[j].displayName == item.displayName) {
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
      if(this.items[j].displayName == item.displayName) {
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
    this.loader.present();
    var arr:any = [];
    for(var i=0; i<this.fItems.length; i++) {
      var inv = "0";
      if(this.fItems[i].selected) {
        inv = "1";
      }else {
        inv = "0";
      }
      arr.push({
          "member_invited": inv,
          "first_name": this.fItems[i].displayName,
          "surname": "nn",
          "msn": this.fItems[i].phoneNumbers[0].value,
          "gender": "nn",
          "title": "Mr",
          "email": "nn",
          "address": "nn",
          "town": "nn",
          "postal_code": "nn",
          "date_of_birth": "nn",
          "company_name": "nn",
          "work_phone": "nn",
          "home_phone": "nn",
          "notes": "nn",
          "birthday": "nn",
          "url": "nn",
          "additional_msn": "nn",
          "company": "nn"

      })
    }
    
    this._syndService.insertContact(arr, this.sid)
    .subscribe((res:any) => {
      console.log('inisde api response')
      console.log(JSON.stringify(res));
      this.loader.dismiss();
      this.cCancle()
      this.closed()
      this.presentToast()
    })
    
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
  this._syndService.getSyndicateMeembers(this.sid)
  .subscribe((res)=> {
    console.log(res);
    this.mDeatils = res.response["0"].get_private_syndicate_members.response;
    console.log(this.mDeatils);
  })

}

shareInfo()
{
this.socialSharing.share("demo message", "Demo subject", "", "https://ampersandacademy.com").
then(() => {
alert("Sharing success");
// Success!
}).catch(() => {
// Error!
alert("Share failed");
});
}

}
