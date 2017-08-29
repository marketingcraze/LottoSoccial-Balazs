import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the DateLeftPipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
    name: 'dateLeft'
})
@Injectable()
export class DateLeftPipe {
  /*
    Takes a value and makes it lowercase.
   */
    transform(value, args, arg2) {
        // console.log("DateLeftPipe", value, args, arg2);

        var result: string = "";
        // console.log("TimeDifferencePipe", typeof(value));

        // current time
        let now = new Date().getTime();
        if (!value) {
            return result;
        }
        if (typeof(value) === "string") {
            value = new Date(value);
        }
        
        // time since message was sent in seconds
        let delta = Math.floor( (now - value.getTime()) / 1000 ); 
        if (delta < 0) {
            // result = "-"
            // delta = Math.abs(delta);
            return '00'
        }
        // console.log("difference", value, delta);
        
        // format string
        let day = Math.floor(delta / 86400);
        delta %= 86400
        let hour = Math.floor(delta / 3600);
        delta %= 3600
        let minute = Math.floor(delta / 60);
        delta %= 60
        let seconds = Math.floor(delta)

        let sday = (day<=9)? '0'+day : day ;
        if (args == 'dd') {
            return sday;
        }

        let shour = (hour<=9)? '0'+hour : hour;
        if (args == 'hh') {
            return shour
        }

        let sminute = (minute<=9)? '0'+minute : minute;
        if (args == 'mm') {
            return sminute
        }

        let ssecond =  (seconds<=9)? '0'+seconds : seconds ;
        if (args == 'ss') {
            return ssecond
        }
        
        result += sday + ':' + shour + ':' + sminute + ':' + ssecond;
        return result;

  }
}
