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
import { savedViews } from "./settings.observables.save-view";
import { mergeById } from "../shared/arrays/mergeById";
import { deletedViews } from "./settings.observables.delete-view";
var updatedViewsSubject = new Subject();
export var updateView = function (view) { updatedViewsSubject.next(view); return view; };
export var updatedViews = updatedViewsSubject.merge(savedViews).debug("Update view");
var initialViews = deletedViews // every time a view is deleted, we fetch the list of views again
    .startWith({})
    .switchMap(function () { return Observable.ajax.getJSON("api/views"); })
    .map(function (vs) { return vs.map(View.fromContract); })
    .startWith([])
    .debug("Initial views");
export var views = initialViews.switchMap(function (initialVs) {
    return updatedViews
        .scan(function (previousViews, updatedView) { return mergeById(updatedView, previousViews); }, initialVs)
        .startWith(initialVs);
})
    .debug("Views");
