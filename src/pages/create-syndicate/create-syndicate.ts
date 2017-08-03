import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ChooseImagePage } from '../choose-image/choose-image';
import { CreateSyndicate2Page } from '../create-syndicate2/create-syndicate2';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

/*
  Generated class for the CreateSyndicate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-syndicate',
  templateUrl: 'create-syndicate.html'
})
export class CreateSyndicatePage {
  public todo : FormGroup;
  public hideimagebtn: boolean = false
  public imagechosed: boolean = false
  public sImage: string = ''
  public title: string = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appSound:AppSoundProvider,
    private formBuilder: FormBuilder, 
    private viewCtrl: ViewController) {

    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required]
    });
    
    this.sImage = this.navParams.get('image');
    if(this.sImage != undefined && this.sImage != '') {
      var title = JSON.parse(localStorage.getItem('sdetails')).title
      var data = {
        title: title,
        image: this.sImage
      }
      console.log('image url', this.sImage);
      localStorage.setItem('sdetails', JSON.stringify(data));
      // this.hideimagebtn = true
      // this.imagechosed = true
    }
  }
  ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
        if(localStorage.getItem('sdetails')) {
          var storeddata = JSON.parse(localStorage.getItem('sdetails'))
          this.sImage = storeddata.image
          this.title = storeddata.title
          if(this.sImage != undefined && this.sImage != '') {
            this.hideimagebtn = true
            this.imagechosed = true
          }
          
        }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSyndicatePage');
  }

  chooseImage() {
    this.appSound.play('buttonClick');
    var data = {
      title: this.todo.value.title,
      image: this.sImage
    }
    localStorage.setItem('sdetails', JSON.stringify(data));
    this.navCtrl.push(ChooseImagePage);
  }

  logForm(){
    this.appSound.play('buttonClick');
    var data = {
      title: this.todo.value.title,
      image: this.sImage
    }
    localStorage.setItem('sdetails', JSON.stringify(data));
    this.navCtrl.push(CreateSyndicate2Page);
  }

}
