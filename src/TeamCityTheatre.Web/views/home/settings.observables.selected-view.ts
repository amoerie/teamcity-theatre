import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/operator/startWith";

import {IView} from "../shared/contracts";

const selectedViewsSubject = new Subject<IView>();
export const selectView = (view: IView) => selectedViewsSubject.next(view);
export const selectedViews: Observable<IView> = selectedViewsSubject
  .startWith(null)
  .debug("Selected view");
