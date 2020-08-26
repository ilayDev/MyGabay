import { Pipe, PipeTransform } from '@angular/core';
import { Days, Months } from '../models/hebDates';

@Pipe({
    name:'hebDate'
})
export class HebDatePipe implements PipeTransform{
    
    transform(date: any, ...args: any[]) {
        let hebDay = Days[date.day];
        let hebMonth = Months[date.month];
        let hebDate = hebDay + " " + hebMonth;
        return hebDate;
    }
    
}