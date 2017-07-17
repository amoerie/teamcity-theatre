import {createElement} from "react";
import {Views} from "./settings.components.views";
import {SelectedView} from "./settings.components.selected-view";
import {Projects} from "./settings.components.projects";
import {SelectedProject} from "./settings.components.selected-project";
import {Project, View} from "../shared/models";

export const Settings = (props: { views: View[] | null, selectedView: View | null, rootProject: Project | null, selectedProject: Project | null }) => {
  const { views, selectedView, rootProject, selectedProject } = props;
  return (
    <div id="config">
      <div id="views-section" className="section row">
        <div className="col-md-4"><Views views={views} selectedView={selectedView}/></div>
        <div className="col-md-8"><SelectedView selectedView={selectedView}/></div>
      </div>
      <div id="projects-section" className="section row">
        <div className="col-md-4"><Projects rootProject={rootProject} selectedProject={selectedProject}/></div>
        <div className="col-md-8"><SelectedProject selectedProject={selectedProject} selectedView={selectedView} /></div>
      </div>
    </div>
  );
};



