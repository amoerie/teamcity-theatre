webpackJsonp([0],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Project; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Tile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__arrays_move__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__arrays_mergeById__ = __webpack_require__(71);




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
        if (project === null)
            return this;
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

var BuildConfiguration = (function () {
    function BuildConfiguration(params) {
        this.id = params.id;
        this.name = params.name;
    }
    BuildConfiguration.fromContract = function (buildConfiguration) {
        return new BuildConfiguration(buildConfiguration);
    };
    return BuildConfiguration;
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
    /**
     * Moves a single tile from the old index to the new index
     * @param oldIndex
     * @param newIndex
     */
    View.prototype.moveTile = function (oldIndex, newIndex) {
        return new View(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { tiles: Object(__WEBPACK_IMPORTED_MODULE_2__arrays_move__["a" /* move */])(oldIndex, newIndex, this.tiles) }));
    };
    /**
     * Replaces an old tile with the updated version
     */
    View.prototype.withTile = function (tile) {
        return new View(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { tiles: Object(__WEBPACK_IMPORTED_MODULE_3__arrays_mergeById__["a" /* mergeById */])(tile, this.tiles) }));
    };
    /**
     * Removes a tile
     */
    View.prototype.withoutTile = function (tile) {
        return new View(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { tiles: this.tiles.filter(function (t) { return t.id !== tile.id; }) }));
    };
    View.fromContract = function (view) {
        return new View({
            id: view.id,
            name: view.name,
            defaultNumberOfBranchesPerTile: view.defaultNumberOfBranchesPerTile,
            tiles: view.tiles.map(Tile.fromContract)
        });
    };
    View.newView = function () {
        return new View({
            id: Object(__WEBPACK_IMPORTED_MODULE_1_uuid__["v4"])(),
            name: "New view",
            defaultNumberOfBranchesPerTile: 3,
            tiles: [],
            isEditing: true
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
        this.isEditing = typeof params.isEditing === "undefined" ? false : params.isEditing;
    }
    Tile.prototype.withLabel = function (label) {
        return new Tile(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { label: label }));
    };
    Tile.prototype.withIsEditing = function (isEditing) {
        return new Tile(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, this, { isEditing: isEditing }));
    };
    Tile.fromContract = function (tile) {
        return new Tile(tile);
    };
    Tile.newTile = function (project, buildConfiguration) {
        return new Tile({
            id: Object(__WEBPACK_IMPORTED_MODULE_1_uuid__["v4"])(),
            label: buildConfiguration.name,
            buildConfigurationId: buildConfiguration.id,
            buildConfigurationDisplayName: [project.getLabel(), buildConfiguration.name].join(" / ")
        });
    };
    return Tile;
}());



/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__ = __webpack_require__(162);
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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_components__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__erroralert_components__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_observables__ = __webpack_require__(284);






var root = document.getElementById("root");
__WEBPACK_IMPORTED_MODULE_5__settings_observables__["a" /* state */].subscribe({
    next: function (s) { return Object(__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"])(Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_3__settings_components__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, s)), root); },
    error: function (err) { return Object(__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"])(Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_4__erroralert_components__["a" /* ErrorAlert */], { error: err }), root); }
});


/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_components_views__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_components_selected_view__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_components_projects__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_components_selected_project__ = __webpack_require__(282);





var Settings = function (props) {
    var views = props.views, selectedView = props.selectedView, rootProject = props.rootProject, selectedProject = props.selectedProject;
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "config" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "views-section", className: "section row" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-4" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_1__settings_components_views__["a" /* Views */], { views: views, selectedView: selectedView })),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-8" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_2__settings_components_selected_view__["a" /* SelectedView */], { selectedView: selectedView }))),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "projects-section", className: "section row" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-4" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_3__settings_components_projects__["a" /* Projects */], { rootProject: rootProject, selectedProject: selectedProject })),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "col-md-8" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_4__settings_components_selected_project__["a" /* SelectedProject */], { selectedProject: selectedProject, selectedView: selectedView })))));
};


/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Views; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_observables_selected_view__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_observables_views__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_events_onEnter__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_events_stopPropagation__ = __webpack_require__(76);







var Views = function (props) {
    if (props.views === null)
        return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading views"));
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "views-wrapper" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel panel-primary" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-heading" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h2", null, "Views")),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-body" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
                    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(CreateViewButton, null))),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ViewsTable, { views: props.views, selectedView: props.selectedView }))));
};
var handleCreateViewButtonClick = function () { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(__WEBPACK_IMPORTED_MODULE_1__shared_models__["d" /* View */].newView()); };
var CreateViewButton = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "add-view-button btn btn-success", onClick: handleCreateViewButtonClick },
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-plus" }),
    " Create a new view")); };
var ViewsTable = function (props) {
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("table", { id: "views-table", className: "table table-striped" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("thead", null,
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "Name"),
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "# Branches per tile"),
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null))),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tbody", null, props.views.map(function (view) { return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ViewRow, { view: view, selectedView: props.selectedView }); }))));
};
var ViewRow = function (props) {
    var isSelected = props.view === props.selectedView;
    var selectedClassName = isSelected ? "selected" : "";
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", { className: "view " + selectedClassName, onClick: function () { return Object(__WEBPACK_IMPORTED_MODULE_2__settings_observables_selected_view__["a" /* selectView */])(props.view); }, onDoubleClick: function () { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(props.view.withIsEditing(true)); } },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", { className: "view-name" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ViewName, { view: props.view })),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", { className: "view-branches-per-tile" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(DefaultNumberOfBranchesPerTile, { view: props.view })),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null,
            props.view.isEditing ? Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(SaveViewButton, { view: props.view }) : Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(EditViewButton, { view: props.view }),
            " ",
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(DeleteViewButton, { view: props.view }))));
};
var ViewName = function (props) {
    if (props.view.isEditing)
        return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("input", { type: "text", name: "view-name-input", className: "form-control", value: props.view.name, onClick: __WEBPACK_IMPORTED_MODULE_6__shared_events_stopPropagation__["a" /* stopPropagation */], onChange: function (event) { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(props.view.withName(event.currentTarget.value)); }, onKeyUp: Object(__WEBPACK_IMPORTED_MODULE_5__shared_events_onEnter__["a" /* onEnter */])(function () { return Object(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(props.view); }) });
    return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null, props.view.name);
};
var DefaultNumberOfBranchesPerTile = function (props) {
    if (props.view.isEditing)
        return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("input", { type: "number", name: "view-branches-per-tile-input", className: "form-control", value: props.view.defaultNumberOfBranchesPerTile, onClick: __WEBPACK_IMPORTED_MODULE_6__shared_events_stopPropagation__["a" /* stopPropagation */], onChange: function (event) { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(props.view.withDefaultNumberOfBranchesPerTile(+event.currentTarget.value)); }, onKeyUp: Object(__WEBPACK_IMPORTED_MODULE_5__shared_events_onEnter__["a" /* onEnter */])(function () { return Object(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(props.view); }) });
    return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null, props.view.defaultNumberOfBranchesPerTile);
};
var handleSaveViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    Object(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(view);
}; };
var SaveViewButton = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "save-view-button btn btn-success", onClick: handleSaveViewButtonClick(props.view), title: "Save" },
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-check" }))); };
var handleEditViewButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(view.withIsEditing(true));
}; };
var EditViewButton = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "edit-view-button btn btn-default", onClick: handleEditViewButtonClick(props.view), title: "Edit" },
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-pencil" }))); };
var DeleteViewButton = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "delete-view-button btn btn-danger", onClick: function () { }, title: "Delete" },
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-remove" }))); };


/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return move; });
/**
 * Swaps two elements in an array by index
 * @param oldIndex the old index
 * @param newIndex the new index
 * @param array the array of elements
 */
var move = function (oldIndex, newIndex, array) {
    if (oldIndex < 0)
        throw new Error("Invalid old index: cannot be lower than 0");
    if (newIndex < 0)
        throw new Error("Invalid new index: cannot be lower than 0");
    if (oldIndex >= array.length)
        throw new Error("Invalid old index: cannot be higher than " + array.length);
    if (newIndex >= array.length)
        throw new Error("Invalid new index: cannot be higher than " + array.length);
    var smallestIndex = Math.min(oldIndex, newIndex);
    var biggestIndex = Math.max(oldIndex, newIndex);
    return array.map(function (element, index) {
        if (index < smallestIndex || index > biggestIndex)
            return element; // not affected by move
        if (index === newIndex)
            return array[oldIndex]; // the actual move
        return newIndex > oldIndex
            ? array[index + 1]
            : array[index - 1];
    });
};


/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export handleOnSortEnd */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_sortable_hoc__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_sortable_hoc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_sortable_hoc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_observables_views__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_events_stopPropagation__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_events_onEnter__ = __webpack_require__(75);







var handleOnSortEnd = function (view) { return function (sort) { return Object(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(view.moveTile(sort.oldIndex, sort.newIndex))); }; };
var SelectedView = function (props) {
    var selectedView = props.selectedView;
    if (selectedView === null)
        return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", null);
    return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { id: "selected-view-wrapper" },
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "panel panel-default" },
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "panel-heading" },
                Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "panel-title" },
                    Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("h2", null,
                        "Tiles of ",
                        selectedView.name))),
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "panel-body" }),
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(TilesList, { view: selectedView, useDragHandle: true, axis: "y", lockAxis: "y", onSortEnd: handleOnSortEnd(selectedView), helperClass: "tile-drag-helper" }))));
};
var TilesList = Object(__WEBPACK_IMPORTED_MODULE_2_react_sortable_hoc__["SortableContainer"])(function (props) {
    var view = props.view;
    return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("ul", { className: "tiles-list list-group" }, view.tiles.map(function (t, index) { return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(TileRow, { view: view, tile: t, index: index }); })));
});
var TileDragHandle = Object(__WEBPACK_IMPORTED_MODULE_2_react_sortable_hoc__["SortableHandle"])(function () { return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", null,
    Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("i", { className: "fa fa-bars" })); });
var TileRow = Object(__WEBPACK_IMPORTED_MODULE_2_react_sortable_hoc__["SortableElement"])(function (props) {
    var view = props.view, tile = props.tile;
    return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("li", { className: "tile list-group-item", onDoubleClick: function () { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(view.withTile(tile.withIsEditing(true))); } },
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "tile-drag-handle" },
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(TileDragHandle, null)),
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "tile-label" },
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(TileLabel, __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, props))),
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "tile-build-configuration" },
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(TileBuildConfiguration, __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, props))),
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", { className: "tile-actions" },
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(TileActions, __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, props)))));
});
var TileLabel = function (props) {
    var view = props.view, tile = props.tile;
    if (tile.isEditing) {
        return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("input", { type: "text", name: "tile-label-input", className: "form-control", value: tile.label, onClick: __WEBPACK_IMPORTED_MODULE_5__shared_events_stopPropagation__["a" /* stopPropagation */], onChange: function (e) { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(view.withTile(tile.withLabel(e.currentTarget.value))); }, onKeyUp: Object(__WEBPACK_IMPORTED_MODULE_6__shared_events_onEnter__["a" /* onEnter */])(function () { return Object(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(view); }), autoFocus: true });
    }
    return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("span", null, tile.label);
};
var TileBuildConfiguration = function (props) {
    var tile = props.tile;
    return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("span", null, tile.buildConfigurationDisplayName);
};
var TileActions = function (props) {
    var tile = props.tile;
    if (tile.isEditing)
        return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", null,
            Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(SaveTileButton, __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, props)));
    return Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("div", null,
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(EditTileButton, __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, props)),
        " ",
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(DeleteTileButton, __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, props)));
};
var handleSaveTileButtonClick = function (view) { return function (event) {
    event.stopPropagation();
    Object(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(view);
}; };
var SaveTileButton = function (props) {
    return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("button", { className: "save-tile-button btn btn-success", onClick: handleSaveTileButtonClick(props.view), title: "Save" },
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("i", { className: "fa fa-check" })));
};
var handleEditTileButtonClick = function (view, tile) { return function () { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(view.withTile(tile.withIsEditing(true))); }; };
var EditTileButton = function (props) {
    var view = props.view, tile = props.tile;
    return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("button", { className: "edit-tile-button btn btn-default", onClick: handleEditTileButtonClick(view, tile), title: "Edit" },
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("i", { className: "fa fa-pencil" })));
};
var handleDeleteTileButtonClick = function (view, tile) { return function () { return Object(__WEBPACK_IMPORTED_MODULE_4__settings_observables_saved_view__["a" /* saveView */])(Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["a" /* updateView */])(view.withoutTile(tile))); }; };
var DeleteTileButton = function (props) {
    var view = props.view, tile = props.tile;
    return (Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("button", { className: "delete-tile-button btn btn-danger", onClick: handleDeleteTileButtonClick(view, tile), title: "Delete" },
        Object(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])("i", { className: "fa fa-remove" })));
};


/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return updateView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updatedViews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return views; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_operators_debug__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_models__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__settings_observables_saved_view__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_arrays_mergeById__ = __webpack_require__(71);













var updatedViewsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var updateView = function (view) { updatedViewsSubject.next(view); return view; };
var updatedViews = updatedViewsSubject.merge(__WEBPACK_IMPORTED_MODULE_11__settings_observables_saved_view__["b" /* savedViews */]).debug("Update view");
var initialViews = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].defer(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/views"); })
    .debug("Initial views")
    .map(function (vs) { return vs.map(__WEBPACK_IMPORTED_MODULE_10__shared_models__["d" /* View */].fromContract); })
    .startWith([]);
var views = initialViews.switchMap(function (initialVs) {
    return updatedViews
        .scan(function (previousViews, updatedView) { return Object(__WEBPACK_IMPORTED_MODULE_12__shared_arrays_mergeById__["a" /* mergeById */])(updatedView, previousViews); }, initialVs)
        .startWith(initialVs);
})
    .debug("Views");


/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Projects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_observables_selected_project__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_observables_projects__ = __webpack_require__(95);



var Projects = function (props) {
    if (props.rootProject === null)
        return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading projects"));
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "projects-wrapper" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel panel-default" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-heading" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h3", { className: "panel-title" }),
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h2", null, "Available projects")),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-body" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("ul", { className: "list-unstyled" },
                    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Project, { project: props.rootProject, selectedProject: props.selectedProject }))))));
};
// recursive components require type annotations
var Project = function (props) {
    var project = props.project, selectedProject = props.selectedProject;
    var hasChildren = project.hasChildren() ? "has-children" : "";
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("li", { id: project.id, className: "project " + hasChildren },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ToggleProjectChildrenButton, { project: project }),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ShowProjectDetailsButton, { project: project, selectedProject: selectedProject }),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ProjectChildren, { project: project, selectedProject: selectedProject })));
};
var ToggleProjectChildrenButton = function (props) {
    var iconClass = props.project.isExpanded ? "fa fa-minus-circle" : "fa fa-plus-circle";
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "toggle-children-button btn btn-xs btn-default", onClick: function () { return Object(__WEBPACK_IMPORTED_MODULE_2__settings_observables_projects__["b" /* updateProject */])(props.project.toggleExpandOrCollapse()); } },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: iconClass })));
};
var ShowProjectDetailsButton = function (props) {
    var buttonClass = props.project === props.selectedProject ? "btn-primary" : "btn-default";
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "project-name btn btn-xs " + buttonClass, onClick: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__settings_observables_selected_project__["a" /* selectProject */])(props.project); } }, props.project.name));
};
var ProjectChildren = function (props) {
    if (!props.project.isExpanded)
        return null;
    if (!props.project.hasChildren())
        return null;
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("ul", { className: "project-children" }, props.project.children.map(function (c) { return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Project, { project: c, selectedProject: props.selectedProject }); })));
};


/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedProject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_observables_views__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_observables_saved_view__ = __webpack_require__(44);




var SelectedProject = function (props) {
    if (props.selectedProject === null) {
        return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null));
    }
    if (props.selectedView === null) {
        return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "alert alert-info" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null,
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-info-circle" }),
                " Please select a view")));
    }
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "project-details-wrapper" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel panel-default" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-heading" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-title" },
                    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h2", null,
                        props.selectedProject.getLabel(),
                        " ",
                        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(OpenInTeamCityButton, { project: props.selectedProject })))),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-body" },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ProjectDescription, { project: props.selectedProject }),
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(NoBuildConfigurationsWarning, { project: props.selectedProject })),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(BuildConfigurationsTable, { project: props.selectedProject, view: props.selectedView }))));
};
var OpenInTeamCityButton = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("a", { className: "btn btn-info btn-sm", target: "_blank", href: "http://vm64-teamcity-2012/project.html?projectId=" + props.project.id },
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-globe" }),
    " Open in TeamCity")); };
var ProjectDescription = function (props) {
    if (props.project.description === null)
        return null;
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "well well-sm", id: "project-details-description" }, props.project.description));
};
var NoBuildConfigurationsWarning = function (props) {
    if (props.project.buildConfigurations === null || props.project.buildConfigurations.length > 0)
        return null;
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "alert alert-info" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", null,
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-info-circle" }),
            " This project does not have build configurations")));
};
var BuildConfigurationsTable = function (props) {
    var project = props.project, view = props.view;
    if (project.buildConfigurations === null)
        return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "panel-footer" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading build configurations"));
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("table", { className: "table table-striped" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("thead", null,
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null, "Name"),
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("th", null))),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tbody", null, project.buildConfigurations.map(function (b) { return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(BuildConfigurationRow, { buildConfiguration: b, view: view, project: project }); }))));
};
var handleAddTileButtonClick = function (buildConfiguration, view, project) {
    return function () { return Object(__WEBPACK_IMPORTED_MODULE_3__settings_observables_saved_view__["a" /* saveView */])(Object(__WEBPACK_IMPORTED_MODULE_2__settings_observables_views__["a" /* updateView */])(view.withTile(__WEBPACK_IMPORTED_MODULE_1__shared_models__["c" /* Tile */].newTile(project, buildConfiguration)))); };
};
var BuildConfigurationRow = function (props) {
    var buildConfiguration = props.buildConfiguration, view = props.view, project = props.project;
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("tr", null,
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null, buildConfiguration.name),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("td", null,
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { className: "btn btn-success btn-sm", onClick: handleAddTileButtonClick(buildConfiguration, view, project) },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-plus" }),
                " Add tile to ",
                view.name))));
};


/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorAlert; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

var ErrorAlert = function (props) {
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "alert alert-error" },
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("strong", null, "Error!"),
        " Can you make sense of this?",
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "well well-lg" },
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h3", null, "Details"),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("pre", { dangerouslySetInnerHTML: { __html: JSON.stringify(props.error, null, 2) } }))));
};


/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return state; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_operators_debug__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_combineLatest__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_combineLatest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_observables_views__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_observables_selected_view__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_observables_projects__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_observables_selected_project__ = __webpack_require__(57);







var state = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(__WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["c" /* views */], __WEBPACK_IMPORTED_MODULE_4__settings_observables_selected_view__["b" /* selectedViews */], __WEBPACK_IMPORTED_MODULE_5__settings_observables_projects__["a" /* rootProjects */], __WEBPACK_IMPORTED_MODULE_6__settings_observables_selected_project__["b" /* selectedProjects */], function (vs, sv, rp, sp) { return ({
    views: vs,
    selectedView: sv,
    rootProject: rp,
    selectedProject: sp
}); })
    .debug("State");


/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return saveView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return savedViews; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_share__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_startWith__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_operators_debug__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_models__ = __webpack_require__(14);








var savedViewsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var saveView = function (view) { return savedViewsSubject.next(view); };
var savedViews = savedViewsSubject
    .switchMap(function (savedView) { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax
    .post("api/views", savedView, { "Content-Type": "application/json" })
    .map(function (xhr) { return xhr.response; })
    .map(__WEBPACK_IMPORTED_MODULE_7__shared_models__["d" /* View */].fromContract); })
    .debug("Saved view")
    .share();


/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectedProjects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_operators_debug__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_models__ = __webpack_require__(14);









var selectedProjectsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var selectProject = function (project) { return selectedProjectsSubject.next(project); };
var selectedProjects = selectedProjectsSubject
    .switchMap(function (project) { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/projects/" + project.id)
    .map(function (detailedProject) { return project.withBuildConfigurations(detailedProject.buildConfigurations.map(__WEBPACK_IMPORTED_MODULE_8__shared_models__["a" /* BuildConfiguration */].fromContract)); })
    .startWith(null); })
    .debug("Selected project")
    .startWith(null)
    .share();


/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeById; });
/**
 *  Swaps an element of an array with an updated version, using the id to find the element
 *  If the element does not already exist in the array, it's added
 */
var mergeById = function (updatedElement, array) {
    var clone = array.slice(0);
    var found = false;
    for (var i = 0; i < clone.length; i++) {
        if (clone[i].id === updatedElement.id) {
            found = true;
            clone[i] = updatedElement;
            break;
        }
    }
    if (!found)
        clone.push(updatedElement);
    return clone;
};


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectedViews; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_operators_debug__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_observables_views__ = __webpack_require__(28);




var selectedViewsSubject = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
var selectView = function (view) { return selectedViewsSubject.next(view); };
var selectedViews = selectedViewsSubject
    .startWith(null)
    .switchMap(function (selectedView) { return __WEBPACK_IMPORTED_MODULE_3__settings_observables_views__["b" /* updatedViews */]
    .scan(function (previouslySelectedView, updatedView) {
    return previouslySelectedView !== null && previouslySelectedView.id === updatedView.id
        ? updatedView
        : previouslySelectedView;
}, selectedView)
    .startWith(selectedView); })
    .debug("Selected view");


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onEnter; });
var onEnter = function (callback) { return function (event) {
    if (event.keyCode == 13)
        callback();
}; };


/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stopPropagation; });
var stopPropagation = function (event) { return event.stopPropagation(); };


/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rootProjects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_operators_debug__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_defer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_models__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__settings_observables_selected_project__ = __webpack_require__(57);












var toProjects = function (basicProjects) {
    var projects = basicProjects.map(function (p) { return new __WEBPACK_IMPORTED_MODULE_10__shared_models__["b" /* Project */](p); });
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
        .scan(function (previousRootProject, projectUpdate) { return previousRootProject.update(projectUpdate); }, initialRootProject)
        .startWith(initialRootProject);
})
    .debug("Projects");


/***/ })

},[155]);