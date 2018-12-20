import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sum'
})
export class SumPipe implements PipeTransform {
    
    transform(items: any, attr: string): any {
        if(!items || !items.length) { return items; }
        // if(!items)return null;
        // if(!attr)return items;
        return items.reduce((a, b) => a + b[attr], 0);
    }
}

