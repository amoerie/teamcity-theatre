import { createElement } from "react";
import { selectView } from "./dashboard.observables";
import { BuildStatus } from "../shared/contracts";
import * as parse from "date-fns/parse";
import * as addSeconds from "date-fns/add_seconds";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";
/**
 * Root dispatching component
 */
export var Dashboard = function (props) {
    if (props.views === null)
        return createElement("div", null,
            createElement("i", { className: "fa fa-spin fa-cog" }),
            " Loading views");
    if (props.selectedView === null)
        return createElement(Views, { views: props.views });
    if (props.selectedViewData === null)
        return createElement("div", null,
            createElement("i", { className: "fa fa-spin fa-cog" }),
            " Loading view data");
    return createElement(View, { view: props.selectedView, data: props.selectedViewData });
};
/**
 * List of views to choose from
 */
var Views = function (props) { return (createElement("div", { id: "views" }, props.views.map(function (view) { return (createElement("a", { className: "btn btn-primary view", id: view.id, onClick: function () { return selectView(view); } },
    view.name,
    " ",
    createElement("span", { className: "badge" },
        view.tiles.length,
        " tiles"))); }))); };
var tryRequestFullScreen = function (event) {
    var button = event.currentTarget;
    var view = button.parentNode;
    if (view.requestFullscreen)
        view.requestFullscreen();
    if (view.webkitRequestFullScreen)
        view.webkitRequestFullScreen();
    if (view.webkitRequestFullscreen)
        view.webkitRequestFullscreen();
};
/**
 * Details of a single view
 */
var View = function (props) { return (createElement("div", { id: props.view.id },
    createElement("button", { role: "button", className: "btn btn-primary btn-xs", onClick: tryRequestFullScreen },
        createElement("i", { className: "fa fa-expand" }),
        " Full screen"),
    createElement("div", { id: "tiles" },
        createElement("div", { className: "tiles-wrapper" }, props.data.tiles.map(function (tile) { return createElement(Tile, { view: props.view, data: tile }); }))))); };
/**
 * A single tile of a view
 */
var Tile = function (props) {
    var buildStatus = BuildStatus[props.data.combinedBuildStatus].toLowerCase();
    var height = "height-" + props.view.defaultNumberOfBranchesPerTile;
    return (createElement("div", { id: props.data.id, className: "tile " + buildStatus + " " + height + " col-xs-6 col-sm-4 col-md-3 col-lg-2" },
        createElement("h4", { className: "tile-title" }, props.data.label),
        createElement("div", { className: "tile-builds" }, props.data.builds.map(function (build) { return createElement(Build, { build: build }); }))));
};
/**
 * A single build in a tile
 */
var Build = function (props) {
    var isFinished = props.build.state === "finished";
    var isRunning = props.build.state === "running";
    var isSuccess = props.build.status === BuildStatus.Success;
    var buildStatus = BuildStatus[props.build.status].toLowerCase();
    var percentageCompleted = isFinished ? 100 : props.build.percentageComplete;
    var progressBarTheme = isSuccess ? "progress-bar-success" : "progress-bar-danger";
    var progressBarAnimation = isRunning ? "progress-bar-striped active" : "";
    return (createElement("div", { id: props.build.id, className: "tile-build " + buildStatus },
        createElement("div", { className: "progress" },
            createElement("div", { className: "progress-bar " + progressBarTheme + " " + progressBarAnimation, style: { width: percentageCompleted + "%" } },
                createElement(Branch, { build: props.build }),
                isFinished ? createElement(FinishDate, { build: props.build }) : null,
                isRunning ? createElement(TimeRemaining, { build: props.build }) : null))));
};
var Branch = function (props) {
    var isDefaultBranch = props.build.isDefaultBranch;
    var branchDisplayName = props.build.branchName || props.build.number;
    return isDefaultBranch
        ? createElement("span", { className: "branch" },
            createElement("i", { className: "fa fa-star" }),
            " ",
            branchDisplayName)
        : createElement("span", { className: "branch" }, branchDisplayName);
};
var FinishDate = function (props) {
    var finishDate = parse(props.build.finishDate);
    var differenceWithNow = distanceInWordsToNow(finishDate, { includeSeconds: true, addSuffix: true });
    return (createElement("span", { className: "execution-timestamp" }, "Finished: " + differenceWithNow));
};
var TimeRemaining = function (props) {
    var estimatedFinishDate = addSeconds(parse(props.build.startDate), props.build.estimatedTotalSeconds);
    var differenceWithNow = distanceInWordsToNow(estimatedFinishDate, { includeSeconds: true, addSuffix: true });
    return (createElement("span", { className: "remaining" }, "Estimated finish: " + differenceWithNow));
};
