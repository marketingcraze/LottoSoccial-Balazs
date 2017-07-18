import { Component, Input, Output, EventEmitter, ElementRef, 
  QueryList } from '@angular/core';
import { Platform } from 'ionic-angular';

export interface CourselItem {
  description: string;
  imgUrl?: string;
  color?: string
}

interface SlideItem {
  idx: number;
  description: string;
  imgUrl: string;
  color?: string;
  currentPlacement: number
}

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html'
})
export class Carousel {
  private currentDeg: number = 0;
  private items: Array<SlideItem> = [];
  private containerWidth: number = 250;
  private tz: number;
  private itemLength:number = 0;
  private offersForYou:any = {
    card_title:''
  };
  private gameGroup:any;

  @Input() set offers(values:any){
    this.offersForYou = values;
    this.calculateLength();
  };
  @Input() set games(values:any){
    this.gameGroup = values;
    this.calculateLength();
  };

  @Input() set slides(values: Array<CourselItem>) {
    if (!values.length) return;

    this.calculateLength();

    let degree: number = 0;
    
    this.items = <Array<SlideItem>>values.map((item: CourselItem, index: number) => {
      let slideItem = {
        idx: index,
        description: item.description,
        imgUrl: item.imgUrl,
        color: item.color,
        currentPlacement: degree
      };
      degree = degree + 60;
      return slideItem;
    })
  }

  @Output() selectSlide = new EventEmitter();

  constructor(
    private eleRef: ElementRef, 
    private platform:Platform) {

    this.containerWidth = platform.width();

    console.log('platform', platform.width() );
   }

  onSwipeLeft() {
    this.currentDeg = this.currentDeg - 60;
    this.applyStyle();
  }

  onSwipeRight() {
    this.currentDeg = this.currentDeg + 60;
    this.applyStyle();
  }

  private applyStyle() {
    let ele = this.eleRef.nativeElement.querySelector('.carousel');
    ele.style[ '-webkit-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ '-moz-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ '-o-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ 'transform' ] = "rotateY(" + this.currentDeg + "deg)";
  }

  selectItem(item:any){
    this.selectSlide.emit(item);
  }

  calculateLength(){
    if (this.gameGroup) {
      this.itemLength = this.gameGroup.length;
    }
    if (this.offersForYou) {
      this.itemLength++;
    }

    if (this.slides) {
      this.itemLength = this.slides.length;
    }
    

    this.tz = Math.round((this.containerWidth / 2) /
      Math.cos(Math.PI / this.itemLength)) + 60;

    console.log('tz', this.tz, this.itemLength);
  }



}
