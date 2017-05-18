import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ConfirmNumberPage } from '../confirm-number/confirm-number';
import { SyndicateService } from '../../services/syndicate-service';
declare var $: any; 

@Component({
  selector: 'page-choose-number',
  templateUrl: 'choose-number.html'
})
export class ChooseNumberPage {
   
  dError = false;
  errArr = [];
  dataArr = [];
  syndId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _syndService: SyndicateService, public loadingCtrl: LoadingController) {
    //this.dataArr = JSON.parse(localStorage.getItem('cardSelected'));
    this.syndId = localStorage.getItem('synd_id');
  }

  ionViewDidLoad() {
    this.syndNumber(this.syndId);
    
  }

  next() {
    localStorage.setItem('numberData', JSON.stringify(this.dataArr));
    this.navCtrl.push(ConfirmNumberPage);
  }

  clear(index, n1, n2) {
    for(var i=0; i<this.dataArr[index].lines.length; i++) {
        var arr = []
        var errArr = []
        for(var j=0; j< n1+n2; j++) {
          arr.push("")
          errArr.push(false)
        }
        this.dataArr[index].lines[i] = arr;
        this.dataArr[index].hasError[i] = errArr
      }
      this.errArr[index] = false;
      this.dError = false
  }

  getlucky(index, n1, n1_f, n1_t, n2, n2_f, n2_t) {
    for(var j=0; j<this.dataArr[index].lines.length; j++) {
      var arr = [];
      var errArr = [];
      for(var i=0; i<n1 + n2; i++) {
        errArr.push(false)
        if(i<n1){
          var random = this.getRandomArbitrary(n1_f, n1_t)
          if(arr.indexOf(random) == -1){
            arr.push(random);
          } else {
            random = this.getRandomArbitrary(n1_f, n1_t)
            arr.push(random);
          }
        }else {
          var random = this.getRandomArbitrary(n2_f, n2_t)
          if(arr.indexOf(random) == -1)
          {
            arr.push(random)
          } else {
            random = this.getRandomArbitrary(n2_f, n2_t)
            arr.push(random)
          }
        }
      }
      this.dataArr[index].hasError[j] = errArr;
      this.dataArr[index].lines[j] = arr;
    }
    this.errArr[index] = true
    if(this.errArr.indexOf(false) == -1) {
      this.dError = true
    }
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  onKey(r, w, i, rt, rn, bt, bn) {
   
    var val = this.dataArr[r].lines[w][i];
    var count = 0;
      if(i > rn-1 && val > bt) {
        val = "";
        this.dataArr[r].lines[w][i] = val ;
        $("#input"+r+w+i).focus();
      } else {
        if(val > rt) {
          val = "";
          this.dataArr[r].lines[w][i] = val;
          $("#input"+r+w+i).focus();
        }
      }
    var tArr = [];
    for(var t=0; t<this.dataArr[r].lines.length; t++) {
      tArr = tArr.concat(this.dataArr[r].lines[t]);
    }
    if(tArr.indexOf('') == -1) {
      this.errArr[r] = true;
    } else {
      this.errArr[r] = false;
    }

    for(var x=0; x<this.dataArr[r].lines[w].length; x++) {
      if(this.dataArr[r].lines[w][x] == val) {
        count++;
      }
    }   
      if( count > 1 && val != "") {
        this.dataArr[r].lines[w][i] = "";
        this.dataArr[r].hasError[w][i] = true
        $("#input"+r+w+i).focus();
      } else {
        this.dataArr[r].lines[w][i] = val;
        this.dataArr[r].hasError[w][i] = false
      }

    if(this.errArr.indexOf(false) == -1) {
      this.dError = true
    }
      
      // if(this.dataArr[r].lines[w].indexOf(val) == -1) {
      //   console.log('index c')
      //   this.dataArr[r].lines[w][i] = val;
      // }else {
      //   console.log(this.dataArr[r].lines[w]);
      //   console.log('inside else');
      //   this.dataArr[r].lines[w][i] = "";
      // }

  }

  syndNumber(id: any) {
    let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
    this._syndService.syndnumber(id).subscribe((res) => {
      console.log(res);
      loader.dismiss();
      this.dataArr = res.response.response.product_group;
      for(var i=0; i<this.dataArr.length; i++) {
        this.errArr[i] = false;
      var count = this.dataArr[i].numbers + this.dataArr[i].bonus;
      var arr = [];
      var errorArr = []
      for(var j=0; j<this.dataArr[i].line_count; j++) {
          var tempArr = []
          var tempArr2 = []
          for(var k=0; k<count; k++) {
            tempArr.push("")
            tempArr2.push(false)
          }
          arr.push(tempArr)
          errorArr.push(tempArr2)
      }
      this.dataArr[i].lines = arr;
      this.dataArr[i].hasError = errorArr;
    }
    console.log(this.dataArr)

    })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
