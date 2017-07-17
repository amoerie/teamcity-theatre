import {createElement, StatelessComponent} from "react";
import {Project as ProjectModel} from "../shared/models";
import {selectProject} from "./settings.observables.selected-project";
import {updateProject} from "./settings.observables.projects";

export const Projects = (props: { rootProject: ProjectModel | null, selectedProject: ProjectModel | null }) => {
  if (props.rootProject === null) return (
    <div><i className="fa fa-spin fa-cog"/> Loading projects</div>
  );
  return (
    <div id="projects-wrapper">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
          </h3><h2>Available projects</h2>
        </div>
        <div className="panel-body">
          <ul className="list-unstyled">
            <Project project={props.rootProject} selectedProject={props.selectedProject}/>
          </ul>
        </div>
      </div>
    </div>
  );
};

// recursive components require type annotations
const Project: StatelessComponent<{ project: ProjectModel, selectedProject: ProjectModel | null }>
  = props => {
  const { project, selectedProject } = props;
  const hasChildren = project.hasChildren() ? "has-children" : "";
  return (
    <li id={project.id} className={`project ${hasChildren}`}>
      <ToggleProjectChildrenButton project={project}/>
      <ShowProjectDetailsButton project={project} selectedProject={selectedProject}/>
      <ProjectChildren project={project} selectedProject={selectedProject}/>
    </li>
  );
};

const ToggleProjectChildrenButton = (props: { project: ProjectModel }) => {
  const iconClass = props.project.isExpanded ? "fa fa-minus-circle" : "fa fa-plus-circle";
  return (
    <button className="toggle-children-button btn btn-xs btn-default"
            onClick={() => updateProject(props.project.toggleExpandOrCollapse())}>
      <i className={iconClass}/>
    </button>
  );
};

const ShowProjectDetailsButton = (props: { project: ProjectModel, selectedProject: ProjectModel | null }) => {
  const buttonClass = props.project === props.selectedProject ? "btn-primary" : "btn-default";
  return (
    <button className={`project-name btn btn-xs ${buttonClass}`} onClick={() => selectProject(props.project)}>
      {props.project.name}
    </button>
  );
};

const ProjectChildren = (props: { project: ProjectModel, selectedProject: ProjectModel | null }) => {
  if (!props.project.isExpanded) return null;
  if (!props.project.hasChildren()) return null;
  return (
    <ul className="project-children">
      { props.project.children.map(c => <Project project={c} selectedProject={props.selectedProject}/>) }
    </ul>
  );
};