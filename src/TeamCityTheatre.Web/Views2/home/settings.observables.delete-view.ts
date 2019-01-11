import { map, startWith, share, switchMap } from 'rxjs/operators';
import { Observable, Subject } from "rxjs";

import { debug } from "../Shared/operators/debug";

import { View } from "../Shared/models";
import { ajax } from "rxjs/ajax";

const requestDeleteViewSubject = new Subject<View | null>();
export const requestDeleteView = (view: View | null) => requestDeleteViewSubject.next(view);
export const deleteViewRequests: Observable<View | null> = requestDeleteViewSubject.pipe(startWith<View | null>(null));

const confirmDeleteViewSubject = new Subject<View>();
export const confirmDeleteView = (view: View) => confirmDeleteViewSubject.next(view);
export const deletedViews : Observable<View> = confirmDeleteViewSubject.pipe(
  switchMap(view => ajax.delete(`api/views/${view.id}`).pipe(map(xhr => view))),
  debug("Deleted view"),
  share()
);