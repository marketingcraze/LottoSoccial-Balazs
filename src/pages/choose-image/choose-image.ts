import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CreateSyndicatePage } from '../create-syndicate/create-syndicate';
import { File, FileEntry, } from '@ionic-native/file';
import { Camera, CameraOptions } from 'ionic-native';
import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer, TransferObject } from '@ionic-native/transfer';
//import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { SyndicateService } from '../../providers/syndicate-service';
declare var window: any;
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSoundProvider } from '../../providers/app-sound/app-sound';

@Component({
  selector: 'page-choose-image',
  templateUrl: 'choose-image.html'
})
export class ChooseImagePage {
  private images = []
  public createsynd: CreateSyndicatePage
  base64Image
  private imageSrc: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _syndService: SyndicateService,
    private imagePicker: ImagePicker,
    private file: File,
    private http: Http, 
    public appSound:AppSoundProvider,
    private loadingCtrl: LoadingController
    ) {
   
  }

  ionViewDidLoad() {
    this.getCovers();
    console.log('ionViewDidLoad ChooseImagePage');
  }
  chooseImage() {
    console.log('image selected');
  }

  selectedImage(image) {
    console.log(image);
    this.appSound.play('buttonClick');
    this.navCtrl.push(CreateSyndicatePage, {'image': image});
  }

  
 accessGallery(){
   let cameraOptions = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,      
    quality: 80,
    targetWidth: 350,
    targetHeight: 120,
    encodingType: Camera.EncodingType.JPEG,      
    correctOrientation: true
  }

  Camera.getPicture(cameraOptions)
    .then((file_uri) => {
      this.base64Image = file_uri;
      this.uploadPhoto(this.base64Image);
    }, 
      err => console.log(err)); 

  }

  getCovers() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._syndService.getcovers().subscribe((res) => {
            var dt = res.response.response.image_group
            for (var key in dt) {
              if (dt.hasOwnProperty(key)) {
                this.images.push(dt[key].trim());
              }       
          }
          loader.dismiss();
        });
  }


  private uploadPhoto(imageFileUri: any): void {

		this.file.resolveLocalFilesystemUrl(imageFileUri)
		.then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
		.catch(err => console.log(err));
	}

private readFile(file: any) {
		var reader;
    reader = new FileReader();
		reader.onloadend = (e) => {
      //console.log(new Int8Array(reader.result));
      //var byteArray = new Uint8Array(reader.result);
      const imgBlob = new Blob([reader.result], {type: 'image/jpg'});
			this.postData(imgBlob, file.name);
		};
		reader.readAsArrayBuffer(file);
	}

  postData(blob:any, fileName:string) {
    let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
		let server = 'https://nima.lottosocial.com/wp-json/mobi/v2/upload/?process=syndicate';

		var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
        let myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', 
            'Oauth oauth_consumer_key = "NDes1FKC0Kkg",' +
            'oauth_token="djKnEJjJ7TYw0VJEsxGEtlfg",' +
            'oauth_signature_method="HMAC-SHA1",' +
            'oauth_timestamp="1490087533",' +
            'oauth_nonce="dWL9pr",' +
            'oauth_version="1.0",' +
            'oauth_signature="mQF41gSF7KIuVqzqcI0nSX1UklE%3D"'
            );
        // myHeaders.append('Content-type', "image/"+extension);
		
        let options = {
            fileKey: fileName,
            fileName: fileName,
            mimeType: "image/"+extension,
            headers: myHeaders
        };
        console.log('inside service');
        console.log(blob);
        console.log(fileName);

		return this.http.post(server, blob, options)
        .catch( err =>this.handleError(err))
		.map(response => response.json())
		.finally(() => console.log('inside finaly'))
		.subscribe((ok) => {
      loader.dismiss();
      console.log("uploadPhoto:");
      console.log(ok);
      this.navCtrl.push(CreateSyndicatePage, {'image': ok.response.image_url});
    });
	// 	.map(res => res.json())
    //   .map((res) => {
    //     return res;
    //  })
	}

    private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}

}
