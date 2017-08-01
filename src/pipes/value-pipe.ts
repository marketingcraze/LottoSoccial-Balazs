import { Injectable, Pipe,PipeTransform } from '@angular/core';

/*
  Generated class for the PipesValuePipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'value'
})
@Injectable()
export class ValuePipe implements PipeTransform{
  /*
    Takes a value and makes it lowercase.
   */
  transform(value) {

    console.log(value);
    return value;
  }
}
