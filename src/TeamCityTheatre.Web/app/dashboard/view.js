(function () {
    'use strict';

    angular
        .module('app')
        .controller('viewController', ['$scope', '$routeParams', '$timeout', 'mainnav.options', 'viewsService', 'viewDataService', 'lodash', 'moment', 'settings', viewController]);
    function viewController($scope, $routeParams, $timeout, mainNavOptions, viewsService, viewDataService, _, moment, settings) {
        var vm = this;
        vm.viewData = { tiles: [] };
        vm.isMainNavVisible = mainNavOptions.isVisible;

        var autohideTimeout;
        vm.toggleMainNav = function () {
            mainNavOptions.isVisible = vm.isMainNavVisible = !vm.isMainNavVisible;
        };

        vm.getViewData = function (viewId) {
            return viewDataService.getViewDataById(viewId).then(function (viewData) {
                vm.viewData = viewData;
            });
        }

        vm.getRemainingTime = function (build) {
            if (build.estimatedTotalSeconds && build.elapsedSeconds) {
                var remainingSeconds = moment.duration(build.estimatedTotalSeconds - build.elapsedSeconds, 'seconds');
                return build.estimatedTotalSeconds < build.elapsedSeconds
                  ? "over time: " + remainingSeconds.humanize()
                  : moment().add(remainingSeconds).from(moment());
            }
            return '';
        }

        vm.getExecutionTimestamp = function (build) {
            var startDate = moment(build.startDate);
            return startDate.from(moment());
        }

        var getPropertyValueOrDefault = function (property, defaultValue) {
            if (angular.isUndefined(property) || property === null) {
                return defaultValue || 0;
            }
            return property.value;
        }

        vm.getPassedTestCount = function (build) {
            return getPropertyValueOrDefault(_.find(build.properties, function (p) {
                return p.name === "PassedTestCount";
            }));
        }

        vm.getFailedTestCount = function (build) {
            return getPropertyValueOrDefault(_.find(build.properties, function (p) {
                return p.name === "FailedTestCount";
            }));
        }

        vm.getTotalTestCount = function (build) {
            return getPropertyValueOrDefault(_.find(build.properties, function (p) {
                return p.name === "TotalTestCount";
            }));
        }

        var polling;
        vm.startPollingViewData = function () {
            if (vm.isPollingViewData()) return;
            viewsService.getViewByName($routeParams.viewName).then(function (view) {
                vm.view = view;

                function poll() {
                    polling = $timeout(function () {
                        vm.getViewData(view.id).then(poll, poll);
                    }, settings.pollingTimeOutInMilliSeconds);
                }

                poll();
            });
        }

        vm.isPollingViewData = function () {
            return typeof polling !== "undefined";
        }

        vm.stopPollingViewData = function () {
            if (!vm.isPollingViewData()) return;
            $timeout.cancel(polling);
            polling = undefined;
        }

        vm.startPollingViewData();
        vm.toggleMainNav();
        $scope.$on('$destroy', function () {
            $timeout.cancel(polling);
            $timeout.cancel(autohideTimeout);
        });
    };
})();
