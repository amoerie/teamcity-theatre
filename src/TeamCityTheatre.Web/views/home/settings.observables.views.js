import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/observable/defer";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { View } from "../shared/models";
import { savedViews } from "./settings.observables.saved-view";
var updatedViewsSubject = new Subject();
export var updateView = function (view) { return updatedViewsSubject.next(view); };
export var updatedViews = updatedViewsSubject.merge(savedViews).debug("Update view");
var initialViews = Observable.defer(function () { return Observable.ajax.getJSON("api/views"); })
    .debug("Initial views")
    .map(function (vs) { return vs.map(View.fromContract); })
    .startWith(null);
export var views = initialViews.switchMap(function (initialVs) {
    return updatedViews
        .scan(function (previousViews, updatedView) { return previousViews === null ? null : previousViews.map(function (v) { return v.id === updatedView.id ? updatedView : v; }); }, initialVs)
        .startWith(initialVs);
})
    .debug("Views");
