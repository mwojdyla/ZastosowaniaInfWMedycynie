(function () {
    'use strict';

    angular.module('app')
        .directive('header', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/header/header.html',
                controller: ['$scope', '$location', 'headerTabsService', Controller]
            };

            function Controller($scope, $location, headerTabsService) {
                $scope.leftTabs = headerTabsService.leftTabs;
                $scope.rightTabs = headerTabsService.rightTabs;
                $scope.isActiveItem = isActiveItem;
                $scope.changeTab = changeTab;
                const MAIN_URL = $scope.leftTabs.SHOP.route;
                var activePage = null;
                var activeParent = null;

                initializeHeader();

                function initializeHeader() {
                    if ($location.path() === '') $location.path(MAIN_URL);
                }

                function changeTab(item) {
                    $location.path(item.route);
                }

                function isActiveItem(item, parentKey) {
                    const currentPath = $location.path();

                    if (item.route && item.route === currentPath) {
                        activePage = item;
                        if (activeParent) activeParent.active = false;
                        if (parentKey && $scope.leftTabs[parentKey]) {
                            activeParent = $scope.leftTabs[parentKey];
                            $scope.leftTabs[parentKey].active = true;
                        } else if (parentKey && $scope.rightTabs[parentKey]) {
                            activeParent = $scope.rightTabs[parentKey];
                            $scope.rightTabs[parentKey].active = true;
                        }
                        return true;
                    }

                    return false;
                }
            }
        });

})();
