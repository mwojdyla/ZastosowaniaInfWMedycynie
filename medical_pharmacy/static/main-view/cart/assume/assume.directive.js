(function () {
    'use strict';

    angular.module('app')
        .directive('assume', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/cart/assume/assume.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
