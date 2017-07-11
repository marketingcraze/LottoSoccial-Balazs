import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()
export class AppSoundProvider {
audioType: string = 'html5';
    sounds: any = [];
 
    constructor(
    	public nativeAudio: NativeAudio, 
    	platform: Platform) {
 
        if(platform.is('cordova')){
            this.audioType = 'native';
        }

        this.preload('buttonClick', 'assets/sound/Button-Click-001.wav');
        this.preload('cardFlip', 'assets/sound/Card-Flip-003.wav');
        this.preload('gamePlay', 'assets/sound/Game-Play-Button-002.wav');
        this.preload('menuClick', 'assets/sound/Menu-click004.wav');
        this.preload('refresh', 'assets/sound/Page_Refresh-005.wav');
 
    }
 
    preload(key, asset) {
        if(this.audioType === 'html5'){
            let audio = {
                key: key,
                asset: asset,
                type: 'html5'
            };
 
            this.sounds.push(audio);
        } else {
 
            this.nativeAudio.preloadSimple(key, asset);
            let audio = {
                key: key,
                asset: key,
                type: 'native'
            };
 
            this.sounds.push(audio);
        }
    }
 
    play(key){
        let audio = this.sounds.find((sound) => {
            return sound.key === key;
        });
 
        if(audio.type === 'html5'){
            let audioAsset = new Audio(audio.asset);
            audioAsset.play();
        } else {
            this.nativeAudio.play(audio.asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
 
        }
 
    }
}
