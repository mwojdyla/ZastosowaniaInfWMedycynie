(function () {
    'use strict';

    angular.module('app')
        .directive('header', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/header/header.html',
                controller: [
                    '$scope',
                    '$location',
                    'headerTabsService',
                    'commonInformationsService',
                    'dataService',
                    'eventsService',
                    'typeEvents',
                    Controller]
            };

            function Controller($scope,
                                $location,
                                headerTabsService,
                                commonInformationsService,
                                dataService,
                                eventsService,
                                typeEvents) {

                $scope.leftTabs = headerTabsService.leftTabs;
                $scope.rightTabs = headerTabsService.rightTabs;
                $scope.logoutUser = logoutUser;
                $scope.isActiveItem = isActiveItem;
                $scope.changeTab = changeTab;

                eventsService.subscribe($scope, typeEvents.DISABLE_AUTHENTICATION, disableAuthenticate);
                eventsService.subscribe($scope, typeEvents.CART_CHANGED, updateNoteAboutCart);

                function updateNoteAboutCart() {
                    var numberMedicinesInCart = commonInformationsService.getCart().length;

                    $scope.rightTabs.CART.isNotify = (numberMedicinesInCart > 0);
                }

                function disableAuthenticate() {
                    $scope.rightTabs.AUTHENTICATE.disable = true;
                    $scope.rightTabs.PROFIL.disable = false;
                    $scope.rightTabs.PROFIL.items[0].title = commonInformationsService.getUser().email;
                    $scope.leftTabs.ADMIN.disable = !commonInformationsService.getUser().isPharmacist;
                }

                function enableAuthenticate() {
                    $scope.rightTabs.PROFIL.disable = true;
                    $scope.rightTabs.AUTHENTICATE.disable = false;
                    $scope.rightTabs.ADMIN.disable = true;
                }

                const MAIN_URL = $scope.leftTabs.SHOP.route;
                var activePage = null;
                var activeParent = null;
                if (!commonInformationsService.getUser()) {
                    enableAuthenticate();
                } else {
                    disableAuthenticate();
                }
                initializeHeader();

                function logoutUser(item) {
                    if (!item.name || item.name !== 'logout') return;

                    dataService.logout(success);

                    function success() {
                        commonInformationsService.removeWholeCart();
                        commonInformationsService.removeWholeOrder();
                        commonInformationsService.setUser({});
                        $scope.rightTabs.PROFIL.disable = true;
                        $scope.rightTabs.AUTHENTICATE.disable = false;
                    }
                }

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
