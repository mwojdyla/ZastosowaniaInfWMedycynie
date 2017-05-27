(function () {
    'use strict';

    angular.module('app')
        .directive('cart', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/cart/cart.html',
                controller: ['$scope', 'cartTabsService', Controller]
            };

            function Controller($scope, cartTabsService) {
                $scope.tabs = cartTabsService.tabs;
                $scope.isDelivery = cartTabsService.isDelivery;
                $scope.isProducts = cartTabsService.isProducts;
                $scope.isAssume = cartTabsService.isAssume;
                $scope.isTabActive = cartTabsService.isTabActive;
                $scope.changeTab = cartTabsService.changeTab;
            }
        });

})();
