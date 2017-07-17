import {createElement} from "react";
import {Views} from "./settings.components.views";
import {SelectedView} from "./settings.components.selected-view";
import {Projects} from "./settings.components.projects";
import {SelectedProject} from "./settings.components.selected-project";
import {Project, View} from "../shared/models";

export const Settings = (props: { views: View[] | null, selectedView: View | null, rootProject: Project | null, selectedProject: Project | null }) => {
  return (
    <div id="config">
      <div id="views-section" className="section row">
        <div className="col-md-4"><Views views={props.views} selectedView={props.selectedView}/></div>
        <div className="col-md-8"><SelectedView selectedView={props.selectedView}/></div>
      </div>
      <div id="projects-section" className="section row">
        <div className="col-md-4"><Projects rootProject={props.rootProject} selectedProject={props.selectedProject}/></div>
        <div className="col-md-8"><SelectedProject selectedProject={props.selectedProject} selectedView={props.selectedView} /></div>
      </div>
    </div>
  );
};



