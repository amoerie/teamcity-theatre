import { createElement } from "react";
export var SelectedProject = function (props) {
    if (props.selectedProject === null) {
        return (createElement("div", null));
    }
    if (props.selectedView === null) {
        return (createElement("div", { className: "alert alert-info" },
            createElement("span", null,
                createElement("i", { className: "fa fa-info-circle" }),
                " Please select a view")));
    }
    return (createElement("div", { id: "project-details-wrapper" },
        createElement("div", { className: "panel panel-default" },
            createElement("div", { className: "panel-heading" },
                createElement("div", { className: "panel-title" },
                    createElement("h2", null,
                        props.selectedProject.getLabel(),
                        " ",
                        createElement(OpenInTeamCityButton, { project: props.selectedProject })))),
            createElement("div", { className: "panel-body" },
                createElement(ProjectDescription, { project: props.selectedProject }),
                createElement(NoBuildConfigurationsWarning, { project: props.selectedProject })),
            createElement(BuildConfigurationsTable, { project: props.selectedProject, view: props.selectedView }))));
};
var OpenInTeamCityButton = function (props) { return (createElement("a", { className: "btn btn-info btn-sm", target: "_blank", href: "http://vm64-teamcity-2012/project.html?projectId=" + props.project.id },
    createElement("i", { className: "fa fa-globe" }),
    " Open in TeamCity")); };
var ProjectDescription = function (props) {
    if (props.project.description === null)
        return null;
    return (createElement("div", { className: "well well-sm", id: "project-details-description" }, props.project.description));
};
var NoBuildConfigurationsWarning = function (props) {
    if (props.project.buildConfigurations === null || props.project.buildConfigurations.length > 0)
        return null;
    return (createElement("div", { className: "alert alert-info" },
        createElement("span", null,
            createElement("i", { className: "fa fa-info-circle" }),
            " This project does not have build configurations")));
};
var BuildConfigurationsTable = function (props) {
    if (props.project.buildConfigurations === null)
        return (createElement("div", { className: "panel-footer" },
            createElement("i", { className: "fa fa-spin fa-cog" }),
            " Loading build configurations"));
    return (createElement("table", { className: "table table-striped" },
        createElement("thead", null,
            createElement("tr", null,
                createElement("th", null, "Name"),
                createElement("th", null))),
        createElement("tbody", null, props.project.buildConfigurations.map(function (b) { return createElement(BuildConfigurationRow, { buildConfiguration: b, view: props.view }); }))));
};
var BuildConfigurationRow = function (props) {
    return (createElement("tr", null,
        createElement("td", null, props.buildConfiguration.name),
        createElement("td", null,
            createElement("button", { className: "btn btn-success btn-sm" },
                createElement("i", { className: "fa fa-plus" }),
                " Add tile to ",
                props.view.name))));
};
