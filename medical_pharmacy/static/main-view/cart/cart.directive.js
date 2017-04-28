(function () {
    'use strict';

    angular.module('app')
        .directive('cart', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/cart/cart.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {
                $scope.isDelivery = isDelivery;
                $scope.isProducts = isProducts;

                function isProducts() {
                    return true;
                }

                function isDelivery() {
                    return false;
                }
            }
        });

})();
