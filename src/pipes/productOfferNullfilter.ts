import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "productOfferNullfilter",
    pure: false
})
@Injectable()
export class productOfferNullfilter implements PipeTransform {
    transform(objects: any[]): any[] {
        if (objects) {
            return objects.filter(object => {
                return object.jackpot !== "";
            });
        }
    }
}