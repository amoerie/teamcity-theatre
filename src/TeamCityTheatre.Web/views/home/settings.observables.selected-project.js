import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
var selectedProjectsSubject = new Subject();
export var selectProject = function (project) { return selectedProjectsSubject.next(project); };
export var selectedProjects = selectedProjectsSubject
    .switchMap(function (project) { return Observable.ajax.getJSON("api/projects/" + project.id)
    .map(function (detailedProject) { return project.withBuildConfigurations(detailedProject.buildConfigurations); })
    .startWith(null); })
    .debug("Selected project")
    .startWith(null)
    .share();
