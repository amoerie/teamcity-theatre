import {Observable} from "rxjs/Observable";
import "../shared/operators/debug";

import "rxjs/add/observable/combineLatest";

import {Project, View} from "../shared/models";

import {views} from "./settings.observables.views";
import {deleteViewRequests} from "./settings.observables.delete-view";
import {selectedViews} from "./settings.observables.selected-view";
import {rootProjects} from "./settings.observables.projects";
import {selectedProjects} from "./settings.observables.selected-project";


export interface ISettingsState {
  views: View[] | null;
  deleteViewRequest: View | null;
  selectedView: View | null;
  rootProject: Project | null;
  selectedProject: Project | null;
}

export const state: Observable<ISettingsState> = Observable.combineLatest(
  views, deleteViewRequests, selectedViews, rootProjects, selectedProjects,
  (vs, dvr, sv, rp, sp) => ({
    views: vs,
    deleteViewRequest : dvr,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
  })
  )
  .debug("State");