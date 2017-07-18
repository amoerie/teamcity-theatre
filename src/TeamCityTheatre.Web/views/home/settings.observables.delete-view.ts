import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "../shared/operators/debug";

import {View} from "../shared/models";

const requestDeleteViewSubject = new Subject<View | null>();
export const requestDeleteView = (view: View | null) => requestDeleteViewSubject.next(view);
export const deleteViewRequests : Observable<View | null> = requestDeleteViewSubject.startWith(null);

const confirmDeleteViewSubject = new Subject<View>();
export const confirmDeleteView = (view: View) => confirmDeleteViewSubject.next(view);
export const deletedViews = confirmDeleteViewSubject
  .switchMap(view => Observable.ajax
    .delete(`api/views/${view.id}`)
    .map(xhr => view))
  .debug("Deleted view")
  .share();