import {createElement} from "react";
import {BuildConfiguration, Project, Tile, View} from "../shared/models";
import {updateView} from "./settings.observables.views";
import {saveView} from "./settings.observables.save-view";

export const SelectedProject = (props: { selectedProject: Project | null, selectedView: View | null }) => {
  if (props.selectedProject === null) {
    return (
      <div/>
    );
  }
  if(props.selectedView === null) {
    return (
      <div className="alert alert-info">
        <span><i className="fa fa-info-circle"/> Please select a view</span>
      </div>
    );
  }
  return (
    <div id="project-details-wrapper">
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <h2>{props.selectedProject.getLabel()} <OpenInTeamCityButton project={props.selectedProject}/></h2>
          </div>
        </div>
        <div className="panel-body">
          <ProjectDescription project={props.selectedProject}/>
          <NoBuildConfigurationsWarning project={props.selectedProject}/>
        </div>
        <BuildConfigurationsTable project={props.selectedProject} view={props.selectedView}/>
      </div>
    </div>
  );
};

const OpenInTeamCityButton = (props: { project: Project }) => (
  <a className="btn btn-info btn-sm" target="_blank"
     href={`http://vm64-teamcity-2012/project.html?projectId=${props.project.id}`}>
    <i className="fa fa-globe"/> Open in TeamCity
  </a>
);

const ProjectDescription = (props: { project: Project }) => {
  if (props.project.description === null) return null;
  return (
    <div className="well well-sm" id="project-details-description">
      {props.project.description}
    </div>
  );
};

const NoBuildConfigurationsWarning = (props: { project: Project }) => {
  if (props.project.buildConfigurations === null || props.project.buildConfigurations.length > 0)
    return null;
  return (
    <div className="alert alert-info">
      <span><i className="fa fa-info-circle"/> This project does not have build configurations</span>
    </div>
  );
};

const BuildConfigurationsTable = (props: { project: Project, view: View }) => {
  const { project, view } = props;
  if (project.buildConfigurations === null)
    return (
      <div className="panel-footer"><i className="fa fa-spin fa-cog"/> Loading build configurations</div>
    );
  return (
    <table className="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      { project.buildConfigurations.map(b => <BuildConfigurationRow buildConfiguration={b} view={view} project={project} />) }
      </tbody>
    </table>
  );
};

const handleAddTileButtonClick = (buildConfiguration: BuildConfiguration, view: View, project : Project) =>
  () => saveView(updateView(view.withTile(Tile.newTile(project, buildConfiguration))));

const BuildConfigurationRow = (props: { buildConfiguration: BuildConfiguration, view: View, project: Project }) => {
  const  { buildConfiguration, view, project} = props;
  return (
    <tr>
      <td>{buildConfiguration.name}</td>
      <td>
        <button className="btn btn-success btn-sm" onClick={handleAddTileButtonClick(buildConfiguration, view, project)}>
          <i className="fa fa-plus"/> Add tile to {view.name}
        </button>
      </td>
    </tr>
  );
};