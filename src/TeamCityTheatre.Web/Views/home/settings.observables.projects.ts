import { defer as observableDefer, Observable, Subject, merge } from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';
import { debug } from "../Shared/operators/debug";

import { IBasicProject } from "../Shared/contracts";
import { Project } from "../Shared/models";
import { selectedProjects } from "./settings.observables.selected-project";
import { ajax } from 'rxjs/ajax';

const toProjects = (basicProjects: IBasicProject[]) => {
  const projects = basicProjects.map(p => new Project(p));

  const findChildren = (id: string) => projects.filter(p => p.parentProjectId === id);

  for (let project of projects) {
    project.setChildren(findChildren(project.id));
  }

  return projects;
};

const initialRootProjects: Observable<Project> = observableDefer(() => ajax.getJSON<IBasicProject[]>("api/projects")).pipe(
  map(toProjects),
  map(projects => projects.filter(p => p.parentProjectId === null)[0]),
  map(rootProject => rootProject.expand()),)
  .pipe(debug("Initial root project"));

const manualProjectUpdates = new Subject<Project>();
export const updateProject = (project: Project) => manualProjectUpdates.next(project);

const projectUpdates: Observable<Project | null> = merge(manualProjectUpdates, selectedProjects)
  .pipe(debug("Project update"));

export const rootProjects: Observable<Project> = initialRootProjects.pipe(switchMap((initialRootProject: Project) =>
  projectUpdates.pipe(
    scan<Project | null, Project>((previousRootProject: Project, projectUpdate: Project | null) => previousRootProject.update(projectUpdate), initialRootProject),
    startWith(initialRootProject),)))
  .pipe(debug("Projects"));
