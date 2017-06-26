import { createElement } from "react";
import { selectProject } from "./settings.observables.selected-project";
import { updateProject } from "./settings.observables.projects";
export var Projects = function (props) {
    if (props.rootProject === null)
        return (createElement("div", null,
            createElement("i", { className: "fa fa-spin fa-cog" }),
            " Loading projects"));
    return (createElement("div", { id: "projects-wrapper" },
        createElement("div", { className: "panel panel-default" },
            createElement("div", { className: "panel-heading" },
                createElement("h3", { className: "panel-title" }),
                createElement("h2", null, "Available projects")),
            createElement("div", { className: "panel-body" },
                createElement("ul", { className: "list-unstyled" },
                    createElement(Project, { project: props.rootProject, selectedProject: props.selectedProject }))))));
};
// recursive components require type annotations
var Project = function (props) {
    var hasChildren = props.project.hasChildren() ? "has-children" : "";
    return (createElement("li", { id: props.project.id, className: "project " + hasChildren },
        createElement(ToggleProjectChildrenButton, { project: props.project }),
        createElement(ShowProjectDetailsButton, { project: props.project, selectedProject: props.selectedProject }),
        createElement(ProjectChildren, { project: props.project, selectedProject: props.selectedProject })));
};
var ToggleProjectChildrenButton = function (props) {
    var iconClass = props.project.isExpanded ? "fa fa-minus-circle" : "fa fa-plus-circle";
    return (createElement("button", { className: "toggle-children-button btn btn-sm btn-default", onClick: function () { return updateProject(props.project.toggleExpandOrCollapse()); } },
        createElement("i", { className: iconClass })));
};
var ShowProjectDetailsButton = function (props) {
    var buttonClass = props.project === props.selectedProject ? "btn-primary" : "btn-default";
    return (createElement("button", { className: "project-name btn btn-sm " + buttonClass, onClick: function () { return selectProject(props.project); } }, props.project.name));
};
var ProjectChildren = function (props) {
    if (!props.project.isExpanded)
        return null;
    if (!props.project.hasChildren())
        return null;
    return (createElement("ul", { className: "project-children" }, props.project.children.map(function (c) { return createElement(Project, { project: c, selectedProject: props.selectedProject }); })));
};
