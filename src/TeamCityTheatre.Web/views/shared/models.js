import * as tslib_1 from "tslib";
import { v4 as newguid } from "uuid";
import { move } from "./arrays/move";
import { mergeById } from "./arrays/mergeById";
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
        return new Project(tslib_1.__assign({}, this, { buildConfigurations: buildConfigurations }));
    };
    Project.prototype.expand = function () {
        return new Project(tslib_1.__assign({}, this, { isExpanded: true }));
    };
    Project.prototype.collapse = function () {
        return new Project(tslib_1.__assign({}, this, { isExpanded: false }));
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
        return new Project(tslib_1.__assign({}, this, { children: this.children.map(function (c) { return c.update(project); }) }));
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
export { Project };
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
export { BuildConfiguration };
var View = (function () {
    function View(params) {
        this.id = params.id;
        this.name = params.name;
        this.defaultNumberOfBranchesPerTile = params.defaultNumberOfBranchesPerTile;
        this.tiles = params.tiles;
        this.isEditing = typeof params.isEditing == "undefined" ? false : params.isEditing;
    }
    View.prototype.withName = function (name) {
        return new View(tslib_1.__assign({}, this, { name: name }));
    };
    View.prototype.withDefaultNumberOfBranchesPerTile = function (defaultNumberOfBranchesPerTile) {
        return new View(tslib_1.__assign({}, this, { defaultNumberOfBranchesPerTile: defaultNumberOfBranchesPerTile }));
    };
    View.prototype.withIsEditing = function (isEditing) {
        return new View(tslib_1.__assign({}, this, { isEditing: isEditing }));
    };
    /**
     * Moves a single tile from the old index to the new index
     * @param oldIndex
     * @param newIndex
     */
    View.prototype.moveTile = function (oldIndex, newIndex) {
        return new View(tslib_1.__assign({}, this, { tiles: move(oldIndex, newIndex, this.tiles) }));
    };
    /**
     * Replaces an old tile with the updated version
     */
    View.prototype.withTile = function (tile) {
        return new View(tslib_1.__assign({}, this, { tiles: mergeById(tile, this.tiles) }));
    };
    /**
     * Removes a tile
     */
    View.prototype.withoutTile = function (tile) {
        return new View(tslib_1.__assign({}, this, { tiles: this.tiles.filter(function (t) { return t.id !== tile.id; }) }));
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
            id: newguid(),
            name: "New view",
            defaultNumberOfBranchesPerTile: 3,
            tiles: [],
            isEditing: true
        });
    };
    return View;
}());
export { View };
var Tile = (function () {
    function Tile(params) {
        this.id = params.id;
        this.label = params.label;
        this.buildConfigurationId = params.buildConfigurationId;
        this.buildConfigurationDisplayName = params.buildConfigurationDisplayName;
        this.isEditing = typeof params.isEditing === "undefined" ? false : params.isEditing;
    }
    Tile.prototype.withLabel = function (label) {
        return new Tile(tslib_1.__assign({}, this, { label: label }));
    };
    Tile.prototype.withIsEditing = function (isEditing) {
        return new Tile(tslib_1.__assign({}, this, { isEditing: isEditing }));
    };
    Tile.fromContract = function (tile) {
        return new Tile(tile);
    };
    Tile.newTile = function (project, buildConfiguration) {
        return new Tile({
            id: newguid(),
            label: buildConfiguration.name,
            buildConfigurationId: buildConfiguration.id,
            buildConfigurationDisplayName: [project.getLabel(), buildConfiguration.name].join(" / ")
        });
    };
    return Tile;
}());
export { Tile };
