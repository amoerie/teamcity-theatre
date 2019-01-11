import {
  combineLatest as observableCombineLatest,
  defer as observableDefer,
  EMPTY,
  merge,
  Observable,
  of as observableOf,
} from "rxjs";

import { catchError, delay, filter, isEmpty, map, mergeMap, repeat, startWith, switchMap, take } from 'rxjs/operators';
import { ajax } from "rxjs/ajax";
import { IView, IViewData } from "../Shared/contracts";
import { routes } from "../Shared/observables/routes";

// fetching the initial set of views
export const allViews: Observable<IView[] | null> = observableDefer(() => ajax.getJSON<IView[]>("api/views"));

// selecting a view

// if a view is specified in the URL, select it
const selectedViewsFromUrl: Observable<IView | null> = observableCombineLatest(routes, allViews.pipe(take(1)))
  .pipe(
    map(([route, views]) => {
      if (!views || views.length == 0) return null;
      const requestedView = route.relativePathSegments[1] || "";
      if (!requestedView) return null;
      const view = views.filter(v => v.name.toLowerCase() === requestedView.toLowerCase())[0];
      return view ? view : null;
    }),
    filter(v => v != null)
  );

// on first load, if no view is defined in the URL, check if there is only view and if so, select it
const automaticallySelectedSingleView: Observable<IView | null> = selectedViewsFromUrl
  .pipe(
    isEmpty(),
    filter(isEmpty => isEmpty === true),
    switchMap(() => allViews.pipe(
      take(1),
      filter(vs => vs != null && vs.length == 1),
      map(vs => vs == null ? null : vs[0])
    ))
  )
;

export const selectedViews: Observable<IView | null> = merge(
  selectedViewsFromUrl,
  automaticallySelectedSingleView
);

// fetching the data of a view
export const selectedViewData: Observable<IViewData | null> = selectedViews.pipe(
  switchMap(
    (selectedView: IView | null) => selectedView == null
      ? EMPTY
      : merge(
        // initial fetch
        ajax.getJSON<IViewData>(`api/viewdata/${selectedView.id}`).pipe(catchError(() => EMPTY)),

        // keep polling
        observableOf(null)
          .pipe(delay(3000))
          .pipe(mergeMap(() => ajax.getJSON<IViewData>(`api/viewdata/${selectedView.id}`).pipe(catchError(() => EMPTY))))
          .pipe(repeat<IViewData | null>())
      )
  ));

// combining all of the above in a single state

export interface IDashboardState {
  views: IView[] | null;
  selectedView: IView | null;
  selectedViewData: IViewData | null;
}


export const state: Observable<IDashboardState> = observableCombineLatest(
  allViews.pipe(startWith<IView[] | null>(null)),
  selectedViews.pipe(startWith<IView | null>(null)),
  selectedViewData.pipe(startWith<IViewData | null>(null))
)
  .pipe(map(([views, selectedView, viewData]) => {
    return {
      views: views,
      selectedView: selectedView,
      selectedViewData: viewData
    };
  }));
