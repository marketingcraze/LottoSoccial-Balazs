import {Pipe} from '@angular/core';
 
@Pipe({
  name: 'day'
})
export class DayPipe {
  credit_filter_day:any;
  transform(value) {
   
     switch (value) {
      case "Mon" :  this.credit_filter_day="Monday";     break;
      case "Tue" :  this.credit_filter_day="Tuesday";    break;
      case "Wed" :  this.credit_filter_day="Wednesday";  break;
      case "Thu" :  this.credit_filter_day="Thursday";   break;
      case "Fri" :  this.credit_filter_day="Friday";     break;
      case "Sat" :  this.credit_filter_day="Saturday";   break;
      case "Sun" :  this.credit_filter_day="Sunday";     break;
      default :     this.credit_filter_day="Not Selected";
    }
    return this.credit_filter_day;
  }
}