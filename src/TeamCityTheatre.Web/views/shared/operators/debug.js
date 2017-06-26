import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
var isProduction = process && process.env && process.env.NODE_ENV === "production";
var debug = function (name) {
    if (isProduction)
        return this;
    return this
        .do({
        next: function (value) {
            console.group("Next     : " + name);
            console.dir(value);
            console.groupEnd();
        },
        error: function (error) {
            console.group("Error    : " + name);
            console.dir(error);
            console.groupEnd();
        },
        complete: function () { return console.log("Complete : " + name); }
    });
};
Observable.prototype.debug = debug;
