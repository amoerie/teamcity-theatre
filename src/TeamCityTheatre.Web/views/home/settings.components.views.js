import { createElement } from "react";
import { selectView } from "./settings.observables.selected-view";
export var Views = function (props) {
    if (props.views === null)
        return (createElement("div", null,
            createElement("i", { className: "fa fa-spin fa-cog" }),
            " Loading views"));
    return (createElement("div", { id: "views-wrapper" },
        createElement("div", { className: "panel panel-primary" },
            createElement("div", { className: "panel-heading" },
                createElement("h2", null, "Views")),
            createElement("div", { className: "panel-body" },
                createElement("div", null,
                    createElement(CreateViewButton, null))),
            createElement(ViewsTable, { views: props.views, selectedView: props.selectedView }))));
};
var CreateViewButton = function (props) { return (createElement("button", { className: "add-view-button btn btn-success", onClick: function () {
    } },
    createElement("i", { className: "fa fa-plus" }),
    " Create a new view")); };
var ViewsTable = function (props) {
    return (createElement("table", { id: "views-table", className: "table table-striped" },
        createElement("thead", null,
            createElement("tr", null,
                createElement("th", null, "Name"),
                createElement("th", null))),
        createElement("tbody", null, props.views.map(function (view) { return createElement(ViewRow, { view: view, selectedView: props.selectedView }); }))));
};
var ViewRow = function (props) {
    var isSelected = props.view === props.selectedView;
    var selectedClassName = isSelected ? "selected" : "";
    return (createElement("tr", { className: "view " + selectedClassName },
        createElement("td", { className: "view-name", onClick: function () { return selectView(props.view); } }, props.view.name),
        createElement("td", null,
            createElement(ConfigureViewButton, { view: props.view }),
            createElement(EditViewButton, { view: props.view }),
            createElement(DeleteViewButton, { view: props.view }))));
};
var ConfigureViewButton = function (props) { return (createElement("button", { className: "configure-view-button btn btn-primary", onClick: function () { return selectView(props.view); } },
    createElement("i", { className: "fa fa-cogs" }),
    " Configure")); };
var EditViewButton = function (props) { return (createElement("button", { className: "edit-view-button btn btn-default", onClick: function () {
    }, title: "Edit" },
    createElement("i", { className: "fa fa-pencil" }))); };
var DeleteViewButton = function (props) { return (createElement("button", { className: "delete-view-button btn btn-danger", onClick: function () {
    }, title: "Delete" },
    createElement("i", { className: "fa fa-remove" }))); };
