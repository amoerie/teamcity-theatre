import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/startWith";
import "../shared/operators/debug";
import { View } from "../shared/models";
var savedViewsSubject = new Subject();
export var saveView = function (view) { return savedViewsSubject.next(view); };
export var savedViews = savedViewsSubject
    .switchMap(function (savedView) { return Observable.ajax
    .post("api/views", savedView, { "Content-Type": "application/json" })
    .map(function (xhr) { return xhr.response; })
    .map(View.fromContract); })
    .debug("Saved view");
