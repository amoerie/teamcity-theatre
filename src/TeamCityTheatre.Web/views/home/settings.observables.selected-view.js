import { Subject } from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/operator/startWith";
import { updatedViews } from "./settings.observables.views";
var selectedViewsSubject = new Subject();
export var selectView = function (view) { return selectedViewsSubject.next(view); };
export var selectedViews = selectedViewsSubject
    .startWith(null)
    .switchMap(function (selectedView) { return updatedViews
    .scan(function (previouslySelectedView, updatedView) {
    return previouslySelectedView !== null && previouslySelectedView.id === updatedView.id
        ? updatedView
        : previouslySelectedView;
}, selectedView)
    .startWith(selectedView); })
    .debug("Selected view");
