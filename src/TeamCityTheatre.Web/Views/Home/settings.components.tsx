import {createElement} from "react";
import {Views} from "./settings.components.views";
import {SelectedView} from "./settings.components.selected-view";
import {Projects} from "./settings.components.projects";
import {SelectedProject} from "./settings.components.selected-project";
import {ISettingsState} from "./settings.observables";

export const Settings = (props: ISettingsState) => {
  const { views, deleteViewRequest, selectedView, rootProject, selectedProject } = props;
  return (
    <div id="config">
      <div id="views-section" className="section row">
        <div className="col-md-5"><Views views={views} selectedView={selectedView} deleteViewRequest={deleteViewRequest}/></div>
        <div className="col-md-7"><SelectedView selectedView={selectedView}/></div>
      </div>
      <div id="projects-section" className="section row">
        <div className="col-md-5"><Projects rootProject={rootProject} selectedProject={selectedProject}/></div>
        <div className="col-md-7"><SelectedProject selectedProject={selectedProject} selectedView={selectedView} /></div>
      </div>
    </div>
  );
};



