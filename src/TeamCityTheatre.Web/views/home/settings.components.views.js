import { createElement } from "react";
import { View } from "../shared/models";
import { selectView } from "./settings.observables.selected-view";
import { updateView } from "./settings.observables.views";
import { saveView } from "./settings.observables.save-view";
import { onEnter } from "../shared/events/onEnter";
import { stopPropagation } from "../shared/events/stopPropagation";
import { confirmDeleteView, requestDeleteView } from "./settings.observables.delete-view";
export var Views = function (props) {
    var views = props.views, selectedView = props.selectedView, deleteViewRequest = props.deleteViewRequest;
    if (views === null)
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
            createElement(ViewsTable, { views: views, selectedView: selectedView, deleteViewRequest: deleteViewRequest }))));
};
var handleCreateViewButtonClick = function () { return updateView(View.newView()); };
var CreateViewButton = function (props) { return (createElement("button", { className: "add-view-button btn btn-success", onClick: handleCreateViewButtonClick },
    createElement("i", { className: "fa fa-plus" }),
    " Create a new view")); };
var ViewsTable = function (props) {
    return (createElement("table", { id: "views-table", className: "table table-striped" },
        createElement("thead", null,
            createElement("tr", null,
                createElement("th", null, "Name"),
                createElement("th", null, "# Branches per tile"),
                createElement("th", null))),
        createElement("tbody", null, props.views.map(function (view) { return createElement(ViewRow, { view: view, selectedView: props.selectedView, deleteViewRequest: props.deleteViewRequest }); }))));
};
var ViewRow = function (props) {
    var view = props.view, selectedView = props.selectedView, deleteViewRequest = props.deleteViewRequest;
    var isSelected = view === selectedView;
    var selectedClassName = isSelected ? "selected" : "";
    return (createElement("tr", { className: "view " + selectedClassName, onClick: function () { return selectView(props.view); }, onDoubleClick: function () { return updateView(props.view.withIsEditing(true)); } },
        createElement("td", { className: "view-name" },
            createElement(ViewName, { view: props.view })),
        createElement("td", { className: "view-branches-per-tile" },
            createElement(DefaultNumberOfBranchesPerTile, { view: props.view })),
        createElement("td", null,
            createElement(ViewActions, { view: view, deleteViewRequest: deleteViewRequest }))));
};
var ViewName = function (props) {
    if (props.view.isEditing)
        return createElement("input", { type: "text", name: "view-name-input", className: "form-control", value: props.view.name, onClick: stopPropagation, onChange: function (event) { return updateView(props.view.withName(event.currentTarget.value)); }, onKeyUp: onEnter(function () { return saveView(props.view); }) });
    return createElement("span", null, props.view.name);
};
var DefaultNumberOfBranchesPerTile = function (props) {
    if (props.view.isEditing)
        return createElement("input", { type: "number", name: "view-branches-per-tile-input", className: "form-control", value: props.view.defaultNumberOfBranchesPerTile, onClick: stopPropagation, onChange: function (event) { return updateView(props.view.withDefaultNumberOfBranchesPerTile(+event.currentTarget.value)); }, onKeyUp: onEnter(function () { return saveView(props.view); }) });
    return createElement("span", null, props.view.defaultNumberOfBranchesPerTile);
};
var ViewActions = function (props) {
    var view = props.view, deleteViewRequest = props.deleteViewRequest;
    if (deleteViewRequest !== null && view === deleteViewRequest) {
        return (createElement("div", null,
            createElement("h4", null, "Are you sure?"),
            createElement(ConfirmDeleteViewButton, { view: deleteViewRequest }),
            " ",
            createElement(CancelDeleteViewButton, null)));
    }
    if (view.isEditing) {
        return createElement(SaveViewButton, { view: props.view });
    }
    return createElement("span", null,
        createElement(EditViewButton, { view: props.view }),
        " ",
        createElement(DeleteViewButton, { view: props.view }));
};
var handleSaveViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    saveView(view);
}; };
var SaveViewButton = function (props) { return (createElement("button", { className: "save-view-button btn btn-success", onClick: handleSaveViewButtonClick(props.view), title: "Save" },
    createElement("i", { className: "fa fa-check" }))); };
var handleEditViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    updateView(view.withIsEditing(true));
}; };
var EditViewButton = function (props) { return (createElement("button", { className: "edit-view-button btn btn-default", onClick: handleEditViewButtonClick(props.view), title: "Edit" },
    createElement("i", { className: "fa fa-pencil" }))); };
var handleDeleteViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    requestDeleteView(view);
}; };
var DeleteViewButton = function (props) { return (createElement("button", { className: "delete-view-button btn btn-danger", onClick: handleDeleteViewButtonClick(props.view), title: "Delete" },
    createElement("i", { className: "fa fa-remove" }))); };
var handleConfirmDeleteViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    confirmDeleteView(view);
}; };
var ConfirmDeleteViewButton = function (props) {
    var view = props.view;
    return (createElement("button", { className: "confirm-delete-view-button btn btn-danger", onClick: handleConfirmDeleteViewButtonClick(view), title: "Delete" }, "Yes, remove it"));
};
var handleCancelDeleteViewButtonClick = function (event) {
    event.stopPropagation();
    requestDeleteView(null);
};
var CancelDeleteViewButton = function (props) { return (createElement("button", { className: "cancel-delete-view-button btn btn-default", onClick: handleCancelDeleteViewButtonClick, title: "Cancel" }, "No, keep it")); };
