import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

import "../shared/operators/debug";

import "rxjs/add/observable/defer";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";

import {IView} from "../shared/contracts";
import {View} from "../shared/models";
import {savedViews} from "./settings.observables.saved-view";

const updatedViewsSubject = new Subject<View>();
export const updateView = (view: View) => updatedViewsSubject.next(view);
export const updatedViews: Observable<View> = updatedViewsSubject.merge(savedViews).debug("Update view");

const initialViews = Observable.defer(() => Observable.ajax.getJSON<IView[]>("api/views"))
  .debug("Initial views")
  .map(vs => vs.map(View.fromContract))
  .startWith(null);

export const views: Observable<View[]> = initialViews.switchMap(initialVs =>
  updatedViews
    .scan((previousViews, updatedView) => previousViews === null ? null : previousViews.map(v => v.id === updatedView.id ? updatedView: v), initialVs)
    .startWith(initialVs))
  .debug("Views");