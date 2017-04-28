(function () {
    'use strict';

    angular.module('app')
        .directive('delivery', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/cart/delivery/delivery.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
