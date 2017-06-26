import {Observable} from "rxjs/Observable";
import "../shared/operators/debug";

import "rxjs/add/observable/defer";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/startWith";

import {IView} from "../shared/contracts";

export const views: Observable<IView[] | null> = Observable.defer(() => Observable.ajax.getJSON<IView[]>("api/views"))
  .debug("All views")
  .startWith(null);