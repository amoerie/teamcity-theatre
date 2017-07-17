webpackJsonp([1],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_components__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_observables__ = __webpack_require__(34);





var root = document.getElementById("root");
__WEBPACK_IMPORTED_MODULE_4__dashboard_observables__["a" /* state */].subscribe(function (s) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_3__dashboard_components__["a" /* Dashboard */], __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, s)), root); });


/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildStatus; });
var BuildStatus;
(function (BuildStatus) {
    BuildStatus[BuildStatus["Unknown"] = 0] = "Unknown";
    BuildStatus[BuildStatus["Success"] = 1] = "Success";
    BuildStatus[BuildStatus["Failure"] = 2] = "Failure";
    BuildStatus[BuildStatus["Error"] = 3] = "Error";
})(BuildStatus || (BuildStatus = {}));


/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export allViews */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectView; });
/* unused harmony export selectedViews */
/* unused harmony export selectedViewData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return state; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_defer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_defer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_defer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_combineLatest__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_combineLatest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_delay__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_merge__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_mergeMap__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_repeat__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_repeat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_repeat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_switchMap__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_startWith__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_startWith__);














// fetching the initial set of views
var allViews = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].defer(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/views"); });
// selecting a view
var selectedViewsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
var selectView = function (view) { return selectedViewsSubject.next(view); };
var selectedViews = selectedViewsSubject;
// fetching the data of a view
var selectedViewData = selectedViews.switchMap(function (selectedView) { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(null)
    .delay(3000)
    .mergeMap(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/viewdata/" + selectedView.id)
    .catch(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty(); }); })
    .repeat()
    .merge(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].ajax.getJSON("api/viewdata/" + selectedView.id)
    .catch(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty(); })); });
var state = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(allViews.startWith(null), selectedViews.startWith(null), selectedViewData.startWith(null), function (views, selectedView, viewData) {
    return {
        views: views,
        selectedView: selectedView,
        selectedViewData: viewData
    };
});


/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dashboard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_observables__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_contracts__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_parse__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_parse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_fns_parse__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_add_seconds__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_add_seconds___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_date_fns_add_seconds__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_distance_in_words_to_now__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_distance_in_words_to_now___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_date_fns_distance_in_words_to_now__);






/**
 * Root dispatching component
 */
var Dashboard = function (props) {
    if (props.views === null)
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading views");
    if (props.selectedView === null)
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Views, { views: props.views });
    if (props.selectedViewData === null)
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-spin fa-cog" }),
            " Loading view data");
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(View, { view: props.selectedView, data: props.selectedViewData });
};
/**
 * List of views to choose from
 */
var Views = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "views" }, props.views.map(function (view) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("a", { className: "btn btn-primary view", id: view.id, onClick: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dashboard_observables__["b" /* selectView */])(view); } },
    view.name,
    " ",
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", { className: "badge" },
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
var View = function (props) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: props.view.id },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("button", { role: "button", className: "btn btn-primary btn-xs", onClick: tryRequestFullScreen },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-expand" }),
        " Full screen"),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: "tiles" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "tiles-wrapper" }, props.data.tiles.map(function (tile) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Tile, { view: props.view, data: tile }); }))))); };
/**
 * A single tile of a view
 */
var Tile = function (props) {
    var buildStatus = __WEBPACK_IMPORTED_MODULE_2__shared_contracts__["a" /* BuildStatus */][props.data.combinedBuildStatus].toLowerCase();
    var height = "height-" + props.view.defaultNumberOfBranchesPerTile;
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: props.data.id, className: "tile " + buildStatus + " " + height + " col-xs-6 col-sm-4 col-md-3 col-lg-2" },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("h4", { className: "tile-title" }, props.data.label),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "tile-builds" }, props.data.builds.map(function (build) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Build, { build: build }); }))));
};
/**
 * A single build in a tile
 */
var Build = function (props) {
    var isFinished = props.build.state === "finished";
    var isRunning = props.build.state === "running";
    var isSuccess = props.build.status === __WEBPACK_IMPORTED_MODULE_2__shared_contracts__["a" /* BuildStatus */].Success;
    var buildStatus = __WEBPACK_IMPORTED_MODULE_2__shared_contracts__["a" /* BuildStatus */][props.build.status].toLowerCase();
    var percentageCompleted = isFinished ? 100 : props.build.percentageComplete;
    var progressBarTheme = isSuccess ? "progress-bar-success" : "progress-bar-danger";
    var progressBarAnimation = isRunning ? "progress-bar-striped active" : "";
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { id: props.build.id, className: "tile-build " + buildStatus },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "progress" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { className: "progress-bar " + progressBarTheme + " " + progressBarAnimation, style: { width: percentageCompleted + "%" } },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Branch, { build: props.build }),
                isFinished ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(FinishDate, { build: props.build }) : null,
                isRunning ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(TimeRemaining, { build: props.build }) : null))));
};
var Branch = function (props) {
    var isDefaultBranch = props.build.isDefaultBranch;
    var branchDisplayName = props.build.branchName || props.build.number;
    return isDefaultBranch
        ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", { className: "branch" },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("i", { className: "fa fa-star" }),
            " ",
            branchDisplayName)
        : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", { className: "branch" }, branchDisplayName);
};
var FinishDate = function (props) {
    var finishDate = __WEBPACK_IMPORTED_MODULE_3_date_fns_parse__(props.build.finishDate);
    var differenceWithNow = __WEBPACK_IMPORTED_MODULE_5_date_fns_distance_in_words_to_now__(finishDate, { includeSeconds: true, addSuffix: true });
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", { className: "execution-timestamp" }, "Finished: " + differenceWithNow));
};
var TimeRemaining = function (props) {
    var estimatedFinishDate = __WEBPACK_IMPORTED_MODULE_4_date_fns_add_seconds__(__WEBPACK_IMPORTED_MODULE_3_date_fns_parse__(props.build.startDate), props.build.estimatedTotalSeconds);
    var differenceWithNow = __WEBPACK_IMPORTED_MODULE_5_date_fns_distance_in_words_to_now__(estimatedFinishDate, { includeSeconds: true, addSuffix: true });
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("span", { className: "remaining" }, "Estimated finish: " + differenceWithNow));
};


/***/ })

},[133]);