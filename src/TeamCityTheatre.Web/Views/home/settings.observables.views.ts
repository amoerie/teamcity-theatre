import { ajax } from 'rxjs/ajax';
import { map, scan, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject, merge } from "rxjs";

import { debug } from "../Shared/operators/debug";

import { IView } from "../Shared/contracts";
import { View } from "../Shared/models";
import { savedViews } from "./settings.observables.save-view";
import { mergeById } from "../Shared/arrays/mergeById";
import { deletedViews } from "./settings.observables.delete-view";

const updatedViewsSubject = new Subject<View>();
export const updateView = (view: View) => {
  updatedViewsSubject.next(view);
  return view
};

export const updatedViews: Observable<View> = merge(updatedViewsSubject, savedViews)
  .pipe(debug("Update view"))
;

const initialViews: Observable<View[]> = deletedViews
  .pipe(startWith<View | null>(null))
  .pipe(switchMap<View | null, IView[]>(() => ajax.getJSON<IView[]>("api/views")))
  .pipe(map((vs: IView[]) => vs.map(v => View.fromContract(v))))
  .pipe(startWith<View[]>([]))
  .pipe(debug("Initial views"))
;

export const views: Observable<View[]> = initialViews
  .pipe(switchMap(initialVs => updatedViews
    .pipe(scan((previousViews: View[], updatedView: View) => mergeById(updatedView, previousViews), initialVs))
    .pipe(startWith<View[]>(initialVs))))
  .pipe(debug("Views"));