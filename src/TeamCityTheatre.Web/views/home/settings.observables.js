import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/defer";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { Project } from "../shared/models";
var allViews = Observable
    .defer(function () { return Observable.ajax.getJSON("api/views"); })
    .do(function (x) { return console.log("Loaded " + x.length + " views"); })
    .startWith(null);
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
    .do(function (x) { return console.log("Initial root project loaded: " + x.name); });
var selectedViewsSubject = new Subject();
export var selectView = function (view) { return selectedViewsSubject.next(view); };
var selectedViews = selectedViewsSubject
    .startWith(null)
    .do(function (x) { return console.log("Selected a view: " + JSON.stringify(x)); });
var selectedProjectsSubject = new Subject();
export var selectProject = function (project) { return selectedProjectsSubject.next(project); };
var manualProjectUpdates = new Subject();
export var updateProject = function (project) { return manualProjectUpdates.next(project); };
var selectedProjects = selectedProjectsSubject
    .switchMap(function (project) { return Observable.ajax.getJSON("api/projects/" + project.id)
    .map(function (detailedProject) { return project.withBuildConfigurations(detailedProject.buildConfigurations); })
    .startWith(null); })
    .do(function (x) { return console.log("Selected a project: " + (x ? x.name : null)); })
    .startWith(null)
    .share();
var projectUpdates = manualProjectUpdates.merge(selectedProjects)
    .do(function (x) { return console.log("Registered update for project: " + (x ? x.name : null)); });
var rootProjects = initialRootProjects.switchMap(function (initialRootProject) {
    return projectUpdates
        .scan(function (previousRootProject, projectUpdate) { return projectUpdate !== null ? previousRootProject.update(projectUpdate) : previousRootProject; }, initialRootProject)
        .startWith(initialRootProject);
})
    .do(function (x) { return console.log("New root project"); });
export var state = Observable.combineLatest(allViews, selectedViews, rootProjects, selectedProjects, function (vs, sv, rp, sp) { return ({
    views: vs,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
}); }).do(function (x) { return console.log("New state"); });
