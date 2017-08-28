import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'lotselecetd',
    pure: false
})
@Injectable()
export class lotsPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => item.selected);
    }
}