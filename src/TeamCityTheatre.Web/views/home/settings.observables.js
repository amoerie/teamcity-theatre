import { Observable } from "rxjs/Observable";
import "../shared/operators/debug";
import "rxjs/add/observable/combineLatest";
import { views } from "./settings.observables.views";
import { selectedViews } from "./settings.observables.selected-view";
import { rootProjects } from "./settings.observables.projects";
import { selectedProjects } from "./settings.observables.selected-project";
export var state = Observable.combineLatest(views, selectedViews, rootProjects, selectedProjects, function (vs, sv, rp, sp) { return ({
    views: vs,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
}); })
    .debug("State");
