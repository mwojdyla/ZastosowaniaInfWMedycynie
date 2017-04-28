(function () {
    'use strict';

    angular.module('app')
        .directive('products', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/cart/products/products.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
