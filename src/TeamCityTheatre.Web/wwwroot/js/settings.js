webpackJsonp([0],{

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Projects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_observables_selected_project__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_observables_projects__ = __webpack_require__(49);



var Projects = function (props) {
    if (props.rootProject === null)
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading projects"));
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "projects-wrapper" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel panel-default" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-heading" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h3", { className: "panel-title" }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h2", null, "Available projects")),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-body" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("ul", { className: "list-unstyled" },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Project, { project: props.rootProject, selectedProject: props.selectedProject }))))));
};
// recursive components require type annotations
var Project = function (props) {
    var hasChildren = props.project.hasChildren() ? "has-children" : "";
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("li", { id: props.project.id, className: "project " + hasChildren },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ToggleProjectChildrenButton, { project: props.project }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ShowProjectDetailsButton, { project: props.project, selectedProject: props.selectedProject }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ProjectChildren, { project: props.project, selectedProject: props.selectedProject })));
};
var ToggleProjectChildrenButton = function (props) {
    var iconClass = props.project.isExpanded ? "fa fa-minus-circle" : "fa fa-plus-circle";
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "toggle-children-button btn btn-sm btn-default", onClick: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__settings_observables_projects__["a" /* updateProject */])(props.project.toggleExpandOrCollapse()); } },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: iconClass })));
};
var ShowProjectDetailsButton = function (props) {
    var buttonClass = props.project === props.selectedProject ? "btn-primary" : "btn-default";
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "project-name btn btn-sm " + buttonClass, onClick: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__settings_observables_selected_project__["a" /* selectProject */])(props.project); } }, props.project.name));
};
var ProjectChildren = function (props) {
    if (!props.project.isExpanded)
        return null;
    if (!props.project.hasChildren())
        return null;
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("ul", { className: "project-children" }, props.project.children.map(function (c) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Project, { project: c, selectedProject: props.selectedProject }); })));
};


/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedProject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

var SelectedProject = function (props) {
    if (props.selectedProject === null) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null));
    }
    if (props.selectedView === null) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "alert alert-info" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-info-circle" }),
                " Please select a view")));
    }
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "project-details-wrapper" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel panel-default" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-heading" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-title" },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h2", null,
                        props.selectedProject.getLabel(),
                        " ",
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(OpenInTeamCityButton, { project: props.selectedProject })))),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-body" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ProjectDescription, { project: props.selectedProject }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(NoBuildConfigurationsWarning, { project: props.selectedProject })),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(BuildConfigurationsTable, { project: props.selectedProject, view: props.selectedView }))));
};
var OpenInTeamCityButton = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("a", { className: "btn btn-info btn-sm", target: "_blank", href: "http://vm64-teamcity-2012/project.html?projectId=" + props.project.id },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-globe" }),
    " Open in TeamCity")); };
var ProjectDescription = function (props) {
    if (props.project.description === null)
        return null;
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "well well-sm", id: "project-details-description" }, props.project.description));
};
var NoBuildConfigurationsWarning = function (props) {
    if (props.project.buildConfigurations === null || props.project.buildConfigurations.length > 0)
        return null;
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "alert alert-info" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-info-circle" }),
            " This project does not have build configurations")));
};
var BuildConfigurationsTable = function (props) {
    if (props.project.buildConfigurations === null)
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-footer" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading build configurations"));
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("table", { className: "table table-striped" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("thead", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "Name"),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null))),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tbody", null, props.project.buildConfigurations.map(function (b) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(BuildConfigurationRow, { buildConfiguration: b, view: props.view }); }))));
};
var BuildConfigurationRow = function (props) {
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null, props.buildConfiguration.name),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "btn btn-success btn-sm" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-plus" }),
                " Add tile to ",
                props.view.name))));
};


/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

var SelectedView = function (props) {
    if (props.selectedView === null)
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null);
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "view-details" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel panel-default" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-heading" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-title" },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h2", null,
                        "Tiles of ",
                        props.selectedView.name))),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-body" }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(TilesTable, { view: props.selectedView }))));
};
var TilesTable = function (props) {
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("table", { className: "table table-striped" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("thead", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "Label"),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "Build configuration"),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null))),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tbody", null, props.view.tiles.map(function (tile) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(TileRow, { view: props.view, tile: tile }); }))));
};
var TileRow = function (props) {
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null, props.tile.label),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null, props.tile.buildConfigurationDisplayName),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(EditTileButton, { view: props.view, tile: props.tile }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(DeleteTileButton, { view: props.view, tile: props.tile }))));
};
var EditTileButton = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "edit-tile-button btn btn-default", onClick: function () {
    }, title: "Edit" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-pencil" }))); };
var DeleteTileButton = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "delete-tile-button btn btn-danger", onClick: function () {
    }, title: "Delete" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-remove" }))); };


/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Views; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_observables_selected_view__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_observables_views__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__ = __webpack_require__(142);





var Views = function (props) {
    if (props.views === null)
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading views"));
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "views-wrapper" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel panel-primary" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-heading" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h2", null, "Views")),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-body" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(CreateViewButton, null))),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ViewsTable, { views: props.views, selectedView: props.selectedView }))));
};
var handleCreateViewButtonClick = function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(new __WEBPACK_IMPORTED_MODULE_1__shared_models__["b" /* View */]({
        id: "00000000-0000-0000-0000-000000000000",
        name: "New view",
        defaultNumberOfBranchesPerTile: 3,
        isEditing: true,
        tiles: []
    }));
};
var CreateViewButton = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "add-view-button btn btn-success", onClick: handleCreateViewButtonClick },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-plus" }),
    " Create a new view")); };
var ViewsTable = function (props) {
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("table", { id: "views-table", className: "table table-striped" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("thead", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "Name"),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "# Branches per tile"),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null))),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tbody", null, props.views.map(function (view) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ViewRow, { view: view, selectedView: props.selectedView }); }))));
};
var ViewRow = function (props) {
    var isSelected = props.view === props.selectedView;
    var selectedClassName = isSelected ? "selected" : "";
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", { className: "view " + selectedClassName, onClick: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__settings_observables_selected_view__["a" /* selectView */])(props.view); }, onDoubleClick: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(props.view.withIsEditing(true)); } },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", { className: "view-name" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ViewName, { view: props.view })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", { className: "view-branches-per-tile" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(DefaultNumberOfBranchesPerTile, { view: props.view })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null,
            props.view.isEditing ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(SaveViewButton, { view: props.view }) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(EditViewButton, { view: props.view }),
            " ",
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(DeleteViewButton, { view: props.view }))));
};
var ViewName = function (props) {
    if (props.view.isEditing)
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("input", { type: "text", name: "view-name-input", className: "form-control", value: props.view.name, onClick: function (event) { return event.stopPropagation(); }, onChange: function (event) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(props.view.withName(event.currentTarget.value)); }, onKeyUp: function (event) { return event.keyCode === 13 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(props.view) : {}; } });
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null, props.view.name);
};
var DefaultNumberOfBranchesPerTile = function (props) {
    if (props.view.isEditing)
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("input", { type: "number", name: "view-branches-per-tile-input", className: "form-control", value: props.view.defaultNumberOfBranchesPerTile, onClick: function (event) { return event.stopPropagation(); }, onChange: function (event) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(props.view.withDefaultNumberOfBranchesPerTile(+event.currentTarget.value)); }, onKeyUp: function (event) { return event.keyCode === 13 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(props.view) : {}; } });
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null, props.view.defaultNumberOfBranchesPerTile);
};
var handleSaveViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(view);
}; };
var SaveViewButton = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "save-view-button btn btn-success", onClick: handleSaveViewButtonClick(props.view), title: "Save" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-check" }))); };
var handleEditViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(view.withIsEditing(true));
}; };
var EditViewButton = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "edit-view-button btn btn-default", onClick: handleEditViewButtonClick(props.view), title: "Edit" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-pencil" }))); };
var DeleteViewButton = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "delete-view-button btn btn-danger", onClick: function () { }, title: "Delete" },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-remove" }))); };


/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_components__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__erroralert_components__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_observables__ = __webpack_require__(54);






var root = document.getElementById("root");
__WEBPACK_IMPORTED_MODULE_5__settings_observables__["a" /* state */].subscribe({
    next: function (s) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_3__settings_components__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, s)), root); },
    error: function (err) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_4__erroralert_components__["a" /* ErrorAlert */], { error: err }), root); }
});


/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return updateView; });
/* unused harmony export updatedViews */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return views; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_operators_debug__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_models__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__settings_observables_saved_view__ = __webpack_require__(142);












var updatedViewsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var updateView = function (view) { return updatedViewsSubject.next(view); };
var updatedViews = updatedViewsSubject.merge(__WEBPACK_IMPORTED_MODULE_11__settings_observables_saved_view__["b" /* savedViews */]).debug("Update view");
var initialViews = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].defer(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/views"); })
    .debug("Initial views")
    .map(function (vs) { return vs.map(__WEBPACK_IMPORTED_MODULE_10__shared_models__["b" /* View */].fromContract); })
    .startWith(null);
var views = initialViews.switchMap(function (initialVs) {
    return updatedViews
        .scan(function (previousViews, updatedView) { return previousViews === null ? null : previousViews.map(function (v) { return v.id === updatedView.id ? updatedView : v; }); }, initialVs)
        .startWith(initialVs);
})
    .debug("Views");


/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return View; });
/* unused harmony export Tile */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(20);

var Project = (function () {
    function Project(params) {
        if (!params)
            throw new Error("Invalid constructor parameters: " + JSON.stringify(params));
        this.isArchived = params.isArchived;
        this.href = params.href;
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.webUrl = params.webUrl;
        this.parentProjectId = params.parentProjectId;
        this.parent = typeof params.parent === "undefined" ? null : params.parent;
        this.children = typeof params.children === "undefined" ? [] : params.children;
        this.buildConfigurations = typeof params.buildConfigurations === "undefined" ? [] : params.buildConfigurations;
        this.isExpanded = typeof params.isExpanded === "undefined" ? false : params.isExpanded;
    }
    Project.prototype.setChildren = function (children) {
        var _this = this;
        // Building immutable trees is hard if the input is not topologically sorted.
        // Avoid problems by doing only this little thing in a mutable way
        this.children = children;
        this.children.forEach(function (c) { return c.parent = _this; });
    };
    Project.prototype.withBuildConfigurations = function (buildConfigurations) {
        return new Project(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { buildConfigurations: buildConfigurations }));
    };
    Project.prototype.expand = function () {
        return new Project(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { isExpanded: true }));
    };
    Project.prototype.collapse = function () {
        return new Project(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { isExpanded: false }));
    };
    Project.prototype.toggleExpandOrCollapse = function () {
        return this.isExpanded ? this.collapse() : this.expand();
    };
    // propagate updates to a project down the chain
    Project.prototype.update = function (project) {
        if (this.id === project.id)
            return project; // if this is the project that was updated, return the new version
        return new Project(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { children: this.children.map(function (c) { return c.update(project); }) }));
    };
    Project.prototype.hasChildren = function () {
        return this.children.length > 0;
    };
    Project.prototype.getLabel = function () {
        if (this.parent === null)
            return this.name;
        return [this.parent.getLabel(), this.name].join(" / ");
    };
    return Project;
}());

var View = (function () {
    function View(params) {
        this.id = params.id;
        this.name = params.name;
        this.defaultNumberOfBranchesPerTile = params.defaultNumberOfBranchesPerTile;
        this.tiles = params.tiles;
        this.isEditing = typeof params.isEditing == "undefined" ? false : params.isEditing;
    }
    View.prototype.withName = function (name) {
        return new View(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { name: name }));
    };
    View.prototype.withDefaultNumberOfBranchesPerTile = function (defaultNumberOfBranchesPerTile) {
        return new View(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { defaultNumberOfBranchesPerTile: defaultNumberOfBranchesPerTile }));
    };
    View.prototype.withIsEditing = function (isEditing) {
        return new View(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { isEditing: isEditing }));
    };
    View.fromContract = function (view) {
        return new View({
            id: view.id,
            name: view.name,
            defaultNumberOfBranchesPerTile: view.defaultNumberOfBranchesPerTile,
            tiles: view.tiles.map(Tile.fromContract)
        });
    };
    return View;
}());

var Tile = (function () {
    function Tile(params) {
        this.id = params.id;
        this.label = params.label;
        this.buildConfigurationId = params.buildConfigurationId;
        this.buildConfigurationDisplayName = params.buildConfigurationDisplayName;
    }
    Tile.fromContract = function (tile) {
        return new Tile(tile);
    };
    return Tile;
}());



/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return saveView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return savedViews; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_operators_debug__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_models__ = __webpack_require__(141);







var savedViewsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var saveView = function (view) { return savedViewsSubject.next(view); };
var savedViews = savedViewsSubject
    .switchMap(function (savedView) { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax
    .post("api/views", savedView, { "Content-Type": "application/json" })
    .map(function (xhr) { return xhr.response; })
    .map(__WEBPACK_IMPORTED_MODULE_6__shared_models__["b" /* View */].fromContract); })
    .debug("Saved view");


/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__);


var isProduction = process && process.env && process.env.NODE_ENV === "production";
var debug = function (name) {
    if (isProduction)
        return this;
    return this
        .do({
        next: function (value) {
            console.group("Next     : " + name);
            console.dir(value);
            console.groupEnd();
        },
        error: function (error) {
            console.group("Error    : " + name);
            console.dir(error);
            console.groupEnd();
        },
        complete: function () { return console.log("Complete : " + name); }
    });
};
__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].prototype.debug = debug;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectedProjects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_operators_debug__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__);








var selectedProjectsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var selectProject = function (project) { return selectedProjectsSubject.next(project); };
var selectedProjects = selectedProjectsSubject
    .switchMap(function (project) { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/projects/" + project.id)
    .map(function (detailedProject) { return project.withBuildConfigurations(detailedProject.buildConfigurations); })
    .startWith(null); })
    .debug("Selected project")
    .startWith(null)
    .share();


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return updateProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rootProjects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_operators_debug__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_models__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__settings_observables_selected_project__ = __webpack_require__(33);












var toProjects = function (basicProjects) {
    var projects = basicProjects.map(function (p) { return new __WEBPACK_IMPORTED_MODULE_10__shared_models__["a" /* Project */](p); });
    var findChildren = function (id) { return projects.filter(function (p) { return p.parentProjectId === id; }); };
    for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
        var project = projects_1[_i];
        project.setChildren(findChildren(project.id));
    }
    return projects;
};
var initialRootProjects = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"]
    .defer(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/projects"); })
    .map(toProjects)
    .map(function (projects) { return projects.filter(function (p) { return p.parentProjectId === null; })[0]; })
    .map(function (rootProject) { return rootProject.expand(); })
    .debug("Initial root project");
var manualProjectUpdates = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var updateProject = function (project) { return manualProjectUpdates.next(project); };
var projectUpdates = manualProjectUpdates.merge(__WEBPACK_IMPORTED_MODULE_11__settings_observables_selected_project__["b" /* selectedProjects */])
    .debug("Project update");
var rootProjects = initialRootProjects.switchMap(function (initialRootProject) {
    return projectUpdates
        .scan(function (previousRootProject, projectUpdate) { return projectUpdate !== null ? previousRootProject.update(projectUpdate) : previousRootProject; }, initialRootProject)
        .startWith(initialRootProject);
})
    .debug("Projects");


/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectedViews; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_operators_debug__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith__);



var selectedViewsSubject = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
var selectView = function (view) { return selectedViewsSubject.next(view); };
var selectedViews = selectedViewsSubject
    .startWith(null)
    .debug("Selected view");


/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorAlert; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

var ErrorAlert = function (props) {
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "alert alert-error" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("strong", null, "Error!"),
        " Can you make sense of this?",
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "well well-lg" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h3", null, "Details"),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("pre", { dangerouslySetInnerHTML: { __html: JSON.stringify(props.error, null, 2) } }))));
};


/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_components_views__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_components_selected_view__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_components_projects__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_components_selected_project__ = __webpack_require__(135);





var Settings = function (props) {
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "config" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "views-section", className: "section row" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-4" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_1__settings_components_views__["a" /* Views */], { views: props.views, selectedView: props.selectedView })),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-8" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_2__settings_components_selected_view__["a" /* SelectedView */], { selectedView: props.selectedView }))),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "projects-section", className: "section row" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-4" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_3__settings_components_projects__["a" /* Projects */], { rootProject: props.rootProject, selectedProject: props.selectedProject })),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-8" },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_4__settings_components_selected_project__["a" /* SelectedProject */], { selectedProject: props.selectedProject, selectedView: props.selectedView })))));
};


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return state; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_operators_debug__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_combineLatest__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_combineLatest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_observables_views__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_observables_selected_view__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_observables_projects__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_observables_selected_project__ = __webpack_require__(33);







var state = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["b" /* views */], __WEBPACK_IMPORTED_MODULE_4__settings_observables_selected_view__["b" /* selectedViews */], __WEBPACK_IMPORTED_MODULE_5__settings_observables_projects__["b" /* rootProjects */], __WEBPACK_IMPORTED_MODULE_6__settings_observables_selected_project__["b" /* selectedProjects */], function (vs, sv, rp, sp) { return ({
    views: vs,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
}); })
    .debug("State");


/***/ })

},[138]);