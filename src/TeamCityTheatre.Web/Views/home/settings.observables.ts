import { combineLatest as observableCombineLatest, Observable } from 'rxjs';
import { debug } from "../Shared/operators/debug";

import { Project, View } from "../Shared/models";

import { views } from "./settings.observables.views";
import { deleteViewRequests } from "./settings.observables.delete-view";
import { selectedViews } from "./settings.observables.selected-view";
import { rootProjects } from "./settings.observables.projects";
import { selectedProjects } from "./settings.observables.selected-project";


export interface ISettingsState {
  views: View[] | null;
  deleteViewRequest: View | null;
  selectedView: View | null;
  rootProject: Project | null;
  selectedProject: Project | null;
}

export const state: Observable<ISettingsState> = observableCombineLatest(
  views, deleteViewRequests, selectedViews, rootProjects, selectedProjects,
  (vs, dvr, sv, rp, sp) => ({
    views: vs,
    deleteViewRequest: dvr,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
  })
)
  .pipe(debug("State"));