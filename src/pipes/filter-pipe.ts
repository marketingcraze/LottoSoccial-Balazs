import { Injectable, Pipe,PipeTransform  } from '@angular/core';

/*
  Generated class for the FilterPipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
   name: "filter",
    pure: false
})
@Injectable()
export class FilterPipe  implements PipeTransform {
 
    transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
        return items.filter(item => {
            for (let field in conditions) {
                if (item[field] !== conditions[field]) {
                    return false;
                }
            }
            return true;
        });
    }
}
