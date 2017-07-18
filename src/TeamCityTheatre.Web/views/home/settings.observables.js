import { Observable } from "rxjs/Observable";
import "../shared/operators/debug";
import "rxjs/add/observable/combineLatest";
import { views } from "./settings.observables.views";
import { deleteViewRequests } from "./settings.observables.delete-view";
import { selectedViews } from "./settings.observables.selected-view";
import { rootProjects } from "./settings.observables.projects";
import { selectedProjects } from "./settings.observables.selected-project";
export var state = Observable.combineLatest(views, deleteViewRequests, selectedViews, rootProjects, selectedProjects, function (vs, dvr, sv, rp, sp) { return ({
    views: vs,
    deleteViewRequest: dvr,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
}); })
    .debug("State");
