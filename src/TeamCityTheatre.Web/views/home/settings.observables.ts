import {Observable} from "rxjs/Observable";
import "../shared/operators/debug";

import "rxjs/add/observable/combineLatest";

import {IView} from "../shared/contracts";
import {Project} from "../shared/models";

import {views} from "./settings.observables.views";
import {selectedViews} from "./settings.observables.selected-view";
import {rootProjects} from "./settings.observables.projects";
import {selectedProjects} from "./settings.observables.selected-project";

export interface ISettingsState {
  views: IView[] | null;
  selectedView: IView | null;
  rootProject: Project | null;
  selectedProject: Project | null;
}

export const state: Observable<ISettingsState> = Observable.combineLatest(
  views, selectedViews, rootProjects, selectedProjects,
  (vs, sv, rp, sp) => ({
    views: vs,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
  })
  )
  .debug("State");