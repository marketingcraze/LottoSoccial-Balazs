import {Pipe} from '@angular/core';
 
@Pipe({
  name: 'toLower'
})
export class TextManipulate {
  transform(value) {
    return value.toLowerCase();
  }
}