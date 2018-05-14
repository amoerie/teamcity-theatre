import { Observable, Subject } from "rxjs-compat";

import { debug } from "../shared/operators/debug";
import "rxjs/add/operator/startWith";

import { View } from "../shared/models";
import { updatedViews } from "./settings.observables.views";

const selectedViewsSubject = new Subject<View>();
export const selectView = (view: View) => selectedViewsSubject.next(view);

export const selectedViews: Observable<View | null> = selectedViewsSubject
  .startWith(null)
  .switchMap((selectedView: View | null) => updatedViews
    .scan((previouslySelectedView: View | null, updatedView: View) =>
      previouslySelectedView !== null && previouslySelectedView.id === updatedView.id
        ? updatedView
        : previouslySelectedView, selectedView)
    .startWith(selectedView)
  )
  .pipe(debug("Selected view"));
