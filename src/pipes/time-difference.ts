import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeDiffer',
    pure: false
})
export class TimeDifferencePipe implements PipeTransform {
    transform(value: any, args:string[]): string {
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
            result = "-"
            delta = Math.abs(delta);
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


        if (day > 0) {
            result +=  (day<9)? '0'+day+':' : day+':' ;
        }
        result +=  (hour<9)? '0'+hour+':' : hour+':' ;
        result +=  (minute<9)? '0'+minute+':' : minute+':' ;
        result +=  (seconds<9)? '0'+seconds : seconds ;

        return result;
    }
}
