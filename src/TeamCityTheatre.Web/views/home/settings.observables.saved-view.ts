import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "../shared/operators/debug";

import {View} from "../shared/models";
import {IView} from "../shared/contracts";

const savedViewsSubject = new Subject<View>();
export const saveView = (view: View) => savedViewsSubject.next(view);
export const savedViews: Observable<View> = savedViewsSubject
  .switchMap(savedView => Observable.ajax
    .post("api/views", savedView, { "Content-Type": "application/json" })
    .map(xhr => xhr.response as IView)
    .map(View.fromContract)
  )
  .debug("Saved view")
  .share();
