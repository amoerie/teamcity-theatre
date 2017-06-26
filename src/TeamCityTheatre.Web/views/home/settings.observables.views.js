import { Observable } from "rxjs/Observable";
import "../shared/operators/debug";
import "rxjs/add/observable/defer";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/startWith";
export var views = Observable.defer(function () { return Observable.ajax.getJSON("api/views"); })
    .debug("All views")
    .startWith(null);
