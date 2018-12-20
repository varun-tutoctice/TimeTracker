import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatPipe',
})
export class dateFormatPipe implements PipeTransform {
    transform(value: any, start?: any, end?: any): any {
        if(!value)return null;
        if(!start)return value;
        if(!end) return value;
        start = Date.parse(start);
        end = Date.parse(end);

        return value
        .filter(function(item) { 
        return JSON.stringify(item.timeindate) >= start && JSON.stringify(item.timeindate) <= end;
        // reverseAndTimeStamp(m.date) >= reverseAndTimeStamp(startDate) && reverseAndTimeStamp(m.date) <= reverseAndTimeStamp(endDate)
        });
        
    }
}
