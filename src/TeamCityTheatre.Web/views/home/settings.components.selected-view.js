import * as tslib_1 from "tslib";
import { createElement } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { updateView } from "./settings.observables.views";
import { saveView } from "./settings.observables.save-view";
import { stopPropagation } from "../shared/events/stopPropagation";
import { onEnter } from "../shared/events/onEnter";
export var handleOnSortEnd = function (view) { return function (sort) { return saveView(updateView(view.moveTile(sort.oldIndex, sort.newIndex))); }; };
export var SelectedView = function (props) {
    var selectedView = props.selectedView;
    if (selectedView === null)
        return createElement("div", null);
    return (createElement("div", { id: "selected-view-wrapper" },
        createElement("div", { className: "panel panel-default" },
            createElement("div", { className: "panel-heading" },
                createElement("div", { className: "panel-title" },
                    createElement("h2", null,
                        "Tiles of ",
                        selectedView.name))),
            createElement("div", { className: "panel-body" }),
            createElement(TilesList, { view: selectedView, useDragHandle: true, axis: "y", lockAxis: "y", onSortEnd: handleOnSortEnd(selectedView), helperClass: "tile-drag-helper" }))));
};
var TilesList = SortableContainer(function (props) {
    var view = props.view;
    return (createElement("ul", { className: "tiles-list list-group" }, view.tiles.map(function (t, index) { return createElement(TileRow, { view: view, tile: t, index: index }); })));
});
var TileDragHandle = SortableHandle(function () { return createElement("div", null,
    createElement("i", { className: "fa fa-bars" })); });
var TileRow = SortableElement(function (props) {
    var view = props.view, tile = props.tile;
    return (createElement("li", { className: "tile list-group-item", onDoubleClick: function () { return updateView(view.withTile(tile.withIsEditing(true))); } },
        createElement("div", { className: "tile-drag-handle" },
            createElement(TileDragHandle, null)),
        createElement("div", { className: "tile-label" },
            createElement(TileLabel, tslib_1.__assign({}, props))),
        createElement("div", { className: "tile-build-configuration" },
            createElement(TileBuildConfiguration, tslib_1.__assign({}, props))),
        createElement("div", { className: "tile-actions" },
            createElement(TileActions, tslib_1.__assign({}, props)))));
});
var TileLabel = function (props) {
    var view = props.view, tile = props.tile;
    if (tile.isEditing) {
        return createElement("input", { type: "text", name: "tile-label-input", className: "form-control", value: tile.label, onClick: stopPropagation, onChange: function (e) { return updateView(view.withTile(tile.withLabel(e.currentTarget.value))); }, onKeyUp: onEnter(function () { return saveView(view); }), autoFocus: true });
    }
    return createElement("span", null, tile.label);
};
var TileBuildConfiguration = function (props) {
    var tile = props.tile;
    return createElement("span", null, tile.buildConfigurationDisplayName);
};
var TileActions = function (props) {
    var tile = props.tile;
    if (tile.isEditing)
        return createElement("div", null,
            createElement(SaveTileButton, tslib_1.__assign({}, props)));
    return createElement("div", null,
        createElement(EditTileButton, tslib_1.__assign({}, props)),
        " ",
        createElement(DeleteTileButton, tslib_1.__assign({}, props)));
};
var handleSaveTileButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    saveView(view);
}; };
var SaveTileButton = function (props) {
    return (createElement("button", { className: "save-tile-button btn btn-success", onClick: handleSaveTileButtonClick(props.view), title: "Save" },
        createElement("i", { className: "fa fa-check" })));
};
var handleEditTileButtonClick = function (view, tile) { return function () { return updateView(view.withTile(tile.withIsEditing(true))); }; };
var EditTileButton = function (props) {
    var view = props.view, tile = props.tile;
    return (createElement("button", { className: "edit-tile-button btn btn-default", onClick: handleEditTileButtonClick(view, tile), title: "Edit" },
        createElement("i", { className: "fa fa-pencil" })));
};
var handleDeleteTileButtonClick = function (view, tile) { return function () { return saveView(updateView(view.withoutTile(tile))); }; };
var DeleteTileButton = function (props) {
    var view = props.view, tile = props.tile;
    return (createElement("button", { className: "delete-tile-button btn btn-danger", onClick: handleDeleteTileButtonClick(view, tile), title: "Delete" },
        createElement("i", { className: "fa fa-remove" })));
};
