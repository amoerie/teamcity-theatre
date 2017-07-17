import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/observable/defer";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { Project } from "../shared/models";
import { selectedProjects } from "./settings.observables.selected-project";
var toProjects = function (basicProjects) {
    var projects = basicProjects.map(function (p) { return new Project(p); });
    var findChildren = function (id) { return projects.filter(function (p) { return p.parentProjectId === id; }); };
    for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
        var project = projects_1[_i];
        project.setChildren(findChildren(project.id));
    }
    return projects;
};
var initialRootProjects = Observable
    .defer(function () { return Observable.ajax.getJSON("api/projects"); })
    .map(toProjects)
    .map(function (projects) { return projects.filter(function (p) { return p.parentProjectId === null; })[0]; })
    .map(function (rootProject) { return rootProject.expand(); })
    .debug("Initial root project");
var manualProjectUpdates = new Subject();
export var updateProject = function (project) { return manualProjectUpdates.next(project); };
var projectUpdates = manualProjectUpdates.merge(selectedProjects)
    .debug("Project update");
export var rootProjects = initialRootProjects.switchMap(function (initialRootProject) {
    return projectUpdates
        .scan(function (previousRootProject, projectUpdate) { return previousRootProject.update(projectUpdate); }, initialRootProject)
        .startWith(initialRootProject);
})
    .debug("Projects");
