import { Subject } from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/operator/startWith";
var selectedViewsSubject = new Subject();
export var selectView = function (view) { return selectedViewsSubject.next(view); };
export var selectedViews = selectedViewsSubject
    .startWith(null)
    .debug("Selected view");
