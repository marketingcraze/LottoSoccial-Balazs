import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "filterBadge",
    pure: false
})
@Injectable()
export class FilterBadge implements PipeTransform {

    transform(objects: any[], number: any): any[] {
        if (objects) {
            return objects.filter(object => {
                return object.precentage == number;
            });
        }
    }
}
