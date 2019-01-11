import { map, share, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject } from "rxjs";

import { debug } from "../Shared/operators/debug";
import { IDetailedProject } from "../Shared/contracts";
import { BuildConfiguration, Project } from "../Shared/models";
import { ajax } from "rxjs/ajax";

const selectedProjectsSubject = new Subject<Project>();
export const selectProject = (project: Project) => selectedProjectsSubject.next(project);

export const selectedProjects: Observable<Project | null> = selectedProjectsSubject.pipe(
  switchMap(project => ajax.getJSON<IDetailedProject>(`api/projects/${project.id}`).pipe(
    map(detailedProject => project.withBuildConfigurations(detailedProject.buildConfigurations.map(BuildConfiguration.fromContract))),
    startWith<Project | null>(null))),
  debug("Selected project"),
  startWith<Project | null>(null),
  share()
);
