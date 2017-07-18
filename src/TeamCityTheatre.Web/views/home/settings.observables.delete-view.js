import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "../shared/operators/debug";
var requestDeleteViewSubject = new Subject();
export var requestDeleteView = function (view) { return requestDeleteViewSubject.next(view); };
export var deleteViewRequests = requestDeleteViewSubject.startWith(null);
var confirmDeleteViewSubject = new Subject();
export var confirmDeleteView = function (view) { return confirmDeleteViewSubject.next(view); };
export var deletedViews = confirmDeleteViewSubject
    .switchMap(function (view) { return Observable.ajax
    .delete("api/views/" + view.id)
    .map(function (xhr) { return view; }); })
    .debug("Deleted view")
    .share();
