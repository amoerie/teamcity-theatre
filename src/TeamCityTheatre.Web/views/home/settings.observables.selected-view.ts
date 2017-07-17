import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/operator/startWith";

import {View} from "../shared/models";

const selectedViewsSubject = new Subject<View>();
export const selectView = (view: View) => selectedViewsSubject.next(view);
export const selectedViews: Observable<View | null> = selectedViewsSubject
  .startWith(null)
  .debug("Selected view");
