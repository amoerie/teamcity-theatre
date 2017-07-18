import { createElement } from "react";
import { Views } from "./settings.components.views";
import { SelectedView } from "./settings.components.selected-view";
import { Projects } from "./settings.components.projects";
import { SelectedProject } from "./settings.components.selected-project";
export var Settings = function (props) {
    var views = props.views, deleteViewRequest = props.deleteViewRequest, selectedView = props.selectedView, rootProject = props.rootProject, selectedProject = props.selectedProject;
    return (createElement("div", { id: "config" },
        createElement("div", { id: "views-section", className: "section row" },
            createElement("div", { className: "col-md-4" },
                createElement(Views, { views: views, selectedView: selectedView, deleteViewRequest: deleteViewRequest })),
            createElement("div", { className: "col-md-8" },
                createElement(SelectedView, { selectedView: selectedView }))),
        createElement("div", { id: "projects-section", className: "section row" },
            createElement("div", { className: "col-md-4" },
                createElement(Projects, { rootProject: rootProject, selectedProject: selectedProject })),
            createElement("div", { className: "col-md-8" },
                createElement(SelectedProject, { selectedProject: selectedProject, selectedView: selectedView })))));
};
