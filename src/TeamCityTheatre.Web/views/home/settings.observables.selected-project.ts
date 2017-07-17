import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "../shared/operators/debug";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";

import {IDetailedProject} from "../shared/contracts";
import {BuildConfiguration, Project} from "../shared/models";

const selectedProjectsSubject = new Subject<Project>();
export const selectProject = (project: Project) => selectedProjectsSubject.next(project);

export const selectedProjects: Observable<Project | null> = selectedProjectsSubject
  .switchMap(project => Observable.ajax.getJSON<IDetailedProject>(`api/projects/${project.id}`)
    .map(detailedProject => project.withBuildConfigurations(detailedProject.buildConfigurations.map(BuildConfiguration.fromContract)))
    .startWith(null))
  .debug("Selected project")
  .startWith(null)
  .share();
