import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Carousel } from './carousel';

@NgModule({
  declarations: [
    Carousel,
  ],
  imports: [

    // IonicModule.forChild(Carousel),
  ],
  exports: [
    Carousel
  ]
})
export class CarouselModule {}
