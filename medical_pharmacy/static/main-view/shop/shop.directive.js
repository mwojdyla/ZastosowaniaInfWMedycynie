(function () {
    'use strict';

    angular.module('app')
        .directive('shop', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/shop/shop.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
